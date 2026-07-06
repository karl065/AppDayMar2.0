import axios from 'axios';
import server from '../../conexiones/conexiones.jsx';

const eliminarSubCategoriasServices = async (id, idNueva) => {
	try {
		const { data } = await axios.delete(
			`${server.api.baseURL}subCategorias/${id}`,
			idNueva,
			{
				withCredentials: true,
			},
		);
		return data;
	} catch (error) {
		console.log(error);
	}
};

export default eliminarSubCategoriasServices;
