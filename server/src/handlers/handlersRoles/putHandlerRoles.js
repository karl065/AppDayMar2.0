import putControllerRoles from '../../controllers/controllersRoles/putControllerRoles.js';

const putHandlerRoles = async (req, res) => {
	try {
		// Tu estilo original: desestructurar params y body
		const { id } = req.params;
		const dataUpdate = req.body;

		const actualizado = await putControllerRoles(dataUpdate, id);
		return res.status(200).json(actualizado);
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
};

export default putHandlerRoles;
