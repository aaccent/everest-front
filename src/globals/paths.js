export const PATHS = {
  CATALOG: 'catalog',
  NEW_BUILDINGS: 'new-building',
  COMPLEXES: 'complexes',
  SECONDARY_HOUSING: 'secondary-housing',
  APARTMENTS: 'flat',
  MAP: 'map',
  COMPLEX_OBJECTS: 'complex-objects',
  CONTACTS: 'contacts',
  RENT: 'rent',
  SALE: 'sale',
  RENT_BY_DAY: 'by-day',
  NEW: 'new',
}

export const ROUTES = {
  CATALOG: `/${PATHS.CATALOG}`,
  CATALOG_RENT: `/${PATHS.CATALOG}/${PATHS.RENT}`,
  CATALOG_SALE: `/${PATHS.CATALOG}/${PATHS.SALE}`,
  CATALOG_RENT_BY_DAY: `/${PATHS.CATALOG}/${PATHS.RENT}/${PATHS.RENT_BY_DAY}`,
  COMPLEXES: `/${PATHS.CATALOG}/${PATHS.COMPLEXES}`,
  COMPLEX_OBJECTS: `${PATHS.CATALOG}/${PATHS.COMPLEX_OBJECTS}`,
  NEW_BUILDINGS: `/${PATHS.CATALOG}/${PATHS.NEW_BUILDINGS}`,
  SECONDARY_HOUSING: `/${PATHS.CATALOG}/${PATHS.SECONDARY_HOUSING}`,
  MAP: `/${PATHS.MAP}`,
  CONTACTS: `/${PATHS.CONTACTS}`,
  NEW_CATALOG: `/${PATHS.CATALOG}/${PATHS.NEW}`,
  NEW_SECONDARY: `/${PATHS.CATALOG}/${PATHS.NEW}/${PATHS.SECONDARY_HOUSING}`,
}
