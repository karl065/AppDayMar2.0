import { alertInfo, alertSuccess } from '../../../helpers/alertas.jsx';
import { loadingAction } from '../../app/actions/loadingAction.jsx';
import { setLogin } from '../slices/loginSlice.jsx';
import loginServices from '../../../services/auth/loginServices.jsx';
import { emitEvent } from '../../../services/sockets/socketServices.jsx';
import { actualizarUsuario } from '../slices/usuariosSlice.jsx';

export const loginAction = async (userLogin, dispatch, navigate) => {
	try {
		loadingAction(true, dispatch);

		// Petición al backend (solo enviamos correo y password)
		const data = await loginServices(userLogin);

		if (data.loginApproved) {
			// 1️⃣ Guardar la "bandera" en localStorage para no saturar al servidor después
			// El backend nos envía status: true, lo guardamos como texto 'true'
			localStorage.setItem('hasSession', 'true');

			// 2️⃣ Actualizar el estado global en Redux
			dispatch(setLogin(data.usuario));
			dispatch(actualizarUsuario(data.usuario));

			// 3️⃣ Emitir evento al socket para notificar que te conectaste
			// (Eliminé el emit duplicado que tenías en tu código original)
			emitEvent('usuario:login', data.usuario);
			console.log(data);

			// 4️⃣ Navegación (Ajusta los roles según los que vayas a usar)
			if (
				data.usuario.rol.nombre === 'Administrador' ||
				data.usuario.rol.nombre === 'SuperAdmin'
			) {
				navigate('/admin');
			} else {
				navigate('/'); // Ruta por defecto
			}

			alertSuccess(`Bienvenido ${data.usuario.nombre}`);
		}

		loadingAction(false, dispatch);
	} catch (error) {
		// Mejor manejo de errores por si el back devuelve el error estructurado
		const errorMessage = error.response?.data?.error || error.message;
		alertInfo(errorMessage);

		loadingAction(false, dispatch);
	}
};
