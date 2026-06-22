import Productos from '../../models/Productos.js';
import analizarEsquemaDelete from './../../helpers/analizadorSchemas/analizadorSchemasDelete.js';
import deleteGeneral from './../../helpers/organizadoresGenerales/deleteGeneral.js';

const deleteControllerProducto = async (idProducto, idNuevoProducto = null) => {
	try {
		// Generamos la configuración una sola vez
		const configDelete = analizarEsquemaDelete(Productos);
		if (!idProducto) throw new Error('El ID a eliminar es requerido');

		// Preparamos la consulta y poblamos automáticamente lo que detecte el analizador
		const query = Productos.findById(idProducto);
		configDelete.arraysAMover.forEach((arr) => query.populate(arr));

		const producto = await query.exec();
		if (!producto) throw new Error('El producto no existe');

		// Ejecutamos la eliminación automatizada
		const productoEliminado = await deleteGeneral(
			producto,
			idNuevoProducto,
			configDelete,
		);

		return productoEliminado;
	} catch (error) {
		throw error;
	}
};

export default deleteControllerProducto;
