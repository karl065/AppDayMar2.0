import {
	agregarCategoria,
	actualizarCategoria,
	eliminarCategoria,
} from '../../../redux/categorias/slices/categoriasSlice.jsx'; // Ajusta la ruta a tu slice
import { getAppDispatch } from '../../../services/sockets/socketServices.jsx';

const categoriasSocketsListeners = (socket) => {
	const dispatch = getAppDispatch();

	if (!dispatch) {
		console.error('❌ No se ha configurado el dispatch para los sockets.');
		return;
	}

	socket.on('categoria:agregar', (data) => {
		dispatch(agregarCategoria(data));
	});

	socket.on('categoria:recargar', (data) => {
		dispatch(actualizarCategoria(data));
	});

	socket.on('categoria:quitar', (id) => {
		dispatch(eliminarCategoria(id));
	});
};

export default categoriasSocketsListeners;
