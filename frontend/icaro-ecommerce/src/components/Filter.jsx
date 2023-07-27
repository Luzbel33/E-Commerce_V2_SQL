import React, { useState, useEffect } from 'react';

const Filter = ({ onSearchChange }) => {
  const [buscador, setBuscador] = useState("");

  const nameFilter = (e) => {
    const searchTerm = e.target.value;
    // console.log('Término de búsqueda:', searchTerm);
    setBuscador(searchTerm);
    onSearchChange(searchTerm); // Envía el término de búsqueda a la función que recibe Home
  };

  return (
    <>
      <div className="filtro">
        <input
          type="text"
          placeholder="Buscar"
          value={buscador}
          onChange={nameFilter}
        />
      </div>
    </>
  );
};

export default Filter;