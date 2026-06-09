import putControllerTipos from '../../controllers/controllersTipos/putControllerTipos.js';

const putHandlerTipos = async (req, res) => {
	try {
		const { id } = req.params;
		const dataUpdate = req.body;
		const actualizado = await putControllerTipos(dataUpdate, id);
		return res.status(200).json(actualizado);
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
};

export default putHandlerTipos;
