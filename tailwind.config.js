module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Montserrat", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        open: ["Open Sans", "sans-serif"],
      },
      colors: {
        green: "#9BC53D",
        blue: {
          DEFAULT: "#54C6EB",
          10: "#54c5eb25",
        },
        gray: {
          DEFAULT: "#D7D7D7",
          10: "#f7f7f7",
        },
        dark: "#202020",
        yellow: {
          DEFAULT: "#DBFF0E",
          100: "#FFFDD0",
        },
        red: {
          DEFAULT: "#FF7272",
          10: "#FFE7E7",
        },
      },
      screens: {
        xs: "489px",
      },
      gridTemplateColumns: {
        auto: "repeat(auto-fit, minmax(230px, 1fr))",
        for_user_card: "repeat(auto-fit, minmax(260px, 1fr))",
      },
      gridTemplateRows: {
        auto: "repeat(auto-fill, minmax(200px, 1fr))",
      },
    },
  },
  plugins: [],
};
