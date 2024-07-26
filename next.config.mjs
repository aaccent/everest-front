/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  staticPageGenerationTimeout: 100,
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1680, 1920, 2048],
    imageSizes: [16, 20, 22, 32, 48, 64, 96, 128, 256, 384],
  },
  eslint: {
    ignoreDuringBuilds: true,
  }
}

export default nextConfig
