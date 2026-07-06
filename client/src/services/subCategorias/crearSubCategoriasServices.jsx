import axios from 'axios';
import server from '../../conexiones/conexiones.jsx';

const crearSubCategoriasServices = async (nuevaSubCategoria) => {
	try {
		const { data } = await axios.post(
			`${server.api.baseURL}subCategorias`,
			nuevaSubCategoria,
			{
				withCredentials: true,
			},
		);

		return data;
	} catch (error) {
		console.log(error);
	}
};

export default crearSubCategoriasServices;
