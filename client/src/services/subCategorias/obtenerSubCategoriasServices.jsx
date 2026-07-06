import axios from 'axios';
import server from '../../conexiones/conexiones.jsx';

const obtenerSubCategoriasServices = async () => {
	try {
		const { data } = await axios.get(`${server.api.baseURL}subCategorias`, {
			withCredentials: true,
		});
		return data;
	} catch (error) {
		console.log(error);
	}
};

export default obtenerSubCategoriasServices;
