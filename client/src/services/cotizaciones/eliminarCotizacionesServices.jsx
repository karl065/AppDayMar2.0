import axios from 'axios';
import server from '../../conexiones/conexiones.jsx';

const eliminarCotizacionServices = async (id) => {
	try {
		const { data } = await axios.delete(
			`${server.api.baseURL}cotizaciones/${id}`,
			{ withCredentials: true },
		);
		return data;
	} catch (error) {
		console.log(error);
	}
};

export default eliminarCotizacionServices;
