import React from 'react';
import { NavLink } from 'react-router-dom';
import { useUserStore } from '../stores/store';
import { useCartStore } from '../stores/store';

const Product = ({ products, searchTerm}) => {
  const user = useUserStore((state) => state.user);
  const userEmail = user ? user.email : null;
  const isAdmin = user && user.rol === "ADMIN";
  
  const addToCart = useCartStore((state) => state.addToCart);
  const filteredProducts = products.filter((product) => {
    const title = product.title || ''; // Si product.title es null o undefined, asigna un valor vacío.
    return title.toUpperCase().includes((searchTerm || '').toUpperCase());
  });

  return (
    <>
      {filteredProducts.map((product, index) => (
        <div id="product" key={index}>
          <h1 className="title">{product.title}</h1>
          <img className="prod-img" src={product.img} alt={product.alt} />
          <h2 className="desc">{product.description}</h2>
    
          <div className="botones">   
            <button className="boton" id="boton"><NavLink id="boton" to={`/products/${product.id}`}>Ver mas</NavLink></button>
            {isAdmin ? (
              <button className="boton" id="boton" onClick={()=>navigate('/EditProduct',{state: {product}})}>
                Editar
              </button>
            ) : (
              <button className="boton" id="boton" onClick={() => addToCart(product, userEmail)}> {/* Pasamos el email del usuario */}
                Agregar a Carrito
              </button>
            )}
            <button className="boton" id="boton">
              <NavLink id="boton" to="/cart">Carrito</NavLink>
            </button>
            <p className="precio">$ {product.price}</p>
          </div>
        </div>
      ))}
    </>
  );
}

export default Product;







