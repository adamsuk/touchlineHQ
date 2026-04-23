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
        '#f7fdf9',
        '#e6f9ee',
        '#cef2dc',
        '#9ee5b9',
        '#6bd896',
        '#22c55e',
        '#16a34a',
        '#15803d',
        '#166534',
        '#14532d',
      ],
    },
    primaryShade: { light: 6, dark: 8 },
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
