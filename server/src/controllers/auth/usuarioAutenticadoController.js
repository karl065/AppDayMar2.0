import Usuarios from '../../models/Usuarios.js';
import sanitizarUsuario from './../../helpers/sanitizadores/sanitizadorUsuarios.js';

const usuarioAutenticado = async (id) => {
	try {
		const usuario = await Usuarios.findById(id)
			.populate('rol')
			.select('-password');

		if (!usuario) throw new Error('Usuario no encontrado');

		if (!usuario.status) throw new Error('Vuelva a iniciar sesion');

		const usuarioPlano = usuario.toObject();

		const usuarioSeguro = sanitizarUsuario(usuarioPlano);

		return usuarioSeguro;
	} catch (error) {
		throw new Error(error.message);
	}
};

export default usuarioAutenticado;
