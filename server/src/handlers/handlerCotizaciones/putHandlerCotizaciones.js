import putControllerCotizaciones from './../../controllers/ControllerCotizaciones/putControllerCotizaciones.js';

const putHandlerCotizaciones = async (req, res) => {
	try {
		const { id } = req.params;
		const dataUpdate = req.body;
		const actualizado = await putControllerCotizaciones(dataUpdate, id);
		return res.status(200).json(actualizado);
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
};
export default putHandlerCotizaciones;
