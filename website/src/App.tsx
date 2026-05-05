import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppShell, Center, Loader, MantineProvider } from '@mantine/core';
import { loadAllData } from './data';
import type { AppData } from './types';
import { createClubTheme } from './theme';
import { SiteHeader } from './components/SiteHeader';
import { HomePage } from './pages/HomePage';
import { PaymentSuccessPage } from './pages/PaymentSuccessPage';
import { PaymentCancelledPage } from './pages/PaymentCancelledPage';

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
      <BrowserRouter>
        <AppShell>
          <SiteHeader club={data.club} />
          <AppShell.Main p={0}>
            <Routes>
              <Route path="/" element={<HomePage data={data} />} />
              <Route path="/payment-success" element={<PaymentSuccessPage />} />
              <Route path="/payment-cancelled" element={<PaymentCancelledPage />} />
              <Route path="*" element={<HomePage data={data} />} />
            </Routes>
          </AppShell.Main>
        </AppShell>
      </BrowserRouter>
    </MantineProvider>
  );
}

export default App;
