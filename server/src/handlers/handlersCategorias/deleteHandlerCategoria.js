import deleteControllerCategory from './../../controllers/ControllersCategorias/DeleteControllerCategory.js';

const deleteHandlerCategorias = async (req, res) => {
	try {
		const { id } = req.params;
		const { idNueva } = req.query;
		const eliminada = await deleteControllerCategory(id, idNueva);
		return res.status(200).json(eliminada);
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
};

export default deleteHandlerCategorias;
