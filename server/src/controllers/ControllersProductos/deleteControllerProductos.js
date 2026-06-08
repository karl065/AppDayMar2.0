const {Productos} = require('../../DB.js');

const deleteProducto = async (id) => {
  try {
    const producto = await Productos.findByPk(id);
    await producto.destroy({where: {id}});
    return producto;
  } catch (error) {
    return error.message;
  }
};

module.exports = {deleteProducto};
