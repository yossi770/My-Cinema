import React from "react";
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import TicketPurchase from './pages/TicketPurchase';
import { History } from './pages/History';
import AppContextProvider from "./AppContext";
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CacheProvider, ThemeProvider } from '@emotion/react';
import rtlPlugin from 'stylis-plugin-rtl';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  direction: 'rtl',
});
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

const App: React.FunctionComponent = () => {

  return (
    <AppContextProvider>
      <CacheProvider value={cacheRtl}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <div dir="rtl">
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/ticket">
                  <Route index element={<TicketPurchase />} />
                  <Route path=":id" element={<TicketPurchase />} />
                </Route>
                <Route path="/history" element={<History />}>
                  <Route index element={<History />} />
                  <Route path=":id" element={<History />} />
                </Route>
              </Routes>
              <Footer></Footer>
            </div>
          </BrowserRouter>
        </ThemeProvider>
      </CacheProvider>
    </AppContextProvider>
  );
};

export default App;