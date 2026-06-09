import postControllerCategorias from './../../controllers/ControllersCategorias/PostControllerCategory.js';

const postHandlerCategorias = async (req, res) => {
	try {
		const data = req.body;
		const nueva = await postControllerCategorias(data);
		return res.status(201).json(nueva);
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
};

export default postHandlerCategorias;
