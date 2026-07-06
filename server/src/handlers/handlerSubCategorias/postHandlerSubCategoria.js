import postControllerSubCategorias from '../../controllers/ControllersSubCategorias/PostControllerSubCategory.js';

const postHandlerSubCategorias = async (req, res) => {
	try {
		const data = req.body;
		const nueva = await postControllerSubCategorias(data);
		return res.status(201).json(nueva);
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
};

export default postHandlerSubCategorias;
