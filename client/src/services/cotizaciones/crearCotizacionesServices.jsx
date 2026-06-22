import axios from 'axios';
import server from '../../conexiones/conexiones.jsx';

const crearCotizacionServices = async (nuevaCotizacion) => {
	try {
		const { data } = await axios.post(
			`${server.api.baseURL}cotizaciones`,
			nuevaCotizacion,
			{ withCredentials: true },
		);
		return data;
	} catch (error) {
		console.log(error);
		throw error; // Lanzamos el error para manejarlo en el modal
	}
};

export default crearCotizacionServices;
