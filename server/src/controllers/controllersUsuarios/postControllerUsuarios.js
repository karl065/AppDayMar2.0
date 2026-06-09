import bcryptjs from 'bcryptjs';
import Usuarios from './../../models/Usuarios';
import Roles from './../../models/Roles';

const postControllerUsuario = async (usuario) => {
	try {
		const { email, password, nombre } = usuario;

		if (!nombre || !email || !password) {
			throw new Error('Debe llenar todos los campos');
		}

		const usuarioExistente = await Usuarios.findOne({ email });

		if (!usuarioExistente) {
			const passwordHash = await bcryptjs.hash(password, 10);
			usuario.password = passwordHash;

			const nuevoUsuario = new Usuarios(usuario);
			const usuarioGuardado = await nuevoUsuario.save();

			// Agregar este usuario al rol correspondiente
			await Roles.findByIdAndUpdate(
				usuario.rol,
				{ $push: { usuarios: usuarioGuardado._id } },
				{ new: true },
			);

			return usuarioGuardado;
		} else {
			throw new Error('El usuario ya existe');
		}
	} catch (error) {
		throw error;
	}
};

export default postControllerUsuario;
