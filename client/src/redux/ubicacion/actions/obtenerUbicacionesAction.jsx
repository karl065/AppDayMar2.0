import obtenerCiudadesServices from '../../../services/ubicacion/obtenerCiudadServices.jsx';
import obtenerDepartamentosServices from '../../../services/ubicacion/obtenerDepartamentosServices.jsx';
import {
	guardarCiudades,
	guardarDepartamentos,
} from '../slices/ubicacionSlices.jsx';

export const obtenerDepartamentosAction = async (dispatch) => {
	try {
		const data = await obtenerDepartamentosServices();
		dispatch(guardarDepartamentos(data)); // Guarda en su propio estado
	} catch (error) {
		console.log(error);
	}
};

export const obtenerCiudadesAction = async (dispatch) => {
	try {
		const data = await obtenerCiudadesServices(); // Pasamos el ID
		dispatch(guardarCiudades(data)); // Guarda en su propio estado
	} catch (error) {
		console.log(error);
	}
};
