export const PATHS = {
  CATALOG: 'catalog',
  NEW_BUILDINGS: 'new-buildings',
  COMPLEXES: 'complexes',
  APARTMENTS: 'apartments',
}

export const ROUTES = {
  CATALOG: `/${PATHS.CATALOG}`,
  COMPLEXES: `/${PATHS.CATALOG}/${PATHS.COMPLEXES}`,
  NEW_BUILDINGS: `/${PATHS.CATALOG}/${PATHS.NEW_BUILDINGS}`,
}
