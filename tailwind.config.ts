import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  content: [
    './app/components/**/*.{js,vue,ts}',
    './app/layouts/**/*.vue',
    './app/pages/**/*.vue',
    './app/composables/**/*.{js,ts}',
    './app/utils/**/*.{js,ts}',
    './content/**/*.md',
    './app/app.vue',
    './app/error.vue',
  ],
  theme: {
    extend: {
      colors: {
        surface: {
          50: '#FFFFFF',
          100: '#FAFAFB',
          200: '#F4F5F7',
          300: '#E9EBEF',
          400: '#DBDEE5',
        },
        royal: {
          50: '#EEF2FC',
          100: '#DCE5F9',
          200: '#B9CBF3',
          300: '#8FACEA',
          400: '#5C82DD',
          500: '#2F58C4',
          600: '#1E3A8A',
          700: '#182F70',
          800: '#142757',
          900: '#101F44',
        },
        gold: {
          50: '#FBF7E9',
          100: '#F6EDCB',
          200: '#EEDB9C',
          300: '#E4C56C',
          400: '#DAB247',
          500: '#C9A227',
          600: '#A9840F',
          700: '#85670C',
          800: '#614B09',
          900: '#3D2F06',
        },
        wood: {
          50: '#F7F1EA',
          100: '#ECDFCE',
          200: '#D9BE9E',
          300: '#C39B6E',
          400: '#A67848',
          500: '#8B5A2B',
          600: '#6F4526',
          700: '#593A21',
          800: '#432B19',
          900: '#2E1D11',
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 2px 8px -2px rgba(16, 31, 68, 0.08), 0 8px 24px -8px rgba(16, 31, 68, 0.10)',
        premium: '0 4px 14px -4px rgba(16, 31, 68, 0.12), 0 16px 40px -12px rgba(16, 31, 68, 0.16)',
        glow: '0 0 0 1px rgba(201, 162, 39, 0.25), 0 8px 30px -8px rgba(201, 162, 39, 0.35)',
      },
      backgroundImage: {
        'grain': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E\")",
      },
      borderRadius: {
        xl2: '1.25rem',
        xl3: '1.75rem',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite',
        'fade-up': 'fadeUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
}
