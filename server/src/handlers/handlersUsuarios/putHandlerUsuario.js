import putControllerUsuarios from '../../controllers/controllersUsuarios/putControllerUsuarios.js';

const putHandlerUsuario = async (req, res) => {
	try {
		const { id } = req.params;

		const dataUpdate = req.body;

		const usuarioActualizado = await putControllerUsuarios(dataUpdate, id);

		return res.status(200).json(usuarioActualizado);
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
};

export default putHandlerUsuario;
