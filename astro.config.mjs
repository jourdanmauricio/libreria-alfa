import { defineConfig } from 'astro/config';

import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],
  image: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.cloudinary.com',
      },
    ],
  },
  site: 'https://jourdanmauricio.github.io',
  base: '/libreria-alfa',
  vite: {
    ssr: {
      external: ['svgo'],
    },
  },
});