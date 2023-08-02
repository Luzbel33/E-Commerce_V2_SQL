import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import Product from './Product';
import Banner from './Banner';
import { useUserStore } from '../stores/store';
import { NavLink } from 'react-router-dom';

const Home = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [products, setProducts] = useState([]);

    const user = useUserStore((state) => state.user);
    const isAdmin = user && user.rol === "ADMIN";
    // Función para filtrar los productos en base al término de búsqueda
    const handleSearchChange = (searchTerm) => {
      setSearchTerm(searchTerm);
    };
  
    useEffect(() => {
      fetch("http://localhost:3000/detailProduct")
        .then(response => response.json())
        .then(data => setProducts(data))
        .catch(error => console.log('Error al obtener los productos:', error));
    }, []);
  
    return (
      <>
        <Header onSearchChange={handleSearchChange} />
        <main>
          <Banner />
          {isAdmin ? (
                            <div className='addBtn'>
                              <button className="boton" id="addBtn">
                                  <NavLink id="boton" to='/AddProduct'>Agregar Producto</NavLink>
                              </button>
                            </div>
                        ) : (
                          <></>
                        )}
          <section className="homeIndex">
            <Product products={products} searchTerm={searchTerm} /> {/* Pasamos searchTerm como prop */}
          </section>
        </main>
        <Footer />
      </>
    );
  };
  
  export default Home;
