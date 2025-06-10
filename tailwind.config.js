/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue"
  ],
  theme: {
    extend: {
      colors: {
        // Dwelling.health brand colors
        dwelling: {
          // Primary greens (from their branding)
          primary: '#2D5A27', // Deep forest green
          'primary-light': '#4A7C59', // Medium green
          'primary-lighter': '#7BA05B', // Light green
          
          // Secondary colors
          secondary: '#8B4513', // Warm brown
          'secondary-light': '#CD853F', // Light brown
          
          // Accent colors
          accent: '#D4E0E0', // Soft mint/gray (from their icons)
          'accent-light': '#F0F5F5', // Very light mint
          
          // Neutral colors that match their aesthetic
          gray: {
            50: '#FAFAFA',
            100: '#F5F5F5',
            200: '#E5E5E5',
            300: '#D4D4D4',
            400: '#A3A3A3',
            500: '#737373',
            600: '#525252',
            700: '#404040',
            800: '#262626',
            900: '#171717',
          },
          
          // Status colors that align with health/wellness theme
          success: '#22C55E', // Green for positive health outcomes
          warning: '#F59E0B', // Amber for moderate risk
          danger: '#EF4444', // Red for high risk
          info: '#3B82F6', // Blue for informational
        }
      },
      fontFamily: {
        // Clean, health-focused typography
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'heading': ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'dwelling': '12px', // Softer, more organic feeling
      },
      boxShadow: {
        'dwelling': '0 4px 6px -1px rgba(45, 90, 39, 0.1), 0 2px 4px -1px rgba(45, 90, 39, 0.06)',
        'dwelling-lg': '0 10px 15px -3px rgba(45, 90, 39, 0.1), 0 4px 6px -2px rgba(45, 90, 39, 0.05)',
      }
    },
  },
  plugins: [],
}
