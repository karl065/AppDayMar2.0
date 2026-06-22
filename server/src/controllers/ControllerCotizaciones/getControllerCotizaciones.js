// src/controllers/ControllersCotizaciones/GetControllerCotizaciones.js
import Cotizaciones from '../../models/Cotizaciones.js';
import filtroAvanzado from '../../helpers/filtros/filtroAvanzado.js';

const getControllerCotizaciones = async (query) => {
	try {
		// Opción para obtener los estados del enum (útil para selects en el front)
		if (query.obtenerEstados) {
			return await Cotizaciones.schema.path('estado').enumValues;
		}

		// Opción para obtener los estados de disponibilidad de productos
		if (query.obtenerDisponibilidad) {
			return await Cotizaciones.schema.path('productos.disponibilidad')
				.enumValues;
		}

		const filtro = filtroAvanzado(query, Cotizaciones.schema);

		const cotizaciones = await Cotizaciones.find(
			Object.keys(filtro).length > 0 ? filtro : {},
		)
			.populate('usuario')
			.populate('productos.producto');

		return cotizaciones;
	} catch (error) {
		throw error;
	}
};

export default getControllerCotizaciones;
