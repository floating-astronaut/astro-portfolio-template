/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Tokens pull from CSS variables defined in src/styles/tokens.css.
        // This lets a future light theme flip without touching the config.
        bg: 'rgb(var(--color-bg) / <alpha-value>)',
        surface: 'rgb(var(--color-surface) / <alpha-value>)',
        'surface-2': 'rgb(var(--color-surface-2) / <alpha-value>)',
        border: 'rgb(var(--color-border) / <alpha-value>)',
        fg: 'rgb(var(--color-fg) / <alpha-value>)',
        muted: 'rgb(var(--color-muted) / <alpha-value>)',
        subtle: 'rgb(var(--color-subtle) / <alpha-value>)',
        brand: 'rgb(var(--color-brand) / <alpha-value>)',
        'brand-ink': 'rgb(var(--color-brand-ink) / <alpha-value>)',
        electric: 'rgb(var(--color-electric) / <alpha-value>)',
        accent: 'rgb(var(--color-accent) / <alpha-value>)',
        danger: 'rgb(var(--color-danger) / <alpha-value>)',
        warn: 'rgb(var(--color-warn) / <alpha-value>)',
        ok: 'rgb(var(--color-ok) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['"Inter Tight Variable"', 'Inter Tight', 'system-ui', 'sans-serif'],
        mono: ['"Geist Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      fontSize: {
        // Fluid type. Pair with CSS custom properties for overrides.
        'fluid-xs':  'clamp(0.75rem, 0.72rem + 0.15vw, 0.8125rem)',
        'fluid-sm':  'clamp(0.875rem, 0.84rem + 0.17vw, 0.9375rem)',
        'fluid-base':'clamp(1rem, 0.96rem + 0.2vw, 1.0625rem)',
        'fluid-lg':  'clamp(1.125rem, 1.06rem + 0.3vw, 1.25rem)',
        'fluid-xl':  'clamp(1.25rem, 1.15rem + 0.5vw, 1.5rem)',
        'fluid-2xl': 'clamp(1.5rem, 1.3rem + 1vw, 2rem)',
        'fluid-3xl': 'clamp(1.875rem, 1.55rem + 1.6vw, 2.75rem)',
        'fluid-4xl': 'clamp(2.25rem, 1.75rem + 2.5vw, 3.75rem)',
        'fluid-5xl': 'clamp(2.75rem, 2rem + 3.75vw, 5rem)',
        'fluid-6xl': 'clamp(3.25rem, 2.2rem + 5.25vw, 6.5rem)',
      },
      borderRadius: {
        DEFAULT: 'var(--radius)',
        sm: 'var(--radius-sm)',
        md: 'var(--radius)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
        '2xl': 'var(--radius-2xl)',
      },
      boxShadow: {
        'glow-brand': '0 0 0 1px rgb(var(--color-brand) / 0.25), 0 8px 40px -8px rgb(var(--color-brand) / 0.35)',
        'inset-border': 'inset 0 0 0 1px rgb(var(--color-border) / 0.6)',
      },
      maxWidth: {
        'container': 'var(--container-max)',
        'prose-tight': '62ch',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};
