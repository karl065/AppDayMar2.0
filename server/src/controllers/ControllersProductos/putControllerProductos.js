import ProductosModel from '../../models/Productos.js';
import analizarEsquemaPut from '../../helpers/analizarEsquemaPut.js';
import putGeneral from '../../helpers/putGeneral.js';

// Analizamos el esquema una sola vez
const configPut = analizarEsquemaPut(ProductosModel);

const putControllerProductos = async (updateData, idProducto) => {
	try {
		if (!idProducto) throw new Error('El ID del producto es requerido');

		// El helper procesa datos planos, inyecciones de arrays y cambios de padre
		const productoActualizado = await putGeneral(
			ProductosModel,
			idProducto,
			updateData,
			configPut,
		);

		// Poblamos las referencias para devolver el objeto completo (equivalente al 'include' de Sequelize)
		return await ProductosModel.findById(productoActualizado._id)
			.populate('categoria')
			.populate('usuario');
	} catch (error) {
		return { error: error.message };
	}
};

export default putControllerProductos;
