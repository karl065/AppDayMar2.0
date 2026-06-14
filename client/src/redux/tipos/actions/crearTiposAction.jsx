import crearTiposServices from '../../../services/tipos/crearTiposServices.jsx';
import { agregarTipo } from '../slices/tiposSlices.jsx';

export const crearTiposAction = async (dispatch, tipo) => {
	try {
		const data = await crearTiposServices(tipo);
		dispatch(agregarTipo(data));
	} catch (error) {
		console.log(error);
	}
};
