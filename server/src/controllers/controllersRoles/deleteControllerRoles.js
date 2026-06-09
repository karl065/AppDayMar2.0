import RolesModel from '../../models/Roles.js';
import analizarEsquemaDelete from '../../helpers/analizarEsquemaDelete.js';
import deleteGeneral from '../../helpers/deleteGeneral.js';

const configDelete = analizarEsquemaDelete(RolesModel);

const deleteControllerRoles = async (idRolEliminar, idRolAsignar) => {
	try {
		if (!idRolEliminar) throw new Error('ID de rol a eliminar requerido');

		// 1. Buscamos el rol y poblamos los usuarios (hijos) para tener la referencia
		const rolEliminado =
			await RolesModel.findById(idRolEliminar).populate('usuarios');
		if (!rolEliminado) throw new Error('El rol no existe');

		// 2. Regla de negocio: Si tiene usuarios, debe haber un rol asignado
		if (rolEliminado.usuarios.length > 0 && !idRolAsignar) {
			throw new Error(
				'🚨 Debe asignar un rol antes de eliminar uno existente 🚨',
			);
		}

		// 3. Ejecutamos la automatización
		// deleteGeneral moverá los 'usuarios' (hijos) al idRolAsignar y limpiará todo
		const resultado = await deleteGeneral(
			rolEliminado,
			idRolAsignar,
			configDelete,
		);

		return resultado;
	} catch (error) {
		throw error;
	}
};

export default deleteControllerRoles;
