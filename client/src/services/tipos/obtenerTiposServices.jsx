import axios from 'axios';
import server from '../../conexiones/conexiones.jsx';

const obtenerTiposServices = async () => {
	try {
		const { data } = await axios.get(`${server.api.baseURL}tipos`, {
			withCredentials: true,
		});
		return data;
	} catch (error) {
		console.log(error);
	}
};

export default obtenerTiposServices;
