import RolesModel from '../../models/Roles.js';
import sanitizarRol from '../../helpers/sanitizadores/sanitizadorRoles.js';

const getControllerRoles = async () => {
	try {
		const roles = await RolesModel.find().populate('usuarios');

		const rolesSatinizados = sanitizarRol(rolActualizado);

		return rolesSatinizados;
	} catch (error) {
		return error;
	}
};

export default getControllerRoles;
