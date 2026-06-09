import putControllerTipo from '../controllersTipos/putControllerTipos.js';
// Importaste CategoriasModel, asegúrate de usar ese nombre al crear
import CategoriasModel from './../../models/Categorias.js';

const postControllerCategorias = async (categoria) => {
	try {
		// Corrección: Usar CategoriasModel.create en lugar de Categorias.create
		const categoriaNueva = await CategoriasModel.create(categoria);

		await putControllerTipo(
			{ $addToSet: { categorias: categoriaNueva._id } },
			categoria.tipo,
		);

		return categoriaNueva;
	} catch (error) {
		return error;
	}
};

// Corrección: Exportar el nombre real de tu función
export default postControllerCategorias;
