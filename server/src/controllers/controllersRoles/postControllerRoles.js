import sanitizarRol from '../../helpers/sanitizadores/sanitizadorRoles.js';
import Roles from '../../models/Roles.js';

const postControllerRoles = async (rol) => {
	try {
		const rolNuevo = await Roles.create(rol);
		return sanitizarRol(rolNuevo);
	} catch (error) {
		throw error;
	}
};

export default postControllerRoles;
