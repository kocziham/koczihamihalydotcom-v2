import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import sitemap from '@astrojs/sitemap';
import tokens from './design-handoff/tokens/tokens.json' assert { type: 'json' };

const twColors = {};
Object.entries(tokens.color).forEach(([key, value]) => {
  twColors[`color-${key}`] = value;
});
Object.entries(tokens['color-dark']).forEach(([key, value]) => {
  twColors[`color-dark-${key}`] = value;
});

export default defineConfig({
  output: 'server',
  adapter: node({ mode: 'standalone' }),
  integrations: [],
  site: process.env.SITE_URL || 'https://koczihamihaly.com',
  vite: {
    ssr: {
      external: ['sharp']
    }
  }
});
