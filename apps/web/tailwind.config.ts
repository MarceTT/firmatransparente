import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // FirmaTransparente brand colors
        marino: {
          DEFAULT: '#1B3A5C',
          50: '#E8EDF2',
          100: '#D1DBE5',
          200: '#A3B7CB',
          300: '#7593B1',
          400: '#476F97',
          500: '#1B3A5C',
          600: '#162E4A',
          700: '#112337',
          800: '#0B1725',
          900: '#060C12',
        },
        verde: {
          DEFAULT: '#2D6A4F',
          50: '#E9F5EF',
          100: '#D3EBDF',
          200: '#A7D7BF',
          300: '#7BC39F',
          400: '#4FAF7F',
          500: '#2D6A4F',
          600: '#24553F',
          700: '#1B402F',
          800: '#122B20',
          900: '#091510',
        },
        ambar: {
          DEFAULT: '#E8A838',
          50: '#FDF6E9',
          100: '#FBEDD3',
          200: '#F7DBA7',
          300: '#F3C97B',
          400: '#EFB74F',
          500: '#E8A838',
          600: '#D4922A',
          700: '#A87220',
          800: '#7C5218',
          900: '#50350F',
        },
        hueso: {
          DEFAULT: '#F8F7F4',
          50: '#FFFFFF',
          100: '#F8F7F4',
          200: '#EFEEE9',
          300: '#E6E4DD',
          400: '#DDDBD2',
          500: '#D4D1C6',
        },
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
};

export default config;
