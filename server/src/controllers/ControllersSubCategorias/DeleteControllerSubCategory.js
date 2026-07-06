import SubCategorias from '../../models/SubCategorias.js';
import analizarEsquemaDelete from '../../helpers/analizadorSchemas/analizadorSchemasDelete.js';
import deleteGeneral from '../../helpers/organizadoresGenerales/deleteGeneral.js';

// Ahora solicitamos por obligación el ID de la nueva subcategoría
const deleteControllerSubCategory = async (
	idSubCategoria,
	idNuevaSubCategoria,
) => {
	try {
		// Generamos la configuración una sola vez al cargar el archivo
		const configRelaciones = analizarEsquemaDelete(SubCategorias);
		if (!idSubCategoria) throw new Error('El ID a eliminar es requerido');

		// Buscamos y poblamos automáticamente los arrays que el analizador encontró
		const query = SubCategorias.findById(idSubCategoria);
		configRelaciones.arraysAMover.forEach((arr) => query.populate(arr));

		const subcategoria = await query.exec();
		if (!subcategoria) throw new Error('La subcategoría no existe');

		// Ejecutamos
		const subcategoriaEliminada = await deleteGeneral(
			subcategoria,
			idNuevaSubCategoria,
			configRelaciones,
		);

		return subcategoriaEliminada;
	} catch (error) {
		throw error;
	}
};

export default deleteControllerSubCategory;
