const {Productos, Usuarios, Categorias} = require('../../DB.js');

const putProductos = async (updateData, idProducto) => {
  try {
    await Productos.update(updateData, {
      where: {idProducto},
    });
    return await Productos.findByPk(idProducto, {
      include: [
        {
          model: Categorias,
          as: 'categorias',
        },
        {
          model: Usuarios,
        },
      ],
    });
  } catch (error) {
    return error.message;
  }
};

module.exports = {putProductos};
