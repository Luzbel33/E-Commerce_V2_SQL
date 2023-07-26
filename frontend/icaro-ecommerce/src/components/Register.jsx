import React, { useState } from 'react';
import Header from './header';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    birthdate: '',
    country: '',
    phone: ''
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  console.log(formData);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }
    
    const options = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    };

    fetch('http://localhost:3000/addUser', options)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        navigate('/login');
      })
      .catch(error => {
        console.log('Error al realizar la solicitud:', error);
      });
  };


  return (
    <>
    <Header/>
          <form onSubmit={handleSubmit}>
          <div className="padre1">
          <div className="hijo1">
            <label htmlFor="name">Nombre</label>
            <input type="text" name="name" id="name" placeholder="Nombre completo" required onChange={handleChange} />
          </div>
          <div className="hijo1-2">
            <label htmlFor="username">Usuario</label>
            <input type="text" name="username" id="username" placeholder="Ingresar usuario" required onChange={handleChange} />
          </div>
        </div>

        <div className="padre2">
            <div className="hijo2">
                <label id="regist-label" htmlFor="password">Contraseña</label>
                <input type="password" name="password" id="password" placeholder="Ingresar contraseña" required onChange={handleChange}/>
            </div>
            <div className="hijo2-2">
                <label id="regist-label"  htmlFor="password" >Confirmar contraseña</label>
                <input type="password" name="confirmPassword" id="confirmPassword" placeholder="Confirmar contraseña" required onChange={handleChange}/>
            </div>
        </div>

        <div className="padre3">
            <div className="hijo3">
              <label id="regist-label" htmlFor="email">Email</label>
              <input type="email" name="email" id="email" placeholder="Ingresar e-mail" required onChange={handleChange}/>
            </div>
            <div className="hijo3-2">
              <label id="regist-label" htmlFor="phone">Teléfono</label>
              <input type="text" name="phone" id="phone" placeholder="Ingresar teléfono" required onChange={handleChange}/>
            </div>
        </div>

        <div className="padre4">
          <div className="hijo4">
            <label id="birthday-label" htmlFor="birthdate">Fecha de Nacimiento</label>
            <input type="date" name="birthdate" id="birthdate" placeholder="Fecha de Nacimiento" onChange={handleChange} required />
          </div>
          <div className="hijo4-2">
            <label htmlFor="selected">País</label>
            <select name="country" id="country" defaultValue="" onChange={handleChange}>
              <option value="" disabled>Seleccionar país</option>
              <option value="arg">Argentina</option>
              <option value="br">Brasil</option>
              <option value="ur">Uruguay</option>
            </select>
          </div>
        </div>
        
            <div className="padre6">
                <label htmlFor="checkbox">Terminos y Condiciones</label>
                <input type="checkbox" name="terms-cond" id="terms-cond" required onChange={handleChange}/>
            </div>
        
                <button type="submit" name="register" id="register">Registrarme</button>
            
            </form>
      <Footer/>
    </>
  );
};

export default Register;
