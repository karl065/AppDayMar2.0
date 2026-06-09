import analizarEsquemaPut from '../../helpers/analizadorSchemas/analizadorSchemasPut.js';
import putGeneral from '../../helpers/organizadoresGenerales/PutGeneral.js';
import TiposModel from '../../models/Tipos.js';

const putControllerTipo = async (dataUpdate, idTipo) => {
	try {
		const configPut = analizarEsquemaPut(TiposModel);
		if (!idTipo) throw new Error('ID de tipo requerido');

		const tipoActualizado = await putGeneral(
			TiposModel,
			idTipo,
			dataUpdate,
			configPut,
		);

		return await TiposModel.findById(tipoActualizado._id)
			.populate('categorias')
			.populate('usuarios');
	} catch (error) {
		throw error;
	}
};

export default putControllerTipo;
