import axios from 'axios';

const obtenerDepartamentosServices = async () => {
	try {
		const { data } = await axios.get(
			'https://api-colombia.com/api/v1/Department',
		);

		// Ordenamos alfabéticamente por la propiedad 'name'
		// localeCompare maneja correctamente tildes y caracteres especiales
		const dataOrdenada = data.sort((a, b) => a.name.localeCompare(b.name));

		return dataOrdenada;
	} catch (error) {
		return error;
	}
};

export default obtenerDepartamentosServices;
