import fluid, { extract, screens } from "fluid-tailwind";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}", extract],
  theme: {
    extend: {
      screens,
      colors: {
        primary: {
          green: {
            200: "hsl(148, 38%, 91%)",
            600: "hsl(169, 82%, 27%)",
          },
          red: "hsl(0, 66%, 54%)",
        },
        neutral: {
          gray: {
            500: "hsl(186, 15%, 59%)",
            900: "hsl(187, 24%, 22%)",
          },
        },
      },
      fontFamily: {
        karla: ["Karla", "sans-serif"],
      },
    },
  },
  plugins: [fluid],
};
