import bcryptjs from 'bcryptjs';
import UsuariosModel from './../../models/Usuarios';
import RolesModel from './../../models/Roles';

const postControllerUsuario = async (usuario, rolId) => {
	try {
		const { email, password } = usuario;

		const usuarioExistente = await UsuariosModel.findOne({ email });

		if (!usuarioExistente) {
			const passwordHash = await bcryptjs.hash(password, 10);
			usuario.password = passwordHash;

			// Asignar el rol al usuario
			usuario.rol = rolId;

			const nuevoUsuario = new UsuariosModel(usuario);
			const usuarioGuardado = await nuevoUsuario.save();

			// Agregar este usuario al rol correspondiente
			await RolesModel.findByIdAndUpdate(
				rolId,
				{ $push: { usuarios: usuarioGuardado._id } },
				{ new: true }
			);

			return usuarioGuardado;
		} else {
			throw new Error('El usuario ya existe');
		}
	} catch (error) {
		throw error.message;
	}
};

export default postControllerUsuario;
