/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '100%',
            code: {
              backgroundColor: '#f0f0f0',
              padding: '0.2em 0.4em',
              borderRadius: '0.25rem',
              fontWeight: '400',
              fontFamily: 'monospace'
            },
            'code::before': {
              content: '""'
            },
            'code::after': {
              content: '""'
            },
            pre: {
              backgroundColor: '#1e1e1e',
              color: '#d4d4d4',
              overflow: 'auto',
              padding: '1rem',
              borderRadius: '0.375rem',
              border: '1px solid #2d2d2d'
            },
            'pre code': {
              backgroundColor: 'transparent',
              padding: 0
            },
            img: {
              borderRadius: '0.375rem'
            }
          }
        }
      }
    },
  },
  plugins: [
    function({ addComponents }) {
      addComponents({
        '.prose': {
          '& h1, & h2, & h3, & h4, & h5, & h6': {
            fontWeight: '700',
            lineHeight: '1.25',
            marginTop: '1.5em',
            marginBottom: '0.5em'
          },
          '& h1': { fontSize: '2.25em' },
          '& h2': { fontSize: '1.875em' },
          '& h3': { fontSize: '1.5em' },
          '& h4': { fontSize: '1.25em' },
          '& h5': { fontSize: '1.125em' },
          '& h6': { fontSize: '1em' },
          '& p': {
            marginTop: '1em',
            marginBottom: '1em'
          },
          '& ul, & ol': {
            paddingLeft: '1.5em',
            marginTop: '1em',
            marginBottom: '1em'
          },
          '& li': {
            marginTop: '0.5em',
            marginBottom: '0.5em'
          },
          '& blockquote': {
            fontStyle: 'italic',
            borderLeftWidth: '4px',
            borderLeftColor: '#e2e8f0',
            paddingLeft: '1em',
            marginLeft: 0,
            marginRight: 0
          },
          '& a': {
            color: '#3b82f6',
            textDecoration: 'underline',
            '&:hover': {
              color: '#2563eb'
            }
          },
          '& table': {
            width: '100%',
            tableLayout: 'auto',
            textAlign: 'left',
            marginTop: '2em',
            marginBottom: '2em',
            borderCollapse: 'collapse'
          },
          '& thead': {
            borderBottomWidth: '1px',
            borderBottomColor: '#e2e8f0'
          },
          '& th': {
            padding: '0.75em',
            verticalAlign: 'bottom',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            fontSize: '0.875em'
          },
          '& td': {
            padding: '0.75em',
            verticalAlign: 'top',
            borderBottomWidth: '1px',
            borderBottomColor: '#e2e8f0'
          },
          '& img': {
            maxWidth: '100%',
            height: 'auto',
            marginTop: '2em',
            marginBottom: '2em'
          },
          '& hr': {
            marginTop: '3em',
            marginBottom: '3em'
          },
          '& pre': {
            marginTop: '1.5em',
            marginBottom: '1.5em',
            overflowX: 'auto'
          }
        },
        '.prose-sm': {
          fontSize: '0.875rem',
          lineHeight: '1.5',
          '& h1, & h2, & h3, & h4, & h5, & h6': {
            marginTop: '1.25em',
            marginBottom: '0.5em'
          }
        },
        '.prose-invert': {
          color: '#d1d5db',
          '& a': {
            color: '#60a5fa',
            '&:hover': {
              color: '#93c5fd'
            }
          },
          '& blockquote': {
            borderLeftColor: '#4b5563'
          },
          '& thead': {
            borderBottomColor: '#4b5563'
          },
          '& td': {
            borderBottomColor: '#4b5563'
          },
          '& code': {
            backgroundColor: '#1f2937'
          }
        }
      });
    }
  ],
};