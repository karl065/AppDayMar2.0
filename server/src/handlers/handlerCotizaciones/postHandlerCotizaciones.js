import postControllerCotizaciones from '../../controllers/ControllerCotizaciones/postControllerCotizaciones.js';

const postHandlerCotizaciones = async (req, res) => {
	try {
		const data = req.body;

		// 🔥 Validaciones flexibles:
		// 1. Debe existir al menos un usuario OR un cliente.
		const tieneIdentificacion = data.usuario || data.cliente;

		// 2. Debe haber productos y deben ser un array con contenido.
		const tieneProductos =
			data.productos &&
			Array.isArray(data.productos) &&
			data.productos.length > 0;

		if (!tieneIdentificacion || !tieneProductos) {
			return res.status(400).json({
				error:
					'La cotización debe tener un usuario o cliente asociado y al menos un producto',
			});
		}

		// Llamada al controlador
		const nuevaCotizacion = await postControllerCotizaciones(data);

		return res.status(201).json(nuevaCotizacion);
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
};

export default postHandlerCotizaciones;
