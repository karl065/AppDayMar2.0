import actualizarTiposServices from '../../../services/tipos/actualizarTiposServices.jsx';
import { actualizarTipo } from '../slices/tiposSlices.jsx';

export const actualizarTiposAction = async (dispatch, id, dataUpdate) => {
	try {
		const data = await actualizarTiposServices(id, dataUpdate);
		dispatch(actualizarTipo(data));
	} catch (error) {
		console.log(error);
	}
};
