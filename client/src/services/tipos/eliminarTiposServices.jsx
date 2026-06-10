import axios from 'axios';
import server from '../../conexiones/conexiones.jsx';

const eliminarTiposServices = async (id) => {
	try {
		const { data } = await axios.delete(`${server.api.baseURL}tipos/${id}`, {
			withCredentials: true,
		});
		return data;
	} catch (error) {
		console.log(error);
	}
};

export default eliminarTiposServices;
