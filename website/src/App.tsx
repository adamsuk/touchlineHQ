import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppShell, Center, Loader, MantineProvider } from '@mantine/core';
import { loadAllData } from './data';
import type { AppData } from './types';
import { createClubTheme } from './theme';
import { SiteHeader } from './components/SiteHeader';
import { HomePage } from './pages/HomePage';
import { CalendarPage } from './pages/CalendarPage';
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
        <AppShell header={{ height: 70 }}>
          <SiteHeader club={data.club} />
          <AppShell.Main
            style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              minHeight: '100vh' // Ensures full viewport height minus header offset
            }}
          >
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <Routes>
                <Route path="/" element={<HomePage data={data} />} />
                <Route path="/calendar" element={<CalendarPage />} />
                <Route path="/payment-success" element={<PaymentSuccessPage />} />
                <Route path="/payment-cancelled" element={<PaymentCancelledPage />} />
                <Route path="*" element={<HomePage data={data} />} />
              </Routes>
            </div>
          </AppShell.Main>
        </AppShell>
      </BrowserRouter>
    </MantineProvider>
  );
}

export default App;
