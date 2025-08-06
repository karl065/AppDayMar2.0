import putControllerRoles from '../../controllers/controllersRoles/putControllerRoles.js';

const putHandlerRoles = async (req, res) => {
	try {
		const { id } = req.params;

		const dataUpdate = req.body;

		const rolActualizado = await putControllerRoles(dataUpdate, id);

		return res.status(200).json(rolActualizado);
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
};

export default putHandlerRoles;
