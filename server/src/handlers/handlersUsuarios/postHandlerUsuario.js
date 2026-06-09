import postControllerUsuario from '../../controllers/controllersUsuarios/postControllerUsuarios.js';

const postHandlerUsuario = async (req, res) => {
	try {
		const usuarioNuevo = await postControllerUsuario(req.body);
		return res.status(201).json(usuarioNuevo);
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
};

export default postHandlerUsuario;
