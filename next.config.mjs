import { PATHS } from './src/globals/paths.js'

console.log(`/${PATHS.CATALOG}/${PATHS.NEW_BUILDINGS}/${PATHS.COMPLEXES}`)

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: !process.env.CI ? 'standalone' : undefined,
  staticPageGenerationTimeout: 100,
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1680, 1920, 2048],
    imageSizes: [16, 20, 22, 32, 48, 64, 96, 128, 256, 384],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  async redirects() {
    return [
      {
        source: `/${PATHS.CATALOG}/${PATHS.NEW_BUILDINGS}/${PATHS.COMPLEXES}`,
        destination: `/${PATHS.CATALOG}/${PATHS.COMPLEXES}`,
        permanent: true,
      }
    ]
  }
}

export default nextConfig
