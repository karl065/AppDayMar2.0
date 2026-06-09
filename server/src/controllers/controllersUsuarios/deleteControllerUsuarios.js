import Usuarios from '../../models/Usuarios.js';
import analizarEsquemaDelete from './../../helpers/analizadorSchemas/analizadorSchemasDelete.js';
import deleteGeneral from './../../helpers/organizadoresGenerales/deleteGeneral.js';

const deleteControllerUsuarios = async (
	idUsuarioEliminar,
	idUsuarioAsignar,
) => {
	try {
		// 1. Analizamos el esquema del modelo de usuarios
		const configDelete = analizarEsquemaDelete(Usuarios);
		if (!idUsuarioEliminar)
			throw new Error('ID de usuario a eliminar requerido');

		// 2. Buscamos el usuario y poblamos sus posibles dependencias (productos, etc.)
		const usuarioEliminado = await Usuarios.findById(
			idUsuarioEliminar,
		).populate(configDelete.camposRelacionados);

		if (!usuarioEliminado) throw new Error('El usuario no existe');

		// 3. Regla de negocio: Si tiene registros asociados (productos, etc.),
		// debe haber un usuario asignado para transferir la propiedad.
		const tieneDependencias = configDelete.camposRelacionados.some(
			(campo) => usuarioEliminado[campo] && usuarioEliminado[campo].length > 0,
		);

		if (tieneDependencias && !idUsuarioAsignar) {
			throw new Error(
				'🚨 Este usuario tiene productos o categorías asociadas. Debe asignar un usuario de reemplazo antes de eliminar 🚨',
			);
		}

		// 4. Ejecutamos la automatización
		// deleteGeneral transferirá las dependencias y borrará el usuario
		const resultado = await deleteGeneral(
			usuarioEliminado,
			idUsuarioAsignar,
			configDelete,
		);

		return resultado;
	} catch (error) {
		throw error;
	}
};

export default deleteControllerUsuarios;
