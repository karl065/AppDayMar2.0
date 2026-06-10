// Ajusta la ruta a tu slice
import {
	actualizarTipo,
	agregarTipo,
	eliminarTipo,
} from '../../../redux/tipos/slices/tiposSlices.jsx';
import { getAppDispatch } from '../../../services/sockets/socketServices.jsx';

const tiposSocketsListeners = (socket) => {
	const dispatch = getAppDispatch();

	if (!dispatch) {
		console.error('❌ No se ha configurado el dispatch para los sockets.');
		return;
	}

	socket.on('tipo:agregar', (data) => {
		dispatch(agregarTipo(data));
	});

	socket.on('tipo:recargar', (data) => {
		dispatch(actualizarTipo(data));
	});

	socket.on('tipo:quitar', (id) => {
		dispatch(eliminarTipo(id));
	});
};

export default tiposSocketsListeners;
