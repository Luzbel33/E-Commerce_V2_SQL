import React from 'react';
import { NavLink } from 'react-router-dom';

const Product = ({ products, searchTerm }) => {
  const filteredProducts = products.filter(product =>
    product.title.toUpperCase().includes(searchTerm.toUpperCase())
  );

  return (
    <>
      {filteredProducts.map((product, index) => (
        <div id="product" key={index}>
          <h1 className="title">{product.title}</h1>
          <img className="prod-img" src={product.img} alt={product.alt} />
          <h2 className="desc">{product.description}</h2>
    
          <div className="botones">   
            <button className="boton" id="boton"><NavLink id="boton" to={`/products/${product.id}`}>Ver mas</NavLink></button>
            <button className="boton" id="boton"><NavLink id="boton" to="/cart">Carrito</NavLink></button>
            <p className="precio">{product.price}</p>
          </div>
        </div>
      ))}
    </>
  );
}

export default Product;

