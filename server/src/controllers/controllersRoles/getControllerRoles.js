import Roles from '../../models/Roles.js';
import sanitizarRol from '../../helpers/sanitizadores/sanitizadorRoles.js';

const getControllerRoles = async () => {
	try {
		const roles = await Roles.find().populate('usuarios');

		const rolesSatinizados = sanitizarRol(rolActualizado);

		return rolesSatinizados;
	} catch (error) {
		throw error;
	}
};

export default getControllerRoles;
