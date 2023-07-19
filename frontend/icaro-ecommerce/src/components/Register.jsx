import Header from './header';
import Footer from './Footer';

const Register = () => {
  return (
    <>
      <Header />
      <form className="login" action="login" method="post">
        <img className="login-img" src="/imgs/logo.png" alt="logo" />
        <div className="padre">
          <div className="hijo">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" placeholder="Correo electrónico" required />
          </div>
          <div className="hijo-2">
            <label htmlFor="password">Contraseña</label>
            <input type="password" name="password" id="password" placeholder="Contraseña" required />
          </div>
        </div>
        <input id="login" type="submit" value="Ingresar" />
        <div className="extras">
          <a id="extras" href="/register">
            <p>Registrarse</p>
          </a>
          <a id="extras" href="">
            <p>Olvidé mi Contraseña</p>
          </a>
        </div>
      </form>
      <Footer/>
    </>
  );
};

export default Register;
