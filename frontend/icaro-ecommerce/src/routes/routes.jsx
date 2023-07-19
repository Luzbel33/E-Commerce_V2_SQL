import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../components/Home';
import Register from '../components/Register';
import Login from '../components/Login';
import Product from '../components/Product';
import Cart from '../components/Cart';

function RoutesConfig() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/product" element={<Product />} />
      <Route path="/cart" element={<Cart />} />
    </Routes>
  );
}

export default RoutesConfig;
