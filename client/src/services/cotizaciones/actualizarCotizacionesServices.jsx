import axios from 'axios';
import server from '../../conexiones/conexiones.jsx';

const actualizarCotizacionServices = async (id, dataUpdate) => {
	try {
		const { data } = await axios.put(
			`${server.api.baseURL}cotizaciones/${id}`,
			dataUpdate,
			{ withCredentials: true },
		);
		return data;
	} catch (error) {
		console.log(error);
		throw error;
	}
};

export default actualizarCotizacionServices;
