/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  // daisyui: {
  //   themes: [
  //     {
  //       mytheme: {
  //         "primary": "#e11d48",
  //         "secondary": "#4b5563",
  //         "accent": "#CAFFD0",
  //         "neutral": "#444"
  //       }
  //     }
  //   ]
  // }
}

