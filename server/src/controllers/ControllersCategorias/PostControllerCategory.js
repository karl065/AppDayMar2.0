import putControllerTipo from '../controllersTipos/putControllerTipos.js';
// Importaste Categorias, asegúrate de usar ese nombre al crear
import Categorias from './../../models/Categorias.js';

const postControllerCategorias = async (categoria) => {
	try {
		// Corrección: Usar Categorias.create en lugar de Categorias.create
		const categoriaNueva = await Categorias.create(categoria);

		await putControllerTipo(
			{ $addToSet: { categorias: categoriaNueva._id } },
			categoria.tipo,
		);

		return categoriaNueva;
	} catch (error) {
		throw error;
	}
};

// Corrección: Exportar el nombre real de tu función
export default postControllerCategorias;
