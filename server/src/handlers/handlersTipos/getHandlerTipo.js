import getControllerTipos from '../../controllers/controllersTipos/getControllerTipos.js';

const getHandlerTipos = async (req, res) => {
	try {
		const filtros = req.query;
		const tipos = await getControllerTipos(filtros);
		return res.status(200).json(tipos);
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
};

export default getHandlerTipos;
