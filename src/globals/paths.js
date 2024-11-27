export const PATHS = {
  CATALOG: 'catalog',
  NEW_BUILDINGS: 'new-building',
  COMPLEXES: 'complexes',
  SECONDARY_HOUSING: 'secondary-housing',
  APARTMENTS: 'apartments',
  MAP: 'map',
  COMPLEX_OBJECTS: 'complex-objects',
  CONTACTS: 'contacts',
  RENT: 'rent',
  SALE: 'sale',
}

export const ROUTES = {
  CATALOG: `/${PATHS.CATALOG}`,
  CATALOG_RENT: `/${PATHS.CATALOG}/${PATHS.RENT}`,
  CATALOG_SALE: `/${PATHS.CATALOG}/${PATHS.SALE}`,
  COMPLEXES: `/${PATHS.CATALOG}/${PATHS.COMPLEXES}`,
  COMPLEX_OBJECTS: `${PATHS.CATALOG}/${PATHS.COMPLEX_OBJECTS}`,
  NEW_BUILDINGS: `/${PATHS.CATALOG}/${PATHS.NEW_BUILDINGS}`,
  SECONDARY_HOUSING: `/${PATHS.CATALOG}/${PATHS.SECONDARY_HOUSING}`,
  MAP: `/${PATHS.MAP}`,
  CONTACTS: `/${PATHS.CONTACTS}`,
}
