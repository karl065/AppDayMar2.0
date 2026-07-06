import { agregarSubCategoria } from '../slices/subCategoriasSlice.jsx';
import crearSubCategoriasServices from './../../../services/subCategorias/crearSubCategoriasServices.jsx';

export const crearSubCategoriaAction = async (dispatch, subcategoria) => {
	try {
		const data = await crearSubCategoriasServices(subcategoria);
		dispatch(agregarSubCategoria(data));
	} catch (error) {
		console.log(error);
	}
};
