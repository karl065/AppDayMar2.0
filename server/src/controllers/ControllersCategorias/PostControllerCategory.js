import CategoriasModel from './../../models/Categorias.js';

const crearCategoria = async (nombreCategoria, descripcion, status) => {
	try {
		const newCategory = await CategoriasModel.create({
			nombreCategoria,
			descripcion,
			status,
		});
		return newCategory;
	} catch (error) {
		return error;
	}
};

export default crearCategoria;
