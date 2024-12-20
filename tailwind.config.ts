import { Config } from 'tailwindcss';
import svgToDataUri from 'mini-svg-data-uri';
import { default as flattenColorPalette } from 'tailwindcss/lib/util/flattenColorPalette';

/** @type {import('tailwindcss').Config} */
const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{ts,tsx}' // Including src as well
  ],
  darkMode: 'class', // Enable dark mode with class-based strategy
  theme: {
    extend: {
      fontFamily: {
        fraktur: ['"UnifrakturCook"', 'serif'], 
      },
      animation: {
        shimmer: 'shimmer 2s linear infinite',
        'spin-slow': 'spin 4s linear infinite',
      },
      keyframes: {
        shimmer: {
          from: { backgroundPosition: '0 0' },
          to: { backgroundPosition: '-200% 0' },
        },
        spin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
    },
  },
  plugins: [
    addVariablesForColors,
    function ({ matchUtilities, theme }: any) {
      matchUtilities(
        {
          'bg-dot-thick': (value: string) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16" fill="none">
                <circle fill="${value}" id="pattern-circle" cx="10" cy="10" r="2.5"></circle>
              </svg>`
            )}")`,
          }),
        },
        { values: flattenColorPalette(theme('backgroundColor')), type: 'color' }
      );
    },
    require('tailwindcss-animate'),
  ],
};

// This plugin adds each Tailwind color as a global CSS variable, e.g., var(--gray-200).
function addVariablesForColors({ addBase, theme }: any) {
  const allColors = flattenColorPalette(theme('colors'));
  const newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ':root': newVars, // Apply the color variables globally
  });
}

export default config;
