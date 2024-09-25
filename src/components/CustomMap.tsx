'use client'

import React, { PropsWithChildren, useRef, useState } from 'react'
import Map, { GeoJSONSource, MapMouseEvent, MapProps, MapRef, Point, ViewState } from 'react-map-gl'
import { MapCenter } from '@/types/Map'
import { Feature } from 'geojson'

import 'mapbox-gl/dist/mapbox-gl.css'

type CustomMapProps = Pick<MapProps, 'initialViewState' | 'cooperativeGestures' | 'interactiveLayerIds'>

export type MapViewState = Pick<ViewState, 'latitude' | 'longitude' | 'zoom'>

type Props = PropsWithChildren &
  CustomMapProps & {
    className?: string
    initialCenter?: MapCenter
    initialZoom?: number
    mapRef?: React.LegacyRef<MapRef>
    onFeatureClick?: (event: MapMouseEvent, feature: Feature) => void
    onClusterClick?: (event: MapMouseEvent, feature: Feature) => void
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

export default function CustomMap({
  className,
  children,
  initialCenter = { latitude: 55.755, longitude: 37.617 },
  initialZoom = 14,
  viewState: customViewState,
  setViewState: customSetViewState,
  mapRef: customMapRef,
  onFeatureClick,
  sourceId,
  ...customProps
}: Props) {
  const mapRef = useRef<MapRef | null>(null)
  const [viewState, setViewState] = useState<MapViewState>({
    ...initialCenter,
    zoom: initialZoom,
  })

  const _viewState = customViewState || viewState
  const _setViewState = customSetViewState || setViewState

  const _mapRef = customMapRef !== undefined ? customMapRef : mapRef

  function clusterClickHandler(event: MapMouseEvent, feature: Feature) {
    if (!sourceId) return

    const source = event.target.getSource(sourceId) as GeoJSONSource | undefined

    source?.getClusterExpansionZoom(feature.properties?.cluster_id, (err, zoom) => {
      if (err) return

      event.target.easeTo({
        center: (feature.geometry as Point).coordinates as [number, number],
        zoom: 14,
      })
    })
  }

  function pointClickHandler(event: MapMouseEvent, feature: Feature) {
    const coordinates = (feature.geometry as Point).coordinates.slice() as [number, number]

    onFeatureClick?.(event, feature)

    event.target.flyTo({
      center: coordinates,
      essential: true,
      zoom: 15,
    })
  }

  function clickHandler(event: MapMouseEvent) {
    const feature: Feature = event.features?.[0]
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
        ref={_mapRef}
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
}
