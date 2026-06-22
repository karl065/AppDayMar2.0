import actualizarRolesServices from '../../../services/roles/actualizarRolesServices.jsx';
import { actualizarRol } from '../slices/rolesSlice.jsx';

export const actualizarRolesAction = async (dispatch, id, dataUpdate) => {
	try {
		const data = await actualizarRolesServices(id, dataUpdate);
		dispatch(actualizarRol(data));
	} catch (error) {
		console.log(error);
	}
};
