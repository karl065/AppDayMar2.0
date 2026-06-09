import analizarEsquemaPut from '../../helpers/analizadorSchemas/analizadorSchemasPut.js';
import putGeneral from '../../helpers/organizadoresGenerales/PutGeneral.js';
import CategoriasModel from '../../models/Categorias.js';

// Analizamos el esquema una sola vez
const configPut = analizarEsquemaPut(CategoriasModel);

const putControllerCategorias = async (dataUpdate, id) => {
	try {
		if (!id) throw new Error('El ID es requerido');

		// El helper hace toda la distribución, sincronización y actualización
		const categoriaActualizada = await putGeneral(
			CategoriasModel,
			id,
			dataUpdate,
			configPut,
		);

		// Si necesitas devolver la data poblada:
		return await CategoriasModel.findById(categoriaActualizada._id)
			.populate('usuario')
			.populate('productos');
	} catch (error) {
		return { error: error.message };
	}
};

export default putControllerCategorias;
