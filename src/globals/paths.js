export const PATHS = {
  CATALOG: 'catalog',
  NEW_BUILDINGS: 'new-building',
  COMPLEXES: 'complexes',
  SECONDARY_HOUSING: 'secondary-housing',
  APARTMENTS: 'apartments',
  MAP: 'map',
}

export const ROUTES = {
  CATALOG: `/${PATHS.CATALOG}`,
  COMPLEXES: `/${PATHS.CATALOG}/${PATHS.COMPLEXES}`,
  NEW_BUILDINGS: `/${PATHS.CATALOG}/${PATHS.NEW_BUILDINGS}`,
  SECONDARY_HOUSING: `/${PATHS.CATALOG}/${PATHS.SECONDARY_HOUSING}`,
  MAP: `/${PATHS.MAP}`,
}
