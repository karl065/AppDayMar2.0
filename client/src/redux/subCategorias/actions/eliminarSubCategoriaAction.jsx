import { eliminarSubCategoria } from '../slices/subCategoriasSlice.jsx';
import eliminarSubCategoriasServices from './../../../services/subCategorias/eliminarSubCategoriasServices.jsx';

export const eliminarSubCategoriaAction = async (dispatch, id, idNueva) => {
	try {
		const { _id } = await eliminarSubCategoriasServices(id, idNueva);
		dispatch(eliminarSubCategoria(_id));
	} catch (error) {
		console.log(error);
	}
};
