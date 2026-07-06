import Categorias from '../../models/Categorias.js';
import filtroAvanzado from './../../helpers/filtros/filtroAvanzado.js';

const getControllerCategorias = async (query) => {
	try {
		const filtro = filtroAvanzado(query, Categorias.schema);

		const categorias = await Categorias.find(
			Object.keys(filtro).length > 0 ? filtro : {},
		)
			.populate('subCategorias')
			.populate('tipo');

		return categorias;
	} catch (error) {
		throw error;
	}
};

export default getControllerCategorias;
