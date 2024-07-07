import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage.tsx/HomePage';
import ProductPage from './pages/ProductPage/ProductPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import CartPage from './pages/CartPage/CartPage';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import './App.scss';
import { scrollToSection } from './helpers/scrollToSection';

const App: React.FC = () => {

  return (
    <div className="app">
      <Header scrollToSection={scrollToSection} />
      <main className="main-content">
        <HelmetProvider>
          <Routes>
            <Route path="/" element={<HomePage scrollToSection={scrollToSection} />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </HelmetProvider>
      </main>
      <Footer scrollToSection={scrollToSection} />
    </div>
  );
};

export default App;