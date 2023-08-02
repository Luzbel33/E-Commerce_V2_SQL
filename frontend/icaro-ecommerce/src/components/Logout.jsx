import React, { useState, useEffect } from 'react';
import { useUserStore } from '../stores/store';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const setUser = useUserStore((state) => state.setUser);
  const navigate = useNavigate();
  const [loggingOut, setLoggingOut] = useState(false);

  const logout = () => {
    // Lógica para limpiar el estado global del objeto user al hacer logout
    setUser(null);
    
    // Redirigir al usuario a la página principal (home)
    navigate('/');
  };

  useEffect(() => {
    if (loggingOut) {
      // Llamar a la función logout para limpiar el estado user y redirigir al usuario a la página principal
      logout();
    }
  }, [loggingOut]);

  if (!loggingOut) {
    setLoggingOut(true); // Iniciar el proceso de cierre de sesión cuando se monte el componente
  }

  return <div>Cerrando sesión...</div>;
}

export default Logout;
