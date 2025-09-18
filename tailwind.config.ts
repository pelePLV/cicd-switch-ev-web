import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'switch-green-primary': 'var(--color-switch-green-primary)',
        'switch-green-primary-hover': 'var(--color-switch-green-primary-hover)',
        'switch-soft-green-background': 'var(--color-switch-soft-green-background)',
        'switch-blue-primary': 'var(--color-switch-blue-primary)',
      },
      backgroundImage: {
        'switch-sidebar': 'var(--background-image-switch-sidebar)',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};

export default config; 