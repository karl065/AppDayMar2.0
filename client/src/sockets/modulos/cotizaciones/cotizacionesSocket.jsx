import {
	actualizarCotizacion,
	agregarCotizacion,
	eliminarCotizacion,
} from '../../../redux/cotizaciones/slices/cotizacionesSlices.jsx';
import { getAppDispatch } from '../../../services/sockets/socketServices.jsx';

const cotizacionesSocketsListeners = (socket) => {
	const dispatch = getAppDispatch();

	if (!dispatch) {
		console.error('❌ No se ha configurado el dispatch para los sockets.');
		return;
	}

	// Escucha cuando un cliente crea una cotización (para el panel admin)
	socket.on('cotizacion:agregar', (data) => {
		dispatch(agregarCotizacion(data));
	});

	// Escucha cuando el admin actualiza datos o precios
	socket.on('cotizacion:recargar', (data) => {
		dispatch(actualizarCotizacion(data));
	});

	// Escucha cuando se elimina una cotización
	socket.on('cotizacion:quitar', (id) => {
		dispatch(eliminarCotizacion(id));
	});
};

export default cotizacionesSocketsListeners;
