import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../components/Home';
import Register from '../components/Register';
import Login from '../components/Login';
import Logout from '../components/Logout';
import Product from '../components/Product';
import Product2 from '../components/Product2';
import AddProduct from '../components/AddProduct';
import Cart from '../components/Cart';

function RoutesConfig() {
  return (
    <Routes>
      <Route path="/" Component={Home} />
      <Route path="/register" Component={Register} />
      <Route path="/login" Component={Login} />
      <Route path="/Logout" Component={Logout} />
      <Route path="/products" Component={Product} />
      <Route path="/products/:id" Component={Product2} />
      <Route path="/AddProduct" Component={AddProduct} />
      <Route path="/EditProduct" Component={AddProduct}/>
      <Route path="/cart" Component={Cart} />
    </Routes>
  );
}

export default RoutesConfig;
