import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import useStore from '../stores/store';
import { useNavigate } from 'react-router-dom'; 

const Login = () => {
  const setUser = useStore((state) => state.setUser);
  const [formData, setFormData] = useState({
    email: '', 
    password: '',
  });
  const [error, setError] = useState(null); // Estado para manejar el mensaje de error
  const navigate = useNavigate(); 

  // useEffect(() => {
  //   if(!user) return
  //   navigate('/');
  // },[user]);
  
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const options = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    };
    
    fetch('http://localhost:3000/login1', options)
      .then(response =>{if (response.ok) {
        return response.json();
      } else {
        setError('Correo o Contraseña incorrectos'); // Establece el mensaje de error en caso de inicio de sesión fallido
        throw new Error('Error en la solicitud');
      }
    })
    .then(data => {
      setUser(data);
      navigate('/');
    })
    .catch(error => {
      console.log('Error al realizar la solicitud:', error);
    });
};

  return (
    <>
      <Header />
      <form className="login" onSubmit={handleSubmit}>
        <img className="login-img" src="/imgs/logo.png" alt="logo" />
        <div className="padre">
          {error && <p style={{ color: 'red' }}>{error}</p>} {/* Muestra el mensaje de error si existe */}
          <div className="hijo">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email" // Cambiar el atributo 'name' para que coincida con el estado 'formData'
              id="email"
              placeholder="Correo electrónico"
              required
              onChange={handleChange}
            />
          </div>
          <div className="hijo-2">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Contraseña"
              required
              onChange={handleChange}
            />
          </div>
        </div>
        <input id="login" type="submit" value="Ingresar" />
        <div className="extras">
          <a href="/register"><p>Registrarse</p></a>
          <a href=""><p>Olvidé mi Contraseña</p></a>
        </div>
      </form>
      <Footer />
    </>
  );
};

export default Login;
