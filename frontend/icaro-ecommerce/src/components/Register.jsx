import React from 'react';
import Header from './header';
import Footer from './Footer';

const Register = () => {
  return (
    <>
      <Header />
      <form action="addUser" method="post">
        <div className="padre1">
          <div className="hijo1">
            <label id="regist-label" htmlFor="name">Nombre</label>
            <input type="text" name="name" id="name" placeholder="Nombre completo" required />
          </div>
          <div className="hijo1-2">
            <label id="regist-label" htmlFor="username">Usuario</label>
            <input type="text" name="username" id="username" placeholder="Ingresar usuario" required />
          </div>
        </div>

        {/* Resto del código omitido para mayor claridad */}

        <div className="padre4">
          <div className="hijo4">
            <label id="birthday-label" htmlFor="birthdate">Fecha de Nacimiento</label>
            <input type="date" name="birthdate" id="birthdate" placeholder="Fecha de Nacimiento" required />
          </div>
          <div className="hijo4-2">
            <label htmlFor="selected">País</label>
            <select name="country" id="country" defaultValue="">
              <option value="" disabled>Seleccionar país</option>
              <option value="arg">Argentina</option>
              <option value="br">Brasil</option>
              <option value="ur">Uruguay</option>
            </select>
          </div>
        </div>
        
            <div className="padre5">
                <label htmlFor="profile-picture">Foto de perfil</label>
                <input type="image" name="profile-picture" id="profile-picture" placeholder="foto de perfil"/>
            </div>
        
            <div className="padre6">
                <label htmlFor="checkbox">Terminos y Condiciones</label>
                <input type="checkbox" name="terms-cond" id="terms-cond" required/>
            </div>
        
                <button type="submit" name="register" id="register">Registrarme</button>
            
            </form>
      <Footer/>
    </>
  );
};

export default Register;
