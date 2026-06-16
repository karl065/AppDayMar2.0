import axios from 'axios';
import server from '../../conexiones/conexiones.jsx';

const cloudinaryServices = async () => {
	try {
		const { data } = await axios.get(`${server.api.baseURL}cloudinary`, {
			withCredentials: true,
		});
		return data;
	} catch (error) {
		console.log(error);
	}
};

export default cloudinaryServices;
