import deleteControllerRoles from '../../controllers/controllersRoles/deleteControllerRoles.js';

const deleteHandlerRoles = async (req, res) => {
	try {
		const { id } = req.params;

		const { idRolAsignar } = req.query;

		const roles = await deleteControllerRoles(id, idRolAsignar);

		return res.status(200).json(roles);
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
};

export default deleteHandlerRoles;
