import TiposModel from './../../models/Tipos.js';

const postControllerTipo = async (tipo) => {
	try {
		const nuevoTipo = await TiposModel.create(tipo);

		return nuevoTipo;
	} catch (error) {
		return error;
	}
};

export default postControllerTipo;
