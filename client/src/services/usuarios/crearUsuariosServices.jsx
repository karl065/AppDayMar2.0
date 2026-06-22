import axios from 'axios';
import server from '../../conexiones/conexiones.jsx';

const crearUsuariosServices = async (nuevoUsuario) => {
	try {
		const { data } = await axios.post(
			`${server.api.baseURL}usuarios`,
			nuevoUsuario,
			{
				withCredentials: true,
			},
		);

		return data;
	} catch (error) {
		// Si Axios tiene respuesta, usamos su mensaje, pero preservamos la causa
		const message = error.response?.data?.message || 'Error al crear usuario';
		throw new Error(message, { cause: error });
	}
};

export default crearUsuariosServices;
