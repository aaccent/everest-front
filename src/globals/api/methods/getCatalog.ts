import catalog from '@/globals/mock-data/catalog.json'
import detailCatalog from '@/globals/mock-data/detail-catalog.json'

export async function getCatalog() {
  return catalog
}

export async function getDetailCatalog() {
  return detailCatalog
}
