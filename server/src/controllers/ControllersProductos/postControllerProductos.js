import ProductosModel from '../../models/Productos.js';
import putControllerCategorias from './../ControllersCategorias/PutControllerCategory.js';

const postControllerProductos = async (producto) => {
	try {
		const productoNuevo = await ProductosModel.create(producto);

		const productoCompleto = await ProductosModel.findById(
			productoNuevo._id,
		).populate('categoria');

		await putControllerCategorias(productoNuevo, producto.categoria);

		return productoCompleto;
	} catch (error) {
		return error;
	}
};

export default postControllerProductos;
