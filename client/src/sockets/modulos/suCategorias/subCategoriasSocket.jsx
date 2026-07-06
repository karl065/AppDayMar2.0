import {
	actualizarSubCategoria,
	agregarSubCategoria,
	eliminarSubCategoria,
} from '../../../redux/subCategorias/slices/subCategoriasSlice.jsx';
import { getAppDispatch } from '../../../services/sockets/socketServices.jsx';

const subCategoriasSocketsListeners = (socket) => {
	const dispatch = getAppDispatch();

	if (!dispatch) {
		console.error('❌ No se ha configurado el dispatch para los sockets.');
		return;
	}

	socket.on('subcategoria:agregar', (data) => {
		dispatch(agregarSubCategoria(data));
	});

	socket.on('subcategoria:recargar', (data) => {
		dispatch(actualizarSubCategoria(data));
	});

	socket.on('subcategoria:quitar', (id) => {
		dispatch(eliminarSubCategoria(id));
	});
};

export default subCategoriasSocketsListeners;
