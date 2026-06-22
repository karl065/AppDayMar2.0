import analizarEsquemaPut from '../../helpers/analizadorSchemas/analizadorSchemasPut.js';
import putGeneral from '../../helpers/organizadoresGenerales/putGeneral.js';
import Productos from '../../models/Productos.js';

const putControllerProductos = async (updateData, idProducto) => {
	try {
		// Analizamos el esquema una sola vez
		const configPut = analizarEsquemaPut(Productos);
		if (!idProducto) throw new Error('El ID del producto es requerido');

		// El helper procesa datos planos, inyecciones de arrays y cambios de padre
		const productoActualizado = await putGeneral(
			Productos,
			idProducto,
			updateData,
			configPut,
		);

		// Poblamos las referencias para devolver el objeto completo (equivalente al 'include' de Sequelize)
		return await Productos.findById(productoActualizado._id)
			.populate('categoria')
			.populate('usuario');
	} catch (error) {
		throw error;
	}
};

export default putControllerProductos;
