import eliminarCotizacionServices from '../../../services/cotizaciones/eliminarCotizacionesServices.jsx';
import { emitEvent } from '../../../services/sockets/socketServices.jsx';
import { eliminarCotizacion } from '../slices/cotizacionesSlices.jsx';

export const eliminarCotizacionesAction = async (dispatch, id) => {
	try {
		const { _id } = await eliminarCotizacionServices(id);
		dispatch(eliminarCotizacion(_id));

		emitEvent('cotizacion:eliminada', _id);
	} catch (error) {
		console.log(error);
	}
};
