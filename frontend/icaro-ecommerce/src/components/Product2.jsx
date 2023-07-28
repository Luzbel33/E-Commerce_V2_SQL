import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { NavLink } from 'react-router-dom';
import Footer from './Footer';

const Product2 = () => {
  const [product, setProduct] = useState();
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:3000/detailProduct/${id}`)
      .then(response => response.json())
      .then(product => setProduct(product));
  }, []);

  if(!product) {
    return (
      <></>
    )
  }
  
    return(
        <>
            <div id="product"> 
              <h1 className="title">{product.title}</h1>
              <img className="prod-img" src={product.img} alt={product.alt} />
              <h2 className="desc">{product.description}</h2>
    
              <div className="botones">   
                <button className="boton" id="boton"><NavLink id="boton" to="/cart">Carrito</NavLink></button>
                <p className="precio"> </p>
              </div>
            </div>
            <Footer />

        </>
    )
}

export default Product2

