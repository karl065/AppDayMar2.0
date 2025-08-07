import RolesModel from '../../models/Roles.js';
import UsuariosModel from '../../models/Usuarios.js';
import bcryptjs from 'bcryptjs';

const putControllerUsuarios = async (dataUpdate, id) => {
	try {
		const usuarioActual = await UsuariosModel.findById(id);
		if (dataUpdate.password) {
			const passwordHash = await bcryptjs.hash(dataUpdate.password, 10);
			dataUpdate.password = passwordHash;
		}

		if (dataUpdate.rol) {
			await RolesModel.findByIdAndUpdate(usuarioActual.rol, {
				$pull: { usuarios: usuarioActual._id },
			});
			await RolesModel.findByIdAndUpdate(usuarioActual.rol, {
				$pull: { usuarios: usuarioActual._id },
			});
			await RolesModel.findByIdAndUpdate(dataUpdate.rol, {
				$addToSet: { usuarios: usuarioActual._id },
			});
		}

		await UsuariosModel.findByIdAndUpdate(id, dataUpdate);
		const usuarioActualizado = await UsuariosModel.findById(id);
		return usuarioActualizado;
	} catch (error) {
		return error;
	}
};

export default putControllerUsuarios;
