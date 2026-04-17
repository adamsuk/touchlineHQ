import { createTheme } from '@mantine/core';

export function createClubTheme(primaryColor = 'green') {
  return createTheme({
    primaryColor,
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif',
    headings: {
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif',
      fontWeight: '700',
    },
    colors: {
      green: [
        '#e8ffd6',
        '#d1ffad',
        '#baff85',
        '#a3ff5c',
        '#8cff33',
        '#39ff14', // Primary vibrant green
        '#32e012',
        '#2bc210',
        '#24a30e',
        '#1d850c',
      ],
      navy: [
        '#f0f2f4',
        '#e1e5e9',
        '#c3cad3',
        '#a5afbd',
        '#8795a8',
        '#697a92',
        '#1a2b3c', // Primary deep navy
        '#152432',
        '#101e28',
        '#0b171e',
      ],
    },
    primaryShade: { light: 5, dark: 7 },
    defaultRadius: 'lg',
    spacing: {
      xs: '0.5rem',
      sm: '0.75rem',
      md: '1rem',
      lg: '1.5rem',
      xl: '2rem',
      xxl: '3rem',
    },
    shadows: {
      xs: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
      sm: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
      md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
      lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
      xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    },
    components: {
      Paper: {
        defaultProps: {
          radius: 'lg',
          shadow: 'sm',
          withBorder: false,
        },
      },
      Button: {
        defaultProps: {
          radius: 'lg',
        },
      },
      Card: {
        defaultProps: {
          radius: 'lg',
          shadow: 'sm',
          padding: 'lg',
        },
      },
    },
  });
}

export const theme = createClubTheme();
