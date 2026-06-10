import {
	agregarRol,
	actualizarRol,
	eliminarRol,
} from '../../../redux/roles/slices/rolesSlice.jsx'; // Ajusta la ruta a tu slice
import { getAppDispatch } from '../../../services/sockets/socketServices.jsx';

const rolesSocketsListeners = (socket) => {
	const dispatch = getAppDispatch();

	if (!dispatch) {
		console.error('❌ No se ha configurado el dispatch para los sockets.');
		return;
	}

	socket.on('rol:agregar', (data) => {
		dispatch(agregarRol(data));
	});

	socket.on('rol:recargar', (data) => {
		dispatch(actualizarRol(data));
	});

	socket.on('rol:quitar', (id) => {
		dispatch(eliminarRol(id));
	});
};

export default rolesSocketsListeners;
