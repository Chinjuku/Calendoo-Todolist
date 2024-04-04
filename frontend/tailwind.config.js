/** @type {import('tailwindcss').Config} */
export const darkMode = ["class"];
export const content = [
  './pages/**/*.{ts,tsx}',
  './components/**/*.{ts,tsx}',
  './app/**/*.{ts,tsx}',
  './src/**/*.{ts,tsx}',
];
export const prefix = "";
export const theme = {
  container: {
    center: true,
    padding: "2rem",
    screens: {
      "2xl": "1400px",
    },
  },
  extend: {
    screens: {
      'laptop': { min: '1280px' },
    },
    fontFamily: {
      sans: ['"LINE Seed Sans TH"', 'sans-serif'],
    },
    colors: {
      primary: "#F4EEFF",
      primary1: "#DCD6F7",
      secondary: "#424874",
      secondary1: "#A6B1E1",
      hover: "#E9E2F4",
      hover1: "#E0D8ED"
    },
    borderRadius: {
      lg: "var(--radius)",
      md: "calc(var(--radius) - 2px)",
      sm: "calc(var(--radius) - 4px)",
    },
    keyframes: {
      "accordion-down": {
        from: { height: "0" },
        to: { height: "var(--radix-accordion-content-height)" },
      },
      "accordion-up": {
        from: { height: "var(--radix-accordion-content-height)" },
        to: { height: "0" },
      },
    },
    animation: {
      "accordion-down": "accordion-down 0.2s ease-out",
      "accordion-up": "accordion-up 0.2s ease-out",
    },
  },
};

// eslint-disable-next-line no-undef
export const plugins = [require("daisyui"), require("tailwindcss-animate")];
export const daisyui = {
  themes: [
    {
      mytheme: {
        primary: "#F4EEFF",
        primary1: "#DCD6F7",
        secondary: "#424874",
        secondary1: "#A6B1E1",
        hover: "#E9E2F4",
      },
    },
    // "dark",
    // "cupcake",
  ],
};