import axios from 'axios';
import server from '../../conexiones/conexiones.jsx';

const obtenerCotizacionesServices = async () => {
	try {
		const { data } = await axios.get(`${server.api.baseURL}cotizaciones`, {
			withCredentials: true,
		});
		return data;
	} catch (error) {
		console.log(error);
	}
};

export default obtenerCotizacionesServices;
