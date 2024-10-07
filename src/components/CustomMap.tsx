'use client'

import React, { forwardRef, PropsWithChildren, useImperativeHandle, useRef, useState } from 'react'
import Map, { GeoJSONSource, MapGeoJSONFeature, MapMouseEvent, MapProps, MapRef, Point, ViewState } from 'react-map-gl'
import { MapCenter } from '@/types/Map'
import { Feature } from 'geojson'

import 'mapbox-gl/dist/mapbox-gl.css'

type CustomMapProps = Pick<MapProps, 'initialViewState' | 'cooperativeGestures' | 'interactiveLayerIds'>

export type MapViewState = Pick<ViewState, 'latitude' | 'longitude' | 'zoom'>

export type Props = PropsWithChildren &
  CustomMapProps & {
    className?: string
    initialCenter?: MapCenter
    initialZoom?: number
    onPointClick?: (event: MapMouseEvent, feature: MapGeoJSONFeature) => void
    onClusterClick?: (event: MapMouseEvent, features: Feature[]) => void
    sourceId?: string
  } & (
    | {
        viewState: MapViewState
        setViewState: (viewState: MapViewState) => void
      }
    | {
        viewState?: never
        setViewState?: never
      }
  )

const CustomMap = forwardRef<MapRef, Props>(function CustomMap(
  {
    className,
    children,
    initialCenter = {
      latitude: 55.755,
      longitude: 37.617,
    },
    initialZoom = 14,
    viewState: customViewState,
    setViewState: customSetViewState,
    onPointClick,
    onClusterClick,
    sourceId,
    ...customProps
  }: Props,
  mapRef,
) {
  const innerMapRef = useRef<MapRef | null>(null)
  const [viewState, setViewState] = useState<MapViewState>({
    ...initialCenter,
    zoom: initialZoom,
  })

  const _viewState = customViewState || viewState
  const _setViewState = customSetViewState || setViewState

  useImperativeHandle(mapRef, () => innerMapRef.current!)

  function clusterClickHandler(event: MapMouseEvent, feature: MapGeoJSONFeature) {
    if (!sourceId) return

    const source = event.target.getSource(sourceId) as GeoJSONSource | undefined

    source?.getClusterExpansionZoom(feature.properties?.cluster_id, (err) => {
      if (err) return

      event.target.easeTo({
        center: (feature.geometry as Point).coordinates as [number, number],
        zoom: 14,
      })
    })

    if (!innerMapRef.current) return

    const features = innerMapRef.current.queryRenderedFeatures(event.point, { layers: [feature.layer.id] })
    if (!features[0].properties) return

    const clusterId = features[0].properties.cluster_id
    const point_count = features[0].properties.point_count
    const clusterSource = innerMapRef.current.getSource(sourceId) as GeoJSONSource

    if (!clusterSource) return

    clusterSource.getClusterLeaves(clusterId, point_count, 0, (error, features) => {
      if (error || !features) throw error

      onClusterClick?.(event, features)
    })
  }

  function pointClickHandler(event: MapMouseEvent, feature: MapGeoJSONFeature) {
    const coordinates = (feature.geometry as Point).coordinates.slice() as [number, number]

    onPointClick?.(event, feature)

    event.target.flyTo({
      center: coordinates,
      essential: true,
      zoom: 15,
    })
  }

  function clickHandler(event: MapMouseEvent) {
    const feature: MapGeoJSONFeature = event.features?.[0]
    if (!feature) return

    if (feature.properties?.cluster) {
      clusterClickHandler(event, feature)
    } else {
      pointClickHandler(event, feature)
    }
  }

  function onMouseEnter(e: MapMouseEvent) {
    e.target.getCanvas().style.cursor = 'pointer'
  }

  function onMouseLeave(e: MapMouseEvent) {
    e.target.getCanvas().style.cursor = 'grab'
  }

  return (
    <div className={`map-box overflow-hidden ${className}`}>
      <Map
        {..._viewState}
        ref={innerMapRef}
        onMove={(evt) => _setViewState(evt.viewState)}
        style={{ height: '100%', width: '100%' }}
        mapboxAccessToken='pk.eyJ1Ijoic2V2YS1hYWNjZW50IiwiYSI6ImNscjd0N2cxczBkbG4yam54ZGFnZGkzM2oifQ.FhpqT7irCZDKdM6pd4ggjw'
        mapStyle='mapbox://styles/seva-aaccent/cm1asxo0402gv01pm6devahed'
        dragRotate={false}
        cooperativeGestures
        locale={{
          'ScrollZoomBlocker.CtrlMessage': 'ctrl + scroll для увеличения масштаба карты',
          'ScrollZoomBlocker.CmdMessage': '⌘ + scroll для увеличения масштаба карты',
          'TouchPanBlocker.Message': 'Используйте два пальца чтобы подвинуть карту',
          'NavigationControl.ZoomIn': 'Увеличить',
          'NavigationControl.ZoomOut': 'Уменьшить',
        }}
        onClick={clickHandler}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        {...customProps}
      >
        {children}
      </Map>
    </div>
  )
})

export default CustomMap
