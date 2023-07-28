const { prods } = require('../../models');

const getProdsFromDatabase = async () => {
    try {
      const prodsList = await prods.findAll();
      console.log(prodsList);
      return prodsList.map(prod => ({
        id: prod.id,
        title: prod.title,
        description: prod.description,
        alt: prod.alt,
        img: prod.img,
        price: prod.price,
        category: prod.category
      }));
    } catch (error) {
      console.error('Error al obtener los productos:', error);
      throw new Error('Error al obtener los productos desde la base de datos');
    }
  };

module.exports = { getProdsFromDatabase };