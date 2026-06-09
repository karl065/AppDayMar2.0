import analizarEsquemaDelete from '../../helpers/analizadorSchemas/analizadorSchemasDelete.js';
import deleteGeneral from '../../helpers/organizadoresGenerales/deleteGeneral.js';
import TiposModel from '../../models/Tipos.js';

const deleteControllerTipo = async (idTipoEliminar, idTipoAsignar = null) => {
	try {
		const configDelete = analizarEsquemaDelete(TiposModel);
		if (!idTipoEliminar) throw new Error('ID a eliminar requerido');

		// Buscamos y poblamos los arrays que el analizador detectó
		const query = TiposModel.findById(idTipoEliminar);
		configDelete.arraysAMover.forEach((arr) => query.populate(arr));

		const tipo = await query.exec();
		if (!tipo) throw new Error('El tipo no existe');

		// Si el tipo tiene categorías o usuarios, forzamos la reasignación
		if (
			(tipo.categorias.length > 0 || tipo.usuarios.length > 0) &&
			!idTipoAsignar
		) {
			throw new Error(
				'🚨 Este tipo tiene relaciones activas. Debes asignar un nuevo tipo antes de eliminarlo 🚨',
			);
		}

		const resultado = await deleteGeneral(tipo, idTipoAsignar, configDelete);

		return resultado;
	} catch (error) {
		throw error;
	}
};

export default deleteControllerTipo;
