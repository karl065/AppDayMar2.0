const sanitizarUsuario = (usuario) => {
	return {
		_id: usuario._id,
		nombre: usuario.nombre,
		apellido: usuario.apellido,
		email: usuario.email,
		celular: usuario.celular,
		rol: usuario.rol,
	};
};

export default sanitizarUsuario;
