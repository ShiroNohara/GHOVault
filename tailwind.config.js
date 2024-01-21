/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        backgroundTint: "#141217",
        shade: "#333333",
        shade2: "#999999",
        customPurple: "#B6509E",
        customPurpleHoverDark: "#5C093B", // Darker color for customPurple hover
        customPurpleHoverLight: "#E576AF", // Lighter color for customPurple hover
        customCyan: "#2EBAC6",
        customCyanHoverDark: "#0D5158", // Darker color for customCyan hover
        customCyanHoverLight: "#A4E7EC", // Lighter color for customCyan hover
      },
      borderColor: {
        mainColor: "#B6509E",
        default: "#1f0a43",
      },
      boxShadow: {
        neonGlow:
          "0 0 10px #ffffff, 0 0 20px #ffffff, 0 0 30px #ffffff, 0 0 40px #2EBAC6",
      },
      height: {
        custom: "40rem",
      },
      textColor: {
        customPurple: "#B6509E",
      },
    },
  },
  plugins: [],
};
