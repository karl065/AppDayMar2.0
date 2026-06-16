import analizarEsquemaPut from '../../helpers/analizadorSchemas/analizadorSchemasPut.js';
import putGeneral from '../../helpers/organizadoresGenerales/PutGeneral.js';
import TiposModel from '../../models/Tipos.js';

const putControllerTipo = async (dataUpdate, idTipo) => {
	try {
		if (!idTipo) throw new Error('ID de tipo requerido');

		const configPut = analizarEsquemaPut(TiposModel);

		// Pasamos dataUpdate tal cual (puede ser un objeto plano o con operadores)
		const tipoActualizado = await putGeneral(
			TiposModel,
			idTipo,
			dataUpdate,
			configPut,
		);

		// Recargamos el documento para devolverlo con las relaciones actualizadas
		return await TiposModel.findById(tipoActualizado._id)
			.populate('categorias')
			.populate('usuario');
	} catch (error) {
		throw error;
	}
};

export default putControllerTipo;
