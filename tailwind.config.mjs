import tokens from './design-handoff/tokens/tokens.json' assert { type: 'json' };

const twConfig = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Use CSS variables instead of hardcoding; tokens.css is canonical
      },
      fontSize: Object.fromEntries(
        Object.entries(tokens['font-size']).map(([k, v]) => [`fs-${k}`, v])
      ),
      lineHeight: Object.fromEntries(
        Object.entries(tokens['line-height']).map(([k, v]) => [`lh-${k}`, v])
      ),
      letterSpacing: Object.fromEntries(
        Object.entries(tokens.tracking).map(([k, v]) => [`tracking-${k}`, v])
      ),
      spacing: Object.fromEntries(
        Object.entries(tokens.space).map(([k, v]) => [`space-${k}`, v])
      ),
      borderRadius: Object.fromEntries(
        Object.entries(tokens.radius).map(([k, v]) => [`radius-${k}`, v])
      ),
      maxWidth: Object.fromEntries(
        Object.entries(tokens.measure).map(([k, v]) => [`measure-${k}`, v])
      ),
    }
  },
  plugins: []
};

export default twConfig;
