import ProductosModel from '../../models/Productos.js';
import analizarEsquemaDelete from '../../helpers/analizarEsquemaDelete.js';
import deleteGeneral from '../../helpers/deleteGeneral.js';

// Generamos la configuración una sola vez
const configDelete = analizarEsquemaDelete(ProductosModel);

const deleteControllerProducto = async (idProducto, idNuevoProducto = null) => {
	try {
		if (!idProducto) throw new Error('El ID a eliminar es requerido');

		// Preparamos la consulta y poblamos automáticamente lo que detecte el analizador
		const query = ProductosModel.findById(idProducto);
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
		return { error: error.message };
	}
};

export default deleteControllerProducto;
