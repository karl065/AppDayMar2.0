import analizarEsquemaDelete from '../../helpers/analizadorSchemas/analizadorSchemasDelete.js';
import deleteGeneral from '../../helpers/organizadoresGenerales/deleteGeneral.js';
import Roles from '../../models/Roles.js';

const deleteControllerRoles = async (idRolEliminar, idRolAsignar) => {
	try {
		const configDelete = analizarEsquemaDelete(Roles);
		if (!idRolEliminar) throw new Error('ID de rol a eliminar requerido');

		// 1. Buscamos el rol y poblamos los usuarios (hijos) para tener la referencia
		const rolEliminado =
			await Roles.findById(idRolEliminar).populate('usuarios');
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
