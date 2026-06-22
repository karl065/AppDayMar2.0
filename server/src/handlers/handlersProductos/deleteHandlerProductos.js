import deleteControllerProducto from '../../controllers/ControllersProductos/deleteControllerProductos.js';

const deleteHandlerProductos = async (req, res) => {
	try {
		const { id } = req.params;
		const eliminado = await deleteControllerProducto(id);
		return res.status(200).json(eliminado);
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
};
export default deleteHandlerProductos;
