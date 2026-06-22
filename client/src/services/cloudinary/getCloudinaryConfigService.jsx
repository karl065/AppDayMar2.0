import axios from 'axios';
import server from '../../conexiones/conexiones.jsx';

/**
 * Obtiene las credenciales públicas (cloudName y apiKey) desde el backend.
 */
const getCloudinaryConfigService = async () => {
	try {
		const { data } = await axios.get(`${server.api.baseURL}cloudinary/config`, {
			withCredentials: true,
		});
		return data;
	} catch (error) {
		console.error('Error al obtener la configuración de Cloudinary:', error);
		throw error; // Lanzamos el error para manejarlo en el componente
	}
};

export default getCloudinaryConfigService;
