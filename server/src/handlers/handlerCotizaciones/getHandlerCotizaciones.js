import getControllerCotizaciones from './../../controllers/ControllerCotizaciones/getControllerCotizaciones.js';

const getHandlerCotizaciones = async (req, res) => {
	try {
		const filtros = req.query;
		const cotizaciones = await getControllerCotizaciones(filtros);
		return res.status(200).json(cotizaciones);
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
};

export default getHandlerCotizaciones;
