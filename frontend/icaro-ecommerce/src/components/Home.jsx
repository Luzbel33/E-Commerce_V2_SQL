import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import Product from './Product';
import Banner from './Banner';


const Home = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [products, setProducts] = useState([]);
  
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
          <section className="homeIndex">
            <Product products={products} searchTerm={searchTerm} /> {/* Pasamos searchTerm como prop */}
          </section>
        </main>
        <Footer />
      </>
    );
  };
  
  export default Home;
