import {
	actualizarProducto,
	agregarProducto,
	eliminarProducto,
} from '../../../redux/productos/slices/productosSlice.jsx';
import { getAppDispatch } from '../../../services/sockets/socketServices.jsx';

const productosSocketsListeners = (socket) => {
	const dispatch = getAppDispatch();

	if (!dispatch) {
		console.error('❌ No se ha configurado el dispatch para los sockets.');
		return;
	}

	// 🔥 LIMPIAR LISTENERS VIEJOS ANTES DE AGREGAR LOS NUEVOS
	socket.off('producto:agregar');
	socket.off('producto:recargar');
	socket.off('producto:quitar');

	socket.on('producto:agregar', (data) => {
		dispatch(agregarProducto(data));
	});

	socket.on('producto:recargar', (data) => {
		dispatch(actualizarProducto(data));
	});

	socket.on('producto:quitar', (id) => {
		dispatch(eliminarProducto(id));
	});
};

export default productosSocketsListeners;
