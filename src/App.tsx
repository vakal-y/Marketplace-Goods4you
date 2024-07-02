import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage.tsx/HomePage';
import ProductPage from './pages/ProductPage/ProductPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

const App: React.FC = () => {
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App
