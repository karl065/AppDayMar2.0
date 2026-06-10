import actualizarRolesServices from '../../../services/roles/actualizarRolesServices.jsx';
import { actualizarRole } from '../slices/rolesSlice.jsx';

export const actualizarRolesAction = async (dispatch, id, dataUpdate) => {
	try {
		const data = await actualizarRolesServices(id, dataUpdate);
		dispatch(actualizarRole(data));
	} catch (error) {
		console.log(error);
	}
};
