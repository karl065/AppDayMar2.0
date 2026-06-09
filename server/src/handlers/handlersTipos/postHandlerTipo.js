import postControllerTipos from '../../controllers/controllersTipos/postControllerTipos.js';

const postHandlerTipos = async (req, res) => {
	try {
		const data = req.body;
		const nuevo = await postControllerTipos(data);
		return res.status(201).json(nuevo);
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
};

export default postHandlerTipos;
