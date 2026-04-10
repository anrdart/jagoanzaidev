/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        heading: ['"Quicksand"', 'sans-serif'],
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      colors: {
        pastel: {
          slate: '#f1f5f9',
          sage: '#e8f3ea',
          blue: '#e3f2fd',
          cream: '#faf9f7',
          coral: '#ffede4',
          mint: '#e6f7f0',
          lavender: '#e8e3f3',
          peach: '#ffe8d6',
          lemon: '#fff9c4',
          bubblegum: '#fce4ec',
        },
        accent: {
          blue: '#4a90a4',
          sage: '#6b9b7a',
          coral: '#d4765c',
        },
        text: {
          primary: '#1e293b',
          secondary: '#475569',
          muted: '#64748b',
        }
      },
      boxShadow: {
        'soft': '0 4px 12px rgba(0, 0, 0, 0.05), 0 8px 24px rgba(0, 0, 0, 0.08)',
        'lift': '0 12px 40px rgba(0, 0, 0, 0.1), 0 20px 60px rgba(0, 0, 0, 0.12)',
        'glow': '0 0 30px rgba(107, 155, 122, 0.5)',
      },
      borderRadius: {
        'blob': '60% 40% 30% 70% / 60% 30% 70% 40%',
      }
    },
  },
  plugins: [],
}
