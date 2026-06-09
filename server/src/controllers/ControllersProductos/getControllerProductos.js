import ProductosModel from '../../models/Productos.js';
import filtroAvanzado from './../../helpers/filtros/filtroAvanzado.js';

const getControllerProductos = async (query) => {
	try {
		if (query.obtenerEstados) {
			const estadosEnum = await ProductosModel.schema.path('estado').enumValues;
			return estadosEnum;
		}

		const filtro = filtroAvanzado(query, ProductosModel.schema);

		const productos = await ProductosModel.find(
			Object.keys(filtro).length > 0 ? filtro : {},
		)
			.populate('categoria')
			.populate('usuario');

		return productos;
	} catch (error) {
		return error;
	}
};

export default getControllerProductos;
