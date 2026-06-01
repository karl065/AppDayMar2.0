import sanitizarUsuario from './sanitizadorUsuarios.js';

const sanitizarRol = (role) => {
	return {
		_id: role._id,
		nombre: role.nombre,
		correo: role.correo,
		descripcion: role.descripcion,
		usuarios: role.usuarios
			? role.usuarios.map((d) => sanitizarUsuario(d))
			: [],
	};
};

export default sanitizarRol;
