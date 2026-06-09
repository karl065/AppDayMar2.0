import TiposModel from '../../models/Tipos.js';
import analizarEsquemaPut from '../../helpers/analizarEsquemaPut.js';
import putGeneral from '../../helpers/putGeneral.js';

const configPut = analizarEsquemaPut(TiposModel);

const putControllerTipo = async (dataUpdate, idTipo) => {
	try {
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
		return { error: error.message };
	}
};

export default putControllerTipo;
