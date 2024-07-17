import React, { useEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage.tsx/HomePage';
import ProductPage from './pages/ProductPage/ProductPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import CartPage from './pages/CartPage/CartPage';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import './App.scss';
import { scrollToSection } from './helpers/scrollToSection';
import AuthPage from './pages/AuthPage/AuthPage';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

const App: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    const hash = location.hash;
    if (hash) {
      const element = document.getElementById(hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  return (
    <div className="app">
      <Header scrollToSection={scrollToSection} />
      <main className="main-content">
        <HelmetProvider>
          <Routes>
            <Route path="/" element={<HomePage scrollToSection={scrollToSection} />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/cart" element={<ProtectedRoute><CartPage /></ProtectedRoute>} />
            <Route path="*" element={<NotFoundPage />} />
            <Route path="/login" element={<AuthPage />} />
          </Routes>
        </HelmetProvider>
      </main>
      <Footer scrollToSection={scrollToSection} />
    </div>
  );
};

export default App;