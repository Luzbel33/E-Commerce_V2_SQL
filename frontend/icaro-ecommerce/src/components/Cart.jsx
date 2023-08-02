import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { useCartStore } from '../stores/store';
import { useUserStore } from '../stores/store';
import { useState,useEffect } from 'react';

const Cart = () => {
  const cartItems = useCartStore((state) => state.products);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const increaseQuantity = useCartStore((state) => state.increaseQuantity);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);
  const initCart = useCartStore((state) => state.initCart);
  const savePurchase = useCartStore((state) => state.savePurchase);
  const [user, setUser] = useState(useUserStore((state) => state.user));
  const products = useCartStore((state) => state.products); // Retrieve products outside of handlePagar

  const handlePagar = async (event, user, products) => { // Pass products as an argument
    event.preventDefault();
    const total = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    await savePurchase(user, products, total);
  };

  
  // Inicializamos el carrito una vez que el componente se monta
  useEffect(() => {
    initCart();
  }, []);

  return (
    <>
      <Header />
      <section className="carrito">
        {cartItems.map((item, index) => (
          <div key={index} id="productos">
            <h1 className="title-prod">{item.title}</h1>
            <img className="img-cart" src={item.img} alt={item.alt} />
            <div className='buttonsCart'>
                <button 
                 className="boton-cart" 
                 id="botones-cart" 
                 onClick={() => {
                   if (item.quantity > 1) {
                     decreaseQuantity(index);
                   } else {
                     removeFromCart(index);
                   }
                 }}>
                    -
                  </button>
                  
                  <span className="quantity">{item.quantity}</span>
                  
                  <button 
                 className="boton-cart" 
                 id="botones-cart" 
                 onClick={() => {
                   increaseQuantity(index);
                 }}>
                  +
                </button>
            </div>
        </div>
    ))}
        <div className="total">
          <p className="total-1">TOTAL:$ {cartItems.reduce((total, item) => total + item.price * item.quantity, 0)}</p> {/* Actualiza el total para sumar los precios totales de cada producto */}
          <button className="boton-cart2" id="botones-cart" onClick={(event) => handlePagar(event, user, products)}>
  PAGAR
</button>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Cart;


