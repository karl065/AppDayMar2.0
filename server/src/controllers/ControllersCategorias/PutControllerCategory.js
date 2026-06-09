import analizarEsquemaPut from '../../helpers/analizadorSchemas/analizadorSchemasPut.js';
import putGeneral from '../../helpers/organizadoresGenerales/PutGeneral.js';
import Categorias from '../../models/Categorias.js';

const putControllerCategorias = async (dataUpdate, id) => {
	try {
		// Analizamos el esquema una sola vez
		const configPut = analizarEsquemaPut(Categorias);
		if (!id) throw new Error('El ID es requerido');

		// El helper hace toda la distribución, sincronización y actualización
		const categoriaActualizada = await putGeneral(
			Categorias,
			id,
			dataUpdate,
			configPut,
		);

		// Si necesitas devolver la data poblada:
		return await Categorias.findById(categoriaActualizada._id)
			.populate('usuario')
			.populate('productos');
	} catch (error) {
		throw error;
	}
};

export default putControllerCategorias;
