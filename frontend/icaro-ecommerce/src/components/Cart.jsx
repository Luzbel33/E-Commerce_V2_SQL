import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { useCartStore } from '../stores/store';
import { useUserStore } from '../stores/store';
import { useEffect } from 'react';

const Cart = () => {
  const cartItems = useCartStore((state) => state.products);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const increaseQuantity = useCartStore((state) => state.increaseQuantity);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);
  const initCart = useCartStore((state) => state.initCart);
  const clearCart = useCartStore((state) => state.clearCart);
  const savePurchase = useCartStore((state) => state.savePurchase);
  const user = useUserStore((state) => state.user);
  
  const handlePagar = async (event) => {
    event.preventDefault();
  
    const total = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    await savePurchase(user, cartItems, total);

    const purchaseData = {
      user: user.email,
      products: cartItems.map((item) => ({
        title: item.title,
        quantity: item.quantity,
        price: item.price,
        total: item.price * item.quantity,
      })),
    };

    try {
      const options = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(purchaseData),
      };
  
      const response = await fetch('http://localhost:3000/savePurchase', options);
  
      if (response.ok) {
        console.log('Purchase data saved successfully.');
        // Clear the cart after successful purchase
        clearCart();
      } else {
        setError('Error saving purchase data: ' + response.statusText);
      }
    } catch (error) {
      console.error('Error saving purchase data:', error);
    }
  };

  useEffect(() => {
    initCart();
  }, []);

  return (
    <>
      <Header />
      <section className="carrito">
        {cartItems.map((item, index) => (
          <div key={index} id="productos">
            <h1 className="title-prod"name="title">{item.title}</h1>
            <img className="img-cart" name="img" src={item.img} alt={item.alt} />
            <div className='buttonsCart'>
            <h1 className="title-prod"name="price">$ {item.price}</h1>
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

              <span className="quantity"name="quantity">{item.quantity}</span>

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
        <p className="total-1" name="total">TOTAL:$ {cartItems.reduce((total, item) => total + item.price * item.quantity, 0)}</p> {/* Actualiza el total para sumar los precios totales de cada producto */}
          <button className="boton-cart2" id="botones-cart" onClick={(event) => handlePagar(event, user, cartItems)}>
            PAGAR
          </button>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Cart;


