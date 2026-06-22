import { emitEvent } from '../../../services/sockets/socketServices.jsx';
import { actualizarCotizacion } from '../slices/cotizacionesSlices.jsx';
import actualizarCotizacionServices from './../../../services/cotizaciones/actualizarCotizacionesServices.jsx';

export const actualizarCotizacionesAction = async (
	dispatch,
	id,
	dataUpdate,
) => {
	try {
		const data = await actualizarCotizacionServices(id, dataUpdate);
		dispatch(actualizarCotizacion(data));

		emitEvent('cotizacion:actualizada', data);
	} catch (error) {
		console.log(error);
	}
};
