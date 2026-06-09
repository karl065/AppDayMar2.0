import Categorias from '../../models/Categorias.js';
import filtroAvanzado from './../../helpers/filtros/filtroAvanzado.js';

const getControllerCategorias = async (query) => {
	try {
		if (query.obtenerTipos) {
			const tiposEnum = await Productos.schema.path('tipo').enumValues;
			return tiposEnum;
		}

		const filtro = filtroAvanzado(query, Categorias.schema);

		const categorias = await Categorias.find(
			Object.keys(filtro).length > 0 ? filtro : {},
		).populate('productos');

		return categorias;
	} catch (error) {
		throw error;
	}
};

export default getControllerCategorias;
