export const PATHS = {
  CATALOG: 'catalog',
  NEW_BUILDINGS: 'new-building',
  COMPLEXES: 'complexes',
  SECONDARY_HOUSING: 'secondary-housing',
  APARTMENTS: 'apartments',
  MAP: 'map',
  COMPLEX_OBJECTS: 'complex-objects',
}

export const ROUTES = {
  CATALOG: `/${PATHS.CATALOG}`,
  COMPLEXES: `/${PATHS.CATALOG}/${PATHS.COMPLEXES}`,
  COMPLEX_OBJECTS: `${PATHS.CATALOG}/${PATHS.COMPLEX_OBJECTS}`,
  NEW_BUILDINGS: `/${PATHS.CATALOG}/${PATHS.NEW_BUILDINGS}`,
  SECONDARY_HOUSING: `/${PATHS.CATALOG}/${PATHS.SECONDARY_HOUSING}`,
  MAP: `/${PATHS.MAP}`,
}
