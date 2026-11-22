/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        page: 'var(--bg-page)',
        card: 'var(--bg-card)',
        subtle: 'var(--bg-subtle)',
        roseaccent: 'var(--accent-primary)',
        rosehover: 'var(--accent-hover)',
        slateink: 'var(--accent-slate)',
        ink: 'var(--text-primary)',
        inkmuted: 'var(--text-secondary)',
        line: 'var(--border)',
      },
      transitionTimingFunction: {
        spring: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      boxShadow: {
        soft: '0 12px 36px -12px rgba(36, 34, 54, 0.09)',
        rose: '0 10px 30px -10px rgba(255, 199, 199, 0.55)',
      },
    },
  },
  plugins: [],
};
