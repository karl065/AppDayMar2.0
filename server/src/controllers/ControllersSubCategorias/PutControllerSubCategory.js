import analizarEsquemaPut from '../../helpers/analizadorSchemas/analizadorSchemasPut.js';
import putGeneral from '../../helpers/organizadoresGenerales/putGeneral.js';
import SubCategorias from '../../models/SubCategorias.js';

const putControllerSubCategorias = async (dataUpdate, id) => {
	try {
		// Analizamos el esquema una sola vez
		const configPut = analizarEsquemaPut(SubCategorias);
		if (!id) throw new Error('El ID es requerido');

		// El helper hace toda la distribución, sincronización y actualización
		const subCategoriaActualizada = await putGeneral(
			SubCategorias,
			id,
			dataUpdate,
			configPut,
		);

		// Si necesitas devolver la data poblada:
		return await SubCategorias.findById(subCategoriaActualizada._id)
			.populate({
				path: 'categoria',
				populate: {
					path: 'tipo',
				},
			})
			.populate('usuario')
			.populate('productos');
	} catch (error) {
		throw error;
	}
};

export default putControllerSubCategorias;
