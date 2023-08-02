import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, NavLink } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';
import { useUserStore } from '../stores/store';
import { useCartStore } from '../stores/store';

const Product2 = () => {
  const [product, setProduct] = useState();
  const { id } = useParams();
  const user = useUserStore((state) => state.user);
  const isAdmin = user && user.rol === "ADMIN";
  const addToCart = useCartStore((state) => state.addToCart);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:3000/detailProduct/${id}`)
      .then(response => response.json())
      .then(product => setProduct(product));
  }, []);

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:3000/deleteProduct/${id}`, {
        method: 'POST',
      });

      if (response.ok) {
        console.log('Producto eliminado correctamente.');
        navigate('/'); // Redirige a la página principal después de eliminar el producto
      } else {
        console.log('Error al eliminar el producto en el servidor.');
      }
    } catch (error) {
      console.log('Error al conectarse con el servidor:', error);
    }
  };

  if (!product) {
    return <></>;
  }

  return (
    <>
      <Header />
      <div id="product">
        <h1 className="title">{product.title}</h1>
        <img className="prod-img" src={product.img} alt={product.alt} />
        <h2 className="desc">{product.description}</h2>

        <div className="botones">
          {isAdmin ? (
            <>
              <button className="boton" id="boton" onClick={() => navigate('/EditProduct', { state: { product } })}>
                Editar
              </button>
              <button className="boton" id="boton" onClick={handleDelete}>
                Eliminar
              </button>
            </>
          ) : (
                <button className="boton" id="boton" onClick={() => addToCart(product)}>
                  <NavLink id="boton" to="/cart">Comprar</NavLink>
                </button>
          )}
          <p className="precio">$ {product.price}</p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Product2;