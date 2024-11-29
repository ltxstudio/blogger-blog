/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Enable dark mode via a class (e.g., add `dark` to `html` or `body`)
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Ensure all file types in src are scanned
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#4f46e5', // Customize for a primary brand color
          DEFAULT: '#4338ca',
          dark: '#312e81',
        },
        secondary: {
          light: '#ec4899',
          DEFAULT: '#db2777',
          dark: '#9d174d',
        },
      },
      spacing: {
        '128': '32rem', // Custom large spacing
        '144': '36rem',
      },
      typography: (theme) => ({
        dark: {
          css: {
            color: theme('colors.gray.300'),
            '[class~="lead"]': { color: theme('colors.gray.400') },
            a: { color: theme('colors.blue.500') },
            strong: { color: theme('colors.gray.100') },
            'ul > li::before': { backgroundColor: theme('colors.gray.700') },
            hr: { borderColor: theme('colors.gray.800') },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/forms'), // Enhanced form styles
    require('@tailwindcss/typography'), // Typography for better text rendering
    require('@tailwindcss/aspect-ratio'), // Utility for aspect-ratio controls
    require('@tailwindcss/line-clamp'), // Truncate text with ellipsis
    require('tailwind-scrollbar'), // Style scrollbars
    require('tailwind-scrollbar-hide'), // Hide scrollbars when needed
  ],
};
