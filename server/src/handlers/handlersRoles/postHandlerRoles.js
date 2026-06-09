import postControllerRoles from '../../controllers/controllersRoles/postControllerRoles.js';

const postHandlerRoles = async (req, res) => {
	try {
		const rol = req.body;
		const nuevo = await postControllerRoles(rol);
		return res.status(201).json(nuevo);
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
};

export default postHandlerRoles;
