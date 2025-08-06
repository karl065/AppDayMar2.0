import postControllerRoles from '../../controllers/controllersRoles/postControllerRoles.js';

const postHandlerRoles = async (req, res) => {
	try {
		const rol = req.body;

		const rolNuevo = await postControllerRoles(rol);

		return res.status(200).json(rolNuevo);
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
};

export default postHandlerRoles;
