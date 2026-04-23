import { useEffect, useState } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { AppShell, Center, Loader, MantineProvider } from '@mantine/core';
import { loadAllData } from './data';
import type { AppData } from './types';
import { createClubTheme } from './theme';
import { SiteHeader } from './components/SiteHeader';
import { HomePage } from './pages/HomePage';

export const App = () => {
  const [data, setData] = useState<AppData | null>(null);

  useEffect(() => {
    loadAllData().then(setData);
  }, []);

  useEffect(() => {
    if (data) document.title = data.club.name;
  }, [data]);

  if (!data) {
    return (
      <Center h="100vh">
        <Loader size="xl" />
      </Center>
    );
  }

  const clubTheme = createClubTheme(data.club.primaryColor);

  return (
    <MantineProvider theme={clubTheme}>
      <HashRouter>
        <AppShell header={{ height: 70 }} padding="md">
          <AppShell.Header>
            <SiteHeader club={data.club} />
          </AppShell.Header>
          <AppShell.Main p={0}>
            <Routes>
              <Route path="/" element={<HomePage data={data} />} />
              {/* Only one route - any other path redirects to home */}
              <Route path="*" element={<HomePage data={data} />} />
            </Routes>
          </AppShell.Main>
        </AppShell>
      </HashRouter>
    </MantineProvider>
  );
}

export default App;
