import axios from 'axios';
import server from '../../conexiones/conexiones.jsx';

const eliminarRolesServices = async (id) => {
	try {
		const { data } = await axios.delete(`${server.api.baseURL}roles/${id}`, {
			withCredentials: true,
		});
		return data;
	} catch (error) {
		console.log(error);
	}
};

export default eliminarRolesServices;
