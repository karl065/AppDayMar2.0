import SubCategorias from '../../models/SubCategorias.js';
import filtroAvanzado from '../../helpers/filtros/filtroAvanzado.js';

const getControllerSubCategorias = async (query) => {
	try {
		const filtro = filtroAvanzado(query, SubCategorias.schema);

		const subCategorias = await SubCategorias.find(
			Object.keys(filtro).length > 0 ? filtro : {},
		)
			.populate({
				path: 'categoria',
				populate: {
					path: 'tipo',
				},
			})
			.populate('productos');

		return subCategorias;
	} catch (error) {
		throw error;
	}
};

export default getControllerSubCategorias;
