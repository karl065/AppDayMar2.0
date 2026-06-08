import CategoriasModel from '../../models/Categorias.js';

const deleteControllerCategory = async (idCategoria) => {
	try {
		const category = await CategoriasModel.findById(idCategoria);
		await CategoriasModel.findByIdAndDelete(idCategoria);
		return category;
	} catch (error) {
		return error;
	}
};

export default deleteControllerCategory;
