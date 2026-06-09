import TiposModel from '../../models/Tipos.js';
import filtroAvanzado from './../../helpers/filtros/filtroAvanzado.js';

const getControllerTipos = async (query) => {
	try {
		const filtro = filtroAvanzado(query, TiposModel.schema);

		// Buscamos, poblamos y aplicamos filtro
		const tipos = await TiposModel.find(filtro)
			.populate('categorias')
			.populate('usuarios');

		return tipos;
	} catch (error) {
		throw error;
	}
};

export default getControllerTipos;
