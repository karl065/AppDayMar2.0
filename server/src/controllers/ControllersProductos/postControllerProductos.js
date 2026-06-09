import sanitizadorProductos from '../../helpers/sanitizadores/sanitizadorProductos.js';
import ProductosModel from '../../models/Productos.js';
import putControllerCategorias from '../ControllersCategorias/putControllerCategorias.js';

const postControllerProductos = async (producto) => {
	try {
		// 1. Crear el producto en la base de datos
		const productoNuevo = await ProductosModel.create(producto);

		// 2. Asociar el producto a su categoría padre
		// Le pasamos la estructura exacta para que el putGeneral de categorías lo inyecte
		await putControllerCategorias(
			{ productos: productoNuevo._id },
			producto.categoria,
		);

		// 3. Devolver el producto con su información poblada
		const productoCompleto = await ProductosModel.findById(productoNuevo._id)
			.populate('categoria')
			.populate('usuario'); // Es buena práctica poblar también al creador

		const productoSanitizado = sanitizadorProductos(productoCompleto);

		return productoSanitizado;
	} catch (error) {
		return { error: error.message };
	}
};

export default postControllerProductos;
