import axios from 'axios';
import server from '../../conexiones/conexiones.jsx';

/**
 * Elimina una imagen de Cloudinary usando su publicId.
 * @param {String} publicId - El identificador público de la imagen.
 */
const deleteCloudinaryImageService = async (publicId) => {
	try {
		const { data } = await axios.post(
			`${server.api.baseURL}cloudinary/`,
			{ publicId },
			{ withCredentials: true },
		);
		return data;
	} catch (error) {
		console.error('Error al eliminar la imagen en Cloudinary:', error);
		throw error;
	}
};

export default deleteCloudinaryImageService;
