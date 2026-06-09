import deleteControllerTipos from '../../controllers/controllersTipos/deleteControllerTipos.js';

const deleteHandlerTipos = async (req, res) => {
	try {
		const { id } = req.params;
		const { idAsignar } = req.query;
		const eliminado = await deleteControllerTipos(id, idAsignar);
		return res.status(200).json(eliminado);
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
};

export default deleteHandlerTipos;
