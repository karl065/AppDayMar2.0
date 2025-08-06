const postHandlerUsuario = async (req, res) => {
	try {
		const { nombre, apellido, celular, email, password, rol } = req.body;

		if (!nombre || !email || !password) {
			return res.status(401).send('Debe llenar todos los campos');
		}
		const usuario = await postUsuarios(
			{ nombre, apellido, email, celular, password },
			rol
		);
		return res.status(200).json(usuario);
	} catch (error) {
		return res.status(500).json(error);
	}
};

export default postHandlerUsuario;
