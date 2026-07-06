import SubCategorias from '../../models/SubCategorias.js';
import putControllerCategorias from './../ControllersCategorias/PutControllerCategory.js';

const postControllerSubCategorias = async (subCategoria) => {
	try {
		let subCategoriaNueva = await SubCategorias.create(subCategoria);

		await subCategoriaNueva.populate([
			{ path: 'categoria' },
			{ path: 'productos' },
		]);

		// 3. Notificar al Tipo que tiene una nueva subcategoría (pasamos el ID limpio)
		await subCategoriaNueva.populate({
			path: 'categoria',
			populate: {
				path: 'tipo',
			},
		});

		await subCategoriaNueva.populate('productos');

		return subCategoriaNueva;
	} catch (error) {
		console.error('Error en postControllerSubCategorias:', error.message);
		throw error;
	}
};

export default postControllerSubCategorias;
