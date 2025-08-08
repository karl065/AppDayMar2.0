import deleteControllerUsuarios from '../../controllers/controllersUsuarios/deleteControllerUsuarios.js';

const deleteHandlerUsuarios = async (req, res) => {
	try {
		const { id } = req.params;

		const usuarioEliminado = await deleteControllerUsuarios(id);

		return res.status(200).json(usuarioEliminado);
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
};

export default deleteHandlerUsuarios;
