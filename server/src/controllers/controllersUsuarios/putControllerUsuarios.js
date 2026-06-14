import Roles from '../../models/Roles.js';
import Usuarios from '../../models/Usuarios.js';
import bcryptjs from 'bcryptjs';

const putControllerUsuarios = async (dataUpdate, id) => {
	try {
		const usuarioActual = await Usuarios.findById(id);
		if (dataUpdate.password) {
			const passwordHash = await bcryptjs.hash(dataUpdate.password, 10);
			dataUpdate.password = passwordHash;
		}

		if (dataUpdate.rol) {
			await Roles.findByIdAndUpdate(usuarioActual.rol, {
				$pull: { usuarios: usuarioActual._id },
			});
			await Roles.findByIdAndUpdate(dataUpdate.rol, {
				$addToSet: { usuarios: usuarioActual._id },
			});
		}

		await Usuarios.findByIdAndUpdate(id, dataUpdate);
		const usuarioActualizado = await Usuarios.findById(id).select('-password');
		return usuarioActualizado;
	} catch (error) {
		throw error;
	}
};

export default putControllerUsuarios;
