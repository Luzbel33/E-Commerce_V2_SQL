// import Header from './Header';
// import Footer from './Footer';

// const Cart = () => {
//     return (
//         <>
//             <Header />
//             <section className ="carrito">
//                 <div id="productos">
//                     <h1 className ="title-prod"></h1> 
//                     <img className ="img-cart" src="" alt=""  />
//                 </div> 

//                 <button className ="boton-cart" id="botones-cart">-</button>
//                 <button className ="boton-cart" id="botones-cart">+</button>
//                 <h2 className ="price"></h2>  

//                 <div className ="total">
//                     <p className ="total-1">TOTAL:</p>
//                     <p className ="total-1">$0000</p>
//                     <button className ="boton-cart2" id="botones-cart">PAGAR</button>
//                 </div>
//             </section>
//             <Footer/>
//         </>
//     )}

import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { useUserStore } from '../stores/store';

const Cart = () => {
  const user = useUserStore((state) => state.user);
  const cartItems = user.cart || [];

  const removeFromCart = (index) => {
    const updatedCart = [...cartItems];
    updatedCart.splice(index, 1);
    useUserStore.setState({ user: { ...user, cart: updatedCart } });
  };

  return (
    <>
      <Header />
      <section className="carrito">
        {cartItems.map((item, index) => (
          <div key={index} id="productos">
            <h1 className="title-prod">{item.title}</h1>
            <img className="img-cart" src={item.img} alt={item.alt} />
            <button className="boton-cart" id="botones-cart" onClick={() => removeFromCart(index)}>
              -
            </button>
            <span className="quantity">{item.quantity}</span>
            <button className="boton-cart" id="botones-cart">
              +
            </button>
            <h2 className="price">$ {item.price}</h2>
          </div>
        ))}
        <div className="total">
          <p className="total-1">TOTAL:</p>
          <p className="total-1">$ {cartItems.reduce((total, item) => total + item.price, 0)}</p>
          <button className="boton-cart2" id="botones-cart">
            PAGAR
          </button>
        </div>
      </section>
      <Footer />
    </>
  )
};

export default Cart;
