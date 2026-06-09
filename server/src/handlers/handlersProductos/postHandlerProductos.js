import postControllerProductos from '../../controllers/controllersProductos/postControllerProductos.js';

const postHandlerProductos = async (req, res) => {
	try {
		const data = req.body;
		const nuevo = await postControllerProductos(data);
		return res.status(201).json(nuevo);
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
};
export default postHandlerProductos;
