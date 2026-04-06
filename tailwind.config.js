/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#0A0A0F',
          card: '#13131A',
          elevated: '#1C1C26',
        },
        accent: {
          violet: '#6C63FF',
          teal: '#00D4AA',
          orange: '#FF6B35',
          green: '#4CAF50',
        },
        text: {
          primary: '#F0F0F5',
          secondary: '#8888AA',
        },
        sport: {
          badminton: '#6C63FF',
          tennis: '#FFD700',
          soccer: '#00C853',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['Inter', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        card: '12px',
        btn: '8px',
      },
    },
  },
  plugins: [],
}
