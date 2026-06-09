import getControllerRoles from '../../controllers/controllersRoles/getControllerRoles.js';

const getHandlerRoles = async (req, res) => {
	try {
		// Tu estilo original: desestructurar querys
		const filtros = req.query;
		const roles = await getControllerRoles(filtros);
		return res.status(200).json(roles);
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
};

export default getHandlerRoles;
