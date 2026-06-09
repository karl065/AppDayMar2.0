import deleteControllerRoles from '../../controllers/controllersRoles/deleteControllerRoles.js';

const deleteHandlerRoles = async (req, res) => {
	try {
		// Tu estilo original: desestructurar params y querys
		const { id } = req.params;
		const { idAsignar } = req.query;

		const eliminado = await deleteControllerRoles(id, idAsignar);
		return res.status(200).json(eliminado);
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
};

export default deleteHandlerRoles;
