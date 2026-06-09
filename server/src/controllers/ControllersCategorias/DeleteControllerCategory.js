import Categorias from '../../models/Categorias.js';
import analizarEsquemaDelete from '../../helpers/analizadorSchemas/analizadorSchemasDelete.js';
import deleteGeneral from '../../helpers/organizadoresGenerales/deleteGeneral.js';

// Ahora solicitamos por obligación el ID de la nueva categoría
const deleteControllerCategory = async (idCategoria, idNuevaCategoria) => {
	try {
		// Generamos la configuración una sola vez al cargar el archivo
		const configRelaciones = analizarEsquemaDelete(Categorias);
		if (!idCategoria) throw new Error('El ID a eliminar es requerido');

		// Buscamos y poblamos automáticamente los arrays que el analizador encontró
		const query = Categorias.findById(idCategoria);
		configRelaciones.arraysAMover.forEach((arr) => query.populate(arr));

		const categoria = await query.exec();
		if (!categoria) throw new Error('La categoría no existe');

		// Ejecutamos
		const categoriaEliminada = await deleteGeneral(
			categoria,
			idNuevaCategoria,
			configRelaciones,
		);

		return categoriaEliminada;
	} catch (error) {
		throw error;
	}
};

export default deleteControllerCategory;
