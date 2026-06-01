import RolesModel from '../../models/Roles.js';
import satinizarRol from '../../helpers/sanitizadores/satinizadorRoles.js';

const getControllerRoles = async () => {
	try {
		const roles = await RolesModel.find().populate('usuarios');

		const rolesSatinizados = roles.map((role) => satinizarRol(role));

		return rolesSatinizados;
	} catch (error) {
		return error;
	}
};

export default getControllerRoles;
