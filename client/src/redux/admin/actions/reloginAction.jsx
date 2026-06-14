// src/redux/admin/actions/reloginAction.jsx
import { alertInfo } from '../../../helpers/alertas.jsx';
import reloginServices from '../../../services/auth/reloginServices.jsx';
import { setLogin } from '../slices/loginSlice.jsx';

// Volvemos a recibir 'navigate'
export const reloginAction = async (dispatch, navigate) => {
	try {
		const data = await reloginServices();

		if (data === 'Token no valido') throw new Error(data);

		dispatch(setLogin(data));

		const rolUsuario = data.rol?.nombre || data.rol;

		// ✅ El truco maestro: Solo redirigimos si están en la página principal.
		// Así evitamos sacarlos del panel si recargan estando en otra vista.
		if (window.location.pathname === '/') {
			if (rolUsuario === 'Administrador' || rolUsuario === 'SuperAdmin') {
				navigate('/admin');
			}
		}

		return true;
	} catch (error) {
		if (
			error.message === 'Token no válido' ||
			error.message === 'Token expirado'
		) {
			alertInfo('Sesión expirada, por favor inicie sesión nuevamente');
			localStorage.removeItem('hasSession');
		}

		return false;
	}
};
