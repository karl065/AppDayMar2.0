import { emitEvent } from '../../../services/sockets/socketServices';
import crearUsuariosServices from '../../../services/usuarios/crearUsuariosServices';
import { agregarUsuario } from '../slices/usuariosSlice';

export const crearUsuariosAction = async (dispatch, nuevoUsuario) => {
	try {
		const data = await crearUsuariosServices(nuevoUsuario);

		console.log(data);

		dispatch(agregarUsuario(data));
		emitEvent('usuario:creado', data);
	} catch (error) {
		const message = error.message || 'Error al crear usuario';
		console.log(message);
		throw new Error(message, { cause: error });
	}
};
