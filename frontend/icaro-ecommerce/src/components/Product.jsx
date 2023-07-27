import React from 'react';

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
            <button className="boton" id="boton"><a id="boton" href={`/products/${product.id}`}>Ver mas</a></button>
            <button className="boton" id="boton"><a id="boton" href="/cart">Carrito</a></button>
            <p className="precio"> </p>
          </div>
        </div>
      ))}
    </>
  );
}

export default Product;

