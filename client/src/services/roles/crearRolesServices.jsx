import axios from 'axios';
import server from '../../conexiones/conexiones.jsx';

const crearRolesServices = async (roleNuevo) => {
	try {
		const { data } = await axios.post(`${server.api.baseURL}roles`, roleNuevo, {
			withCredentials: true,
		});
		console.log(JSON.stringify('Services ', data, null, 2));
		return data;
	} catch (error) {
		console.log(error);
	}
};

export default crearRolesServices;
