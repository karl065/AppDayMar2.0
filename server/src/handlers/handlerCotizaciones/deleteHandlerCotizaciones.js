import deleteControllerCotizaciones from './../../controllers/ControllerCotizaciones/deleteControllerCotizaciones.js';

const deleteHandlerCotizaciones = async (req, res) => {
	try {
		const { id } = req.params;
		const eliminado = await deleteControllerCotizaciones(id);
		return res.status(200).json(eliminado);
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
};
export default deleteHandlerCotizaciones;
