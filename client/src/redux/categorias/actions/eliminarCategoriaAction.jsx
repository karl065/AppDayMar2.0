import eliminarCategoriasServices from '../../../services/categorias/eliminarCategoriasServices.jsx';
import { eliminarCategoria } from '../slices/categoriasSlice.jsx';

export const eliminarCategoriaAction = async (dispatch, id, idNueva) => {
	try {
		const { _id } = await eliminarCategoriasServices(id, idNueva);
		dispatch(eliminarCategoria(_id));
	} catch (error) {
		console.log(error);
	}
};
