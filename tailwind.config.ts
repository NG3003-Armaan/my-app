const defaultTheme = require("tailwindcss/defaultTheme")

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        red: "var(--red)",
        "dark-blue": "#092F40",
        "very-light-gray": "var(--very-light-gray)",
        "dark-green": "var(--dark-green)",
        "muted-gray": "#A7A7A7",
        "light-gray": "#F5F5F5",
        primary: "#379B47",
        "danger-red": "#eb5d4c",
        "link-blue": "#3B77D1",
        "mine-shaft": "#3E3C3C",
        "light-green": "#ccf7d2",
        "dark-gray": "var(--dark-gray)",
        "cp-yellow": "var(--cp-yellow)",
        "cp-green": "var(--cp-green)",
        "cp-teal": "var(--cp-teal)",
      },
      fontFamily: {
        poppins: "var(--font-poppins)",
      },
      borderWidth: {
        DEFAULT: "1px",
        0: "0",
        2: "2px",
        3: "3px",
        4: "4px",
        6: "6px",
        8: "8px",
      },
      minHeight: {
        ...defaultTheme.height,
      },
      minWidth: {
        ...defaultTheme.width,
      },
    },
  },
  plugins: [],
  future: {
    hoverOnlyWhenSupported: true,
  },
}
