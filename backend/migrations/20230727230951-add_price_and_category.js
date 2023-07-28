'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('prods', 'price', {
      type: Sequelize.DECIMAL(10, 2), // Cambia el tipo de dato según tus necesidades
      allowNull: false,
      defaultValue: 0.00, // Cambia el valor predeterminado según tus necesidades
    });

    await queryInterface.addColumn('prods', 'category', {
      type: Sequelize.STRING, // Cambia el tipo de dato según tus necesidades
      allowNull: true, // O false si la categoría no puede ser nula
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('prods', 'price');
    await queryInterface.removeColumn('prods', 'category');
  }
};