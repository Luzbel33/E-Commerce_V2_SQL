import Header from './header';
import Footer from './Footer';

const Cart = () => {
    return (
        <>
            <Header />
            <section className ="carrito">
                <div id="productos">
                    <h1 className ="title-prod"></h1> 
                    <img className ="img-cart" src="" alt=""  />
                </div> 

                <button className ="boton-cart" id="botones-cart">-</button>
                <button className ="boton-cart" id="botones-cart">+</button>
                <h2 className ="price"></h2>  

                <div className ="total">
                    <p className ="total-1">TOTAL:</p>
                    <p className ="total-1">$0000</p>
                    <button className ="boton-cart2" id="botones-cart">PAGAR</button>
                </div>
            </section>
            <Footer/>
        </>
    )}

export default Cart