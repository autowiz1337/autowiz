/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
          950: '#082f49',
        },
        accent: {
          purple: '#d946ef',
          pink: '#ec4899',
          cyan: '#06b6d4',
        }
      },
      backgroundImage: {
        'hero-glow': 'conic-gradient(from 180deg at 50% 50%, #0c4a6e 0deg, #0f172a 180deg, #0c4a6e 360deg)',
        'glass': 'linear-gradient(180deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)',
        'glass-hover': 'linear-gradient(180deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.04) 100%)',
      },
      animation: {
        'scroll': 'scroll 60s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 4s linear infinite',
        'slider-hint': 'slider-hint 3s ease-in-out infinite',
        'gradient-x': 'gradient-x 3s ease infinite',
        'pop': 'pop 1s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'chat-appear': 'chat-appear 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards',
        'fade-in': 'fade-in 0.5s ease-out forwards',
        'fade-in-up': 'fade-in-up 0.5s ease-out forwards',
        'zoom-in': 'zoom-in 0.3s ease-out forwards',
      },
      transitionTimingFunction: {
        'hypnotic': 'cubic-bezier(0.23, 1, 0.32, 1)',
      },
      keyframes: {
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'slider-hint': {
          '0%, 100%': { transform: 'translateX(0) scale(1)', boxShadow: '0 0 0 rgba(14, 165, 233, 0)' },
          '25%': { transform: 'translateX(-5px) scale(1.1)', boxShadow: '0 0 20px rgba(14, 165, 233, 0.6)' },
          '75%': { transform: 'translateX(5px) scale(1.1)', boxShadow: '0 0 20px rgba(14, 165, 233, 0.6)' }
        },
        'gradient-x': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        },
        'pop': {
          '0%': { transform: 'scale(0.98)', opacity: '0.6' },
          '50%': { transform: 'scale(1.02)', boxShadow: '0 0 25px rgba(14, 165, 233, 0.4)' },
          '100%': { transform: 'scale(1)', opacity: '1', boxShadow: 'none' }
        },
        'chat-appear': {
          '0%': { transform: 'translateY(10px) scale(0.96)', opacity: '0' },
          '100%': { transform: 'translateY(0) scale(1)', opacity: '1' }
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        'zoom-in': {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' }
        }
      }
    }
  }
}