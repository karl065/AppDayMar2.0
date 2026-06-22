import Roles from '../../models/Roles.js';
import analizarEsquemaPut from '../../helpers/analizadorSchemas/analizadorSchemasPut.js';
import sanitizarRol from './../../helpers/sanitizadores/sanitizadorRoles.js';
import putGeneral from './../../helpers/organizadoresGenerales/putGeneral.js';

const putControllerRoles = async (roleUpdate, idRol) => {
	try {
		const configPut = analizarEsquemaPut(Roles);
		if (!idRol) throw new Error('ID de rol requerido');

		// putGeneral detectará si 'roleUpdate' tiene un cambio de 'usuarios'
		// y ejecutará la sincronización bidireccional automáticamente
		const rolActualizado = await putGeneral(
			Roles,
			idRol,
			roleUpdate,
			configPut,
		);

		// Devolvemos el objeto sanitizado
		return sanitizarRol(rolActualizado);
	} catch (error) {
		throw error;
	}
};

export default putControllerRoles;
