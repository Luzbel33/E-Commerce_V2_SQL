const Product = () => {
    return(
        <>
            <div id="product"> 
              <h1 className="title"></h1>
              <img className="prod-img" src="" alt="" />
              <h2 className="desc"></h2>
    
              <div className="botones">   
                <button className="boton" id="boton"><a id="boton" href="">Ver mas</a></button>
                <button className="boton" id="boton"><a id="boton" href="">Carrito</a></button>
              </div>
                <p className="precio"> </p>
            </div>
        </>
    )
}

export default Product