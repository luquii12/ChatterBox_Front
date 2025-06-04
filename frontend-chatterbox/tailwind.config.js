/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,html}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-color': '#FFEBA7',
        'secondary-color': '#FFFFFF',
        'highlight-text': '#7C6FC4',
        'background-primary': '#181F2F',
        'background-secondary': '#2B2E38',
        'background-terciary': '#1F2029',
      },
    },
  },
  plugins: [],
}
