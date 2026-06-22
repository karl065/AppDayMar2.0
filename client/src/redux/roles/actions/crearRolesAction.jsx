import { agregarRol } from '../slices/rolesSlice.jsx';
import crearRolesServices from './../../../services/roles/crearRolesServices.jsx';

export const crearRolesAction = async (dispatch, role) => {
	try {
		const data = await crearRolesServices(role);
		dispatch(agregarRol(data));
	} catch (error) {
		console.log(error);
	}
};
