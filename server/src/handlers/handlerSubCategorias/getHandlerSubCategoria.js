import getControllerSubCategorias from '../../controllers/ControllersSubCategorias/GetControllerSubCategory.js';

const getHandlerSubCategorias = async (req, res) => {
	try {
		const filtros = req.query;
		const categorias = await getControllerSubCategorias(filtros);
		return res.status(200).json(categorias);
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
};

export default getHandlerSubCategorias;
