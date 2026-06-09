import Productos from '../../models/Productos.js';
import filtroAvanzado from './../../helpers/filtros/filtroAvanzado.js';

const getControllerProductos = async (query) => {
	try {
		if (query.obtenerEstados) {
			const estadosEnum = await Productos.schema.path('estado').enumValues;
			return estadosEnum;
		}

		const filtro = filtroAvanzado(query, Productos.schema);

		const productos = await Productos.find(
			Object.keys(filtro).length > 0 ? filtro : {},
		)
			.populate('categoria')
			.populate('usuario');

		return productos;
	} catch (error) {
		throw error;
	}
};

export default getControllerProductos;
