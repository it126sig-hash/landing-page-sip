/** @type {import('tailwindcss').Config} */
export default {
  safelist: ['scroll-smooth'],
  theme: {
    extend: {
      colors: {
        paper: 'var(--paper)',
        'paper-deep': 'var(--paper-deep)',
        white: 'var(--white)',
        ink: 'var(--ink)',
        muted: 'var(--muted)',
        green: 'var(--green)',
        'green-deep': 'var(--green-deep)',
        'green-soft': 'var(--green-soft)',
        'sage-pale': 'var(--sage-pale)',
        sand: 'var(--sand)',
        line: 'var(--line)',
      },
      fontFamily: {
        display: ['"Dream Orphans"', 'Georgia', 'sans-serif'],
        serif: ['"Dream Orphans"', 'Georgia', 'sans-serif'],
        body: ['Poppins', 'sans-serif'],
        sans: ['Poppins', 'sans-serif'],
      },
      fontSize: {
        'size-1': ['4.125rem',   { lineHeight: '1.05', letterSpacing: '-0.02em', fontWeight: '800' }],
        'size-2': ['2.5625rem',  { lineHeight: '1.1',  letterSpacing: '-0.01em', fontWeight: '800' }],
        'size-3': ['1.5625rem',  { lineHeight: '1.2',  letterSpacing: '-0.005em', fontWeight: '700' }],
        'size-4': ['1rem',       { lineHeight: '1.3',  letterSpacing: '0',        fontWeight: '700' }],
        'size-5': ['0.6125rem',  { lineHeight: '1.4',  letterSpacing: '0.01em',  fontWeight: '600' }],
        'size-6': ['0.3813rem',  { lineHeight: '1.5',  letterSpacing: '0.02em',  fontWeight: '400' }],
        'size-7': ['0.2361rem',  { lineHeight: '1.5',  letterSpacing: '0.02em',  fontWeight: '400' }],
        'size-8': ['0.1459rem',  { lineHeight: '1.4',  letterSpacing: '0.04em',  fontWeight: '400' }],
      },
      borderRadius: {
        btn: '999px',
        card: '22px',
      },
      boxShadow: {
        card: 'var(--shadow)',
      },
    },
  },
}
