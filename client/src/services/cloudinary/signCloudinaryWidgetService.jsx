import axios from 'axios';
import server from '../../conexiones/conexiones.jsx';

/**
 * Envía los parámetros dinámicos al backend para que sean firmados de forma segura.
 * @param {Object} paramsToSign - El objeto generado por el widget de Cloudinary.
 */
const signCloudinaryWidgetService = async (paramsToSign) => {
	try {
		const { data } = await axios.post(
			`${server.api.baseURL}cloudinary/sign`,
			{ paramsToSign },
			{ withCredentials: true },
		);
		return data.signature; // Retornamos directamente la firma
	} catch (error) {
		console.error('Error al firmar los parámetros del widget:', error);
		throw error;
	}
};

export default signCloudinaryWidgetService;
