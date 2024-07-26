import React from 'react'
import { getComplexes } from '@/globals/api/methods/getComplexes'
import CatalogPageFilter from '@/page-components/catalog/CatalogPageFilter_test/CatalogPageFilter'
import { ViewProvider } from '@/page-components/catalog/CatalogPageFilter_test/ViewContext'
import CatalogContent from '@/page-components/catalog/CatalogContent/CatalogContent'
import CatalogPageTitle from '@/page-components/catalog/CatalogPageTitle'
import Section from '@/layout/Section'

async function Page() {
  const data = await getComplexes()

  const pageTitle = {
    breadcrumbs: data.breadcrumbs,
    title: data.breadcrumbs[data.breadcrumbs.length - 1].name,
    amount: data.categories.length,
  }

  return (
    <Section>
      <CatalogPageTitle {...pageTitle} />
      <ViewProvider>
        <CatalogPageFilter />
        <CatalogContent list={data.categories} tilePerView={2} listPerView={1} />
      </ViewProvider>
    </Section>
  )
}

export default Page
