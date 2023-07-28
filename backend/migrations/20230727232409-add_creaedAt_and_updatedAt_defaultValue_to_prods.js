'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('prods', 'createdAt', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    });

    await queryInterface.changeColumn('prods', 'updatedAt', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Sequelize no permite revertir cambios en columnas para valores por defecto.
    // En su lugar, puedes eliminar esta migración y generar una nueva con los valores por defecto anteriores.
    // Sin embargo, ten en cuenta que esto eliminaría cualquier cambio posterior en las columnas.
    // Si eso no es un problema, simplemente elimina la columna 'createdAt' y 'updatedAt' de esta migración.
  }
};
