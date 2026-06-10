import eliminarRolesServices from '../../../services/roles/eliminarRolesServices.jsx';
import { eliminarRole } from '../slices/rolesSlice.jsx';

export const eliminarRolesAction = async (dispatch, id) => {
	try {
		const { _id } = await eliminarRolesServices(id);
		dispatch(eliminarRole(_id));
	} catch (error) {
		console.log(error);
	}
};
