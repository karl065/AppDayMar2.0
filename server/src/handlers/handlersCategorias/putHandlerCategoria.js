import putControllerCategorias from '../../controllers/ControllersCategorias/PutControllerCategory.js';

const putHandlerCategorias = async (req, res) => {
	try {
		const { id } = req.params;
		const dataUpdate = req.body;
		const actualizada = await putControllerCategorias(dataUpdate, id);
		return res.status(200).json(actualizada);
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
};

export default putHandlerCategorias;
