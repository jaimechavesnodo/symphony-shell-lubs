/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        shell: {
          yellow: '#FBCE07',
          'yellow-light': '#FFF9D6',
          'yellow-mid': '#FFE44D',
          'yellow-dark': '#D4A800',
          red: '#DD1D21',
          'red-light': '#FFE8E8',
          'red-dark': '#B01519',
          white: '#FFFFFF',
          'gray-50': '#F7F7F7',
          'gray-100': '#F0F0F0',
          'gray-200': '#E0E0E0',
          'gray-300': '#CCCCCC',
          'gray-400': '#999999',
          'gray-500': '#666666',
          'gray-600': '#555555',
          'gray-700': '#404040',
          'gray-800': '#2D2D2D',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      keyframes: {
        wave: {
          '0%, 100%': { transform: 'scaleY(0.4)' },
          '50%': { transform: 'scaleY(1.0)' },
        },
        wave2: {
          '0%, 100%': { transform: 'scaleY(0.6)' },
          '40%': { transform: 'scaleY(1.0)' },
        },
        wave3: {
          '0%, 100%': { transform: 'scaleY(0.3)' },
          '60%': { transform: 'scaleY(0.9)' },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-12px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        wave: 'wave 1s ease-in-out infinite',
        wave2: 'wave2 1.2s ease-in-out infinite 0.15s',
        wave3: 'wave3 0.9s ease-in-out infinite 0.3s',
        wave4: 'wave 1.1s ease-in-out infinite 0.45s',
        wave5: 'wave2 1.3s ease-in-out infinite 0.6s',
        wave6: 'wave3 0.8s ease-in-out infinite 0.1s',
        wave7: 'wave 1.2s ease-in-out infinite 0.5s',
        fadeIn: 'fadeIn 0.3s ease-out',
        slideIn: 'slideIn 0.25s ease-out',
        shimmer: 'shimmer 2s linear infinite',
      },
      boxShadow: {
        card: '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
        'card-hover': '0 4px 12px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04)',
        modal: '0 20px 60px rgba(0,0,0,0.15)',
      }
    },
  },
  plugins: [],
}
