import Usuarios from './../../models/Usuarios.js';
import sanitizarUsuario from './../../helpers/sanitizadores/sanitizadorUsuarios.js';
import filtroAvanzado from '../../helpers/filtros/filtroAvanzado.js';

const getControllerUsuarios = async (filtros) => {
	try {
		// Filtro avanzado
		const filtro = filtroAvanzado(filtros, Usuarios.schema);

		const usuarios = await Usuarios.find(
			Object.keys(filtro).length > 0 ? filtro : {},
		)
			.populate('rol')
			.select('-password');

		const usuariosSanitizados = usuarios.map((u) => sanitizarUsuario(u));

		return usuariosSanitizados;
	} catch (error) {
		throw error;
	}
};

export default getControllerUsuarios;
