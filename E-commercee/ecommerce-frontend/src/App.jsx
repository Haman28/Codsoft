import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import Navbar from './components/functional_comp';
import Han from './components/han';
import CartPage from './components/cartpage';
import { CartProvider } from './components/CartContext';
import PaymentPage from './components/PaymentPage'; // Import the PaymentPage component

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navbar />} />
          <Route path="/han" element={<Han />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/payment" element={<PaymentPage />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;