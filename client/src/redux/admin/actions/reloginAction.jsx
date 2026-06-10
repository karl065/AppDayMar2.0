import { alertInfo, alertSuccess } from '../../../helpers/alertas.jsx';
import reloginServices from '../../../services/auth/reloginServices.jsx';
import { setLogin } from '../slices/loginSlice.jsx';

// 👉 Se recibe dispatch y navigate
export const reloginAction = async (dispatch, navigate) => {
	try {
		const data = await reloginServices();

		if (data === 'Token no valido') throw new Error(data);

		dispatch(setLogin(data));

		alertSuccess(`Bienvenido de nuevo: ${data.nombre}`);

		data.role === 'Mesero' ? navigate('/caja') : navigate('/admin');

		return true;
	} catch (error) {
		if (
			error.message === 'Token no válido' ||
			error.message === 'Token expirado'
		)
			alertInfo('Sesion expirada, por favor inicie sesion nuevamente');

		// ⚠️ Si falla → redirecciona al login
		if (navigate) navigate('/');

		return false;
	}
};
