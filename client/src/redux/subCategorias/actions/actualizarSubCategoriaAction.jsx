import { actualizarSubCategoria } from '../slices/subCategoriasSlice.jsx';
import actualizarSubCategoriasServices from './../../../services/subCategorias/actualizarSubCategoriasServices.jsx';

export const actualizarSubCategoriaAction = async (
	dispatch,
	id,
	subCategoria,
) => {
	try {
		const data = await actualizarSubCategoriasServices(id, subCategoria);

		dispatch(actualizarSubCategoria(data));
	} catch (error) {
		console.log(error);
	}
};
