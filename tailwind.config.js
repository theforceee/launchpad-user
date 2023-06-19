/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors")
const withMT = require("@material-tailwind/react/utils/withMT")
delete colors.lightBlue
delete colors.warmGray
delete colors.trueGray
delete colors.coolGray
delete colors.blueGray

module.exports = withMT({
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      xxs: "400px",
      xs: "640px",
      sm: "768px",
      md: "960px",
      "2md": "1100px",
      lg: "1280px",
      xl: "1368px",
      "2xl": "1536px",
      main: "1440px"
    },
    colors: {
      main: "#000122",
      blazeOrange: "#FF9633",
      blazePurple: "#504FBE",
      textGray: "#9999A7",
      ...colors
    },
    fontFamily: {},
    fontSize: {
      "10/14": ["10px", { lineHeight: "14px" }],
      "10/32": ["10px", { lineHeight: "32px" }],
      "12/16": ["12px", { lineHeight: "16px" }],
      "12/18": ["12px", { lineHeight: "18px" }],
      "12/20": ["12px", { lineHeight: "20px" }],
      "14/18": ["14px", { lineHeight: "18px" }],
      "14/20": ["14px", { lineHeight: "20px" }],
      "14/24": ["14px", { lineHeight: "24px" }],
      "14/32": ["14px", { lineHeight: "32px" }],
      "16/20": ["16px", { lineHeight: "20px" }],
      "16/24": ["16px", { lineHeight: "24px" }],
      "16/28": ["16px", { lineHeight: "28px" }],
      "18/24": ["18px", { lineHeight: "24px" }],
      "18/32": ["18px", { lineHeight: "32px" }],
      "20/28": ["20px", { lineHeight: "28px" }],
      "20/32": ["20px", { lineHeight: "32px" }],
      "22/32": ["22px", { lineHeight: "32px" }],
      "24/32": ["24px", { lineHeight: "32px" }],
      "26/32": ["26px", { lineHeight: "32px" }],
      "28/36": ["28px", { lineHeight: "36px" }],
      "28/40": ["28px", { lineHeight: "40px" }],
      "32/40": ["32px", { lineHeight: "40px" }],
      "32/60": ["32px", { lineHeight: "60px" }],
      "36/40": ["36px", { lineHeight: "40px" }],
      "36/48": ["36px", { lineHeight: "48px" }],
      "48/60": ["48px", { lineHeight: "60px" }],
      "40/32": ["40px", { lineHeight: "32px" }],
      "40/52": ["40px", { lineHeight: "52px" }],
      "54/54": ["54px", { lineHeight: "54px" }],
      "56/60": ["56px", { lineHeight: "60px" }],
      "60/72": ["60px", { lineHeight: "72px" }],
      "64/48": ["64px", { lineHeight: "48px" }],
      "80/80": ["80px", { lineHeight: "80px" }]
    },
    extend: {
      colors: {
        // clr-gray
        "clr-gray-20": "var(--ds-clr-gray-20)",
        "clr-gray-30": "var(--ds-clr-gray-30)",
        "clr-gray-40": "var(--ds-clr-gray-40)",
        "clr-gray-50": "var(--ds-clr-gray-50)",
        "clr-gray-60": "var(--ds-clr-gray-60)",
        // clr-purple
        "clr-purple-10": "var(--ds-clr-purple-10)",
        "clr-purple-20": "var(--ds-clr-purple-20)",
        "clr-purple-30": "var(--ds-clr-purple-30)",
        "clr-purple-40": "var(--ds-clr-purple-40)",
        "clr-purple-50": "var(--ds-clr-purple-50)",
        "clr-purple-60": "var(--ds-clr-purple-60)",
        "clr-purple-70": "var(--ds-clr-purple-70)",
        "clr-purple-80": "var(--ds-clr-purple-80)",
        // clr-orange
        "clr-orange-20": "var(--ds-clr-orange-20)",
        "clr-orange-30": "var(--ds-clr-orange-30)",
        "clr-orange-40": "var(--ds-clr-orange-40)",
        "clr-orange-50": "var(--ds-clr-orange-50)",
        "clr-orange-60": "var(--ds-clr-orange-60)",
        // clr-red
        "clr-red-20": "var(--ds-clr-red-20)",
        "clr-red-30": "var(--ds-clr-red-30)",
        "clr-red-40": "var(--ds-clr-red-40)",
        "clr-red-50": "var(--ds-clr-red-50)",
        "clr-red-60": "var(--ds-clr-red-60)",
        // clr-blue
        "clr-blue-20": "var(--ds-clr-blue-20)",
        "clr-blue-30": "var(--ds-clr-blue-30)",
        "clr-blue-40": "var(--ds-clr-blue-40)",
        "clr-blue-50": "var(--ds-clr-blue-50)",
        "clr-blue-60": "var(--ds-clr-blue-60)",
        // clr-green
        "clr-green-20": "var(--ds-clr-green-20)",
        "clr-green-30": "var(--ds-clr-green-30)",
        "clr-green-40": "var(--ds-clr-green-40)",
        "clr-green-50": "var(--ds-clr-green-50)",
        "clr-green-60": "var(--ds-clr-green-60)",
        "clr-green-70": "var(--ds-clr-green-70)",
        "clr-green-70": "var(--ds-clr-green-70)",
        // gd (gradient)
        "gd-purple-dark": "var(--ds-gd-purple-dark-full)",
        "gd-purple": "var(--ds-gd-purple-full)",
        "gd-green-blue": "var(--ds-gd-green-blue-full)",
        "gd-red-blue": "var(--ds-gd-red-blue-full)",
        "gd-red-orange": "var(--ds-gd-red-orange-full)"
      }
    }
  },
  plugins: []
})
