import { cargarCotizaciones } from '../slices/cotizacionesSlices.jsx';
import obtenerCotizacionesServices from './../../../services/cotizaciones/obtenerCotizacionesServices.jsx';

export const obtenerCotizacionesAction = async (dispatch) => {
	try {
		const data = await obtenerCotizacionesServices();
		dispatch(cargarCotizaciones(data));
	} catch (error) {
		console.log(error);
	}
};
