import React, { useState, useEffect } from 'react';

const Product = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/detailProduct")
      .then(response => response.json())
      .then(products => setProducts(products));
  }, []);
  
    return(
        <>
         {products.map((product, index) => (
            <div id="product" key={index}> 
              <h1 className="title">{product.title}</h1>
              <img className="prod-img" src={product.img} alt={product.alt} />
              <h2 className="desc">{product.desc}</h2>
    
              <div className="botones">   
                <button className="boton" id="boton"><a id="boton" href="/product">Ver mas</a></button>
                <button className="boton" id="boton"><a id="boton" href="/cart">Carrito</a></button>
                <p className="precio"> </p>
              </div>
            </div>
            ))}
        </>
    )
}

export default Product