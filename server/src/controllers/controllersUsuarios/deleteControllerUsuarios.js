import RolesModel from '../../models/Roles.js';
import UsuariosModel from './../../models/Usuarios.js';

const deleteControllerUsuarios = async (idUsuario, idRol) => {
	try {
		if (idRol) {
			await RolesModel.findByIdAndUpdate(idRol, {
				$pull: { usuarios: idUsuario },
			});
		}

		const usuarioEliminado = await UsuariosModel.findByIdAndDelete(idUsuario);

		return usuarioEliminado;
	} catch (error) {
		return error;
	}
};

export default deleteControllerUsuarios;
