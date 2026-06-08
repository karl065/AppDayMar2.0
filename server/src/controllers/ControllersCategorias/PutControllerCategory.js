import CategoriasModel from '../../models/Categorias.js';

const putControllerCategorias = async (dataUpdate, id) => {
	try {
		if (dataUpdate.categoria) {
			await CategoriasModel.findByIdAndUpdate(id, {
				$push: { productos: dataUpdate._id },
			});
			return true;
		}

		await CategoriasModel.findByIdAndUpdate(id, dataUpdate);
		const categoriaActualizada = await CategoriasModel.findById(id)
			.populate('usuario')
			.populate('productos');
		return categoriaActualizada;
	} catch (error) {
		return error;
	}
};

export default putControllerCategorias;
