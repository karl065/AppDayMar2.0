import obtenerTiposServices from '../../../services/tipos/obtenerTiposServices.jsx';
import { cargarTipos } from '../slices/tiposSlices.jsx';

export const obtenerTiposAction = async (dispatch) => {
	try {
		const data = await obtenerTiposServices();

		dispatch(cargarTipos(data));
	} catch (error) {
		console.log(error);
	}
};
