import RolesModel from '../../models/Roles.js';

const postControllerRoles = async (rol) => {
	try {
		const rolNuevo = await RolesModel.create(rol);

		return rolNuevo;
	} catch (error) {
		return error;
	}
};

export default postControllerRoles;
