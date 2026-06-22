import crearCotizacionServices from '../../../services/cotizaciones/crearCotizacionesServices.jsx';
import { agregarCotizacion } from '../slices/cotizacionesSlices.jsx';
import { emitEvent } from '../../../services/sockets/socketServices.jsx';

export const crearCotizacionesAction = async (dispatch, cotizacion) => {
	try {
		const data = await crearCotizacionServices(cotizacion);
		dispatch(agregarCotizacion(data));

		// Notificamos al admin que llegó una nueva solicitud
		emitEvent('cotizacion:creada', data);
		return data;
	} catch (error) {
		console.log(error);
		throw error; // Lo lanzamos para que el Modal pueda manejar el error
	}
};
