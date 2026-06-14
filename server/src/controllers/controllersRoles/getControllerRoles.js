import Roles from '../../models/Roles.js';
import sanitizarRol from '../../helpers/sanitizadores/sanitizadorRoles.js';
import filtroAvanzado from '../../helpers/filtros/filtroAvanzado.js';

const getControllerRoles = async (filtros) => {
	try {
		// Filtro avanzado
		const filtro = filtroAvanzado(filtros, Roles.schema);

		const roles = await Roles.find(
			Object.keys(filtro).length > 0 ? filtro : {},
		).populate('usuarios');

		const rolesSanitizados = roles.map((r) => sanitizarRol(r));

		return rolesSanitizados;
	} catch (error) {
		console.log(error.message);
		throw error;
	}
};

export default getControllerRoles;
