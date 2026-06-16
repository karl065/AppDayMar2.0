import eliminarTiposServices from '../../../services/tipos/eliminarTiposServices.jsx';
import { eliminarTipo } from '../slices/tiposSlices.jsx';

export const eliminarTiposAction = async (dispatch, id, idAsignar) => {
	try {
		const { _id } = await eliminarTiposServices(id, idAsignar);
		dispatch(eliminarTipo(_id));
	} catch (error) {
		console.log(error);
	}
};
