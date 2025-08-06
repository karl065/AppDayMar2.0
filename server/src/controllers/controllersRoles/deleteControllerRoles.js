import RolesModel from '../../models/Roles.js';
import UsuariosModel from '../../models/Usuarios.js';

const deleteControllerRoles = async (idRolEliminar, idRolAsignar) => {
	try {
		const rolEliminado = await RolesModel.findById(idRolEliminar);

		if (rolEliminado.usuarios.length === 0) {
			await RolesModel.findByIdAndDelete(idRolEliminar);
			return rolEliminado;
		}

		if (!idRolAsignar) {
			throw new Error(
				'🚨 Debe asignar un rol antes de eliminar uno existente 🚨'
			);
		}

		rolEliminado.usuarios.map(async (usuario) => {
			await UsuariosModel.findByIdAndUpdate(usuario._id, { rol: idRolAsignar });

			await RolesModel.findByIdAndUpdate(
				idRolAsignar,
				{ $push: { usuarios: usuario._id } },
				{ new: true }
			);
		});

		await RolesModel.findByIdAndDelete(idRolEliminar);

		const rolAsignado = await RolesModel.findById(idRolAsignar);

		return rolEliminado, rolAsignado;
	} catch (error) {
		throw error;
	}
};

export default deleteControllerRoles;
