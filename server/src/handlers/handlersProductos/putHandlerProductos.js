import putControllerProductos from '../../controllers/controllersProductos/putControllerProductos.js';

const putHandlerProductos = async (req, res) => {
	try {
		const { id } = req.params;
		const dataUpdate = req.body;
		const actualizado = await putControllerProductos(dataUpdate, id);
		return res.status(200).json(actualizado);
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
};
export default putHandlerProductos;
