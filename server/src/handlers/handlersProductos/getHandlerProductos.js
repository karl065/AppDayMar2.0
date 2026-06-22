import getControllerProductos from '../../controllers/ControllersProductos/getControllerProductos.js';

const getHandlerProductos = async (req, res) => {
	try {
		const filtros = req.query;
		const productos = await getControllerProductos(filtros);
		return res.status(200).json(productos);
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
};
export default getHandlerProductos;
