import Categorias from './../../models/Categorias.js';
import putControllerTipo from '../controllersTipos/putControllerTipos.js';

const postControllerCategorias = async (categoria) => {
	try {
		// 1. Crear la categoría
		let categoriaNueva = await Categorias.create(categoria);

		// 2. Ejecutar el populate de forma asíncrona
		categoriaNueva = await categoriaNueva.populate('tipo');

		// 3. Notificar al Tipo que tiene una nueva categoría (pasamos el ID limpio)
		await putControllerTipo({ categorias: categoriaNueva._id }, categoria.tipo);

		return categoriaNueva;
	} catch (error) {
		console.error('Error en postControllerCategorias:', error.message);
		throw error;
	}
};

export default postControllerCategorias;
