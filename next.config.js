/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['en', 'ru'],
    defaultLocale: 'en',
  },
  env: {
    FRONT_URL: 'https://godzillagram.com',
    API_URL: 'https://godzillagram.com/api/v1',
  },
}

module.exports = nextConfig
