import RolesModel from '../../models/Roles';

const getControllerRoles = async () => {
	try {
		const roles = await RolesModel.find().populate('usuarios');
		return roles;
	} catch (error) {
		return error;
	}
};

export default getControllerRoles;
