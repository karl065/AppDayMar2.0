// src/services/ubicacion/obtenerCiudadesServices.jsx
import axios from 'axios';

const obtenerCiudadesServices = async () => {
	try {
		const { data } = await axios.get('https://api-colombia.com/api/v1/City');

		const dataOrdenada = data.sort((a, b) => a.name.localeCompare(b.name));

		return dataOrdenada;
	} catch (error) {
		return error;
	}
};

export default obtenerCiudadesServices;
