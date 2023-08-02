import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';


const AddProduct = () => {

  const location = useLocation();
  const prod = location.state?.product;
  const isEditing = !!prod;
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    alt: '',
    img: '',
    price: '', 
    category: '', 
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // Validación de campos requeridos
    if (!formData.title || !formData.description || !formData.alt || !formData.img) {
      console.log('Por favor complete todos los campos.');
      return;
    }

    const form = new FormData();
    form.append('title', formData.title);
    form.append('description', formData.description);
    form.append('alt', formData.alt);
    form.append('img', formData.img);
    form.append('price', formData.price);
    form.append('category', formData.category);

    try {
      console.log(formData)

      const options = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      };
  
      if (prod) {
        const response = await fetch(`http://localhost:3000/editProduct/${prod.id}`, options);
        if (response.ok) {
          navigate(`/products/${prod.id}`);
        } else {
          console.log('Error al editar el producto en el servidor.');
        }
      } else {
        // Si el producto no existe, estamos creando un nuevo producto, entonces hacemos la solicitud al controlador addProduct
        const response = await fetch('http://localhost:3000/addProduct', options);
        if (response.ok) {
          navigate(`/`);
        } else {
          console.log('Error al editar el producto en el servidor.');
        }
        // Resto del código para manejar la respuesta...
      }
    } catch (error) {
      console.log('Error al conectarse con el servidor:', error);
    }
  };

  useEffect(() => {
    // Si hay un producto existente (estamos en modo edición), inicializa el estado con los valores del producto
    if (prod) {
      setFormData({
        title: prod.title || '',
        description: prod.description || '',
        alt: prod.alt || '',
        img: prod.img || '',
        price: prod.price || '',
        category: prod.category || '',
      });
    } else {
      // Si no hay un producto existente (estamos en modo creación), inicializa el estado con campos vacíos
      setFormData({
        title: '',
        description: '',
        alt: '',
        img: '',
        price: '',
        category: '',
      });
    }
  }, [prod]);

  return (
    <>
      <form className='addProdForm' onSubmit={handleFormSubmit}>

      <h2>{isEditing ? 'Editar producto' : 'Nuevo Producto'}</h2>

        <div>
          <label htmlFor="title">Título:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="description">Descripción:</label>
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="alt">Alt:</label>
          <input
            type="text"
            id="alt"
            name="alt"
            value={formData.alt}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="img">Imagen:</label>
          <input
            type="text"
            id="img"
            name="img"
            value={formData.img}
            onChange={handleChange}
          />
        </div>
        <div>
        <label htmlFor="price">Precio:</label>
        <input
          type="text"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleChange}
        />
      </div>
      
      <div>
        <label htmlFor="category">Categoría:</label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="">Seleccione una categoría</option>
          <option value="remeras">Remeras</option>
          <option value="pantalones">Pantalones</option>
          <option value="accesorios">Accesorios</option>
          <option value="otros">Otros</option>
        </select>
      </div>
        <button type="submit">Guardar</button>
      </form>
    </>
  );
};

export default AddProduct;
