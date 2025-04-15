/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/renderer/**/*.{js,jsx,ts,tsx,html}', './src/renderer/index.html'],
  // tailwind.config.js
  variants: {
    extend: {
      translate: ['group-hover']
    }
  },

  theme: {
    screens: {
      xs: '480px',
      sm: '640px',
      msm: '704px', // between sm and md
      md: '768px',
      mmd: '834px', // between md and lg
      lg: '1024px',
      mlg: '1062px', // between lg and xl
      xl: '1280px',
      '2xl': '1536px'
    },
    extend: {
      transitionProperty: {
        height: 'height',
        spacing: 'margin, padding',
        size: 'width, height'
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        float: 'float 3s ease-in-out infinite'
      },

      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        }
      }
    }
  },
  plugins: []
}
