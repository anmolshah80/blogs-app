import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      /** Adding new breakpoints -> https://v3.tailwindcss.com/docs/screens#adding-new-breakpoints */
      screens: {
        xs: '500px',
      },
    },
  },
} satisfies Config;
