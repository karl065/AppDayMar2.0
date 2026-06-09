import getControllerCategorias from './../../controllers/ControllersCategorias/GetControllerCategory.js';

const getHandlerCategorias = async (req, res) => {
	try {
		const filtros = req.query;
		const categorias = await getControllerCategorias(filtros);
		return res.status(200).json(categorias);
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
};

export default getHandlerCategorias;
