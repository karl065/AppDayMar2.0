import getControllerUsuarios from '../../controllers/controllersUsuarios/getControllerUsuarios.js';
import construirFiltros from './../../helpers/construirFiltros.js';

const getHandlerUsuario = async (req, res) => {
	try {
		const filtros = construirFiltros(req.query);

		const usuarios = await getControllerUsuarios(filtros);

		return res.status(200).json(usuarios);
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
};

export default getHandlerUsuario;
