import RolesModel from '../../models/Roles.js';
import sanitizarRol from '../../sanitizadores/sanitizarRoles.js'; // Asumiendo que tienes este archivo

const postControllerRoles = async (rol) => {
	try {
		const rolNuevo = await RolesModel.create(rol);
		return sanitizarRol(rolNuevo);
	} catch (error) {
		return { error: error.message };
	}
};

export default postControllerRoles;
