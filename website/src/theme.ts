import { createTheme } from '@mantine/core';

export function createClubTheme(primaryColor = 'green') {
  return createTheme({
    primaryColor,
    fontFamily: 'system-ui, -apple-system, sans-serif',
  });
}

export const theme = createClubTheme();
