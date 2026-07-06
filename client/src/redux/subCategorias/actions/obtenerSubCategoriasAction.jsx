import { cargarSubCategorias } from '../slices/subCategoriasSlice.jsx';
import obtenerSubCategoriasServices from './../../../services/subCategorias/obtenerSubCategoriasServices.jsx';

export const obtenerSubCategoriasAction = async (dispatch) => {
	try {
		const data = await obtenerSubCategoriasServices();

		dispatch(cargarSubCategorias(data));
	} catch (error) {
		console.log(error);
	}
};
