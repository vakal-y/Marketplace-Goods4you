import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage.tsx/HomePage';
import ProductPage from './pages/ProductPage/ProductPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import CartPage from './pages/CartPage/CartPage';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import ScrollToTop from './components/ScrollToTop';
import './App.scss';



const App: React.FC = () => {
  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App