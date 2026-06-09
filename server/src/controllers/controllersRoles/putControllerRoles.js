import RolesModel from '../../models/Roles.js';
import analizarEsquemaPut from '../../helpers/analizarEsquemaPut.js';
import putGeneral from '../../helpers/putGeneral.js';
import sanitizarRol from '../../sanitizadores/sanitizarRoles.js';

const configPut = analizarEsquemaPut(RolesModel);

const putControllerRoles = async (roleUpdate, idRol) => {
	try {
		if (!idRol) throw new Error('ID de rol requerido');

		// putGeneral detectará si 'roleUpdate' tiene un cambio de 'usuarios'
		// y ejecutará la sincronización bidireccional automáticamente
		const rolActualizado = await putGeneral(
			RolesModel,
			idRol,
			roleUpdate,
			configPut,
		);

		// Devolvemos el objeto sanitizado
		return sanitizarRol(rolActualizado);
	} catch (error) {
		return { error: error.message };
	}
};

export default putControllerRoles;
