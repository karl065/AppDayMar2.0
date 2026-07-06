import sanitizadorProductos from '../../helpers/sanitizadores/sanitizadorProductos.js';
import Productos from '../../models/Productos.js';
import putControllerSubCategorias from '../ControllersSubCategorias/PutControllerSubCategory.js';

const postControllerProductos = async (producto) => {
	try {
		// 1. Crear el producto en la base de datos
		const productoNuevo = await Productos.create(producto);

		// 2. Asociar el producto a su categoría padre
		// Le pasamos la estructura exacta para que el putGeneral de categorías lo inyecte
		await putControllerSubCategorias(
			{ productos: productoNuevo._id },
			producto.subCategoria,
		);

		// 3. Devolver el producto con su información poblada
		const productoCompleto = await Productos.findById(productoNuevo._id)
			.populate('subCategoria')
			.populate('usuario'); // Es buena práctica poblar también al creador

		const productoSanitizado = sanitizadorProductos(productoCompleto);

		return productoSanitizado;
	} catch (error) {
		throw error;
	}
};

export default postControllerProductos;
