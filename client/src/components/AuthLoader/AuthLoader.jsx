/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { reloginAction } from '../../redux/admin/actions/reloginAction.jsx';
import { obtenerUsuariosAction } from './../../redux/admin/actions/obtenerUsuariosAction.jsx';
import { obtenerTiposAction } from './../../redux/tipos/actions/obtenerTiposAction';
import { obtenerProductosAction } from './../../redux/productos/actions/obtenerProductosAction.jsx';
import { obtenerCategoriasAction } from './../../redux/categorias/actions/obtenerCategoriasAction.jsx';
import { obtenerRolesAction } from './../../redux/roles/actions/obtenerRolesAction.jsx';
import {
	connectSocket,
	setAppDispatch,
} from '../../services/sockets/socketServices.jsx';

const AuthLoader = () => {
	const dispatch = useDispatch();
	const login = useSelector((state) => state.login.login);

	// 1️⃣ CARGA INICIAL (Pública)
	useEffect(() => {
		// Inicializar Sockets (Soporta invitados y admins)
		setAppDispatch(dispatch);
		connectSocket();

		// Cargar Catálogo (Visible para todos)
		obtenerTiposAction(dispatch);
		obtenerProductosAction(dispatch);
		obtenerCategoriasAction(dispatch);

		// 🔥 LA MAGIA DE LA OPTIMIZACIÓN 🔥
		// Solo intentamos verificar la sesión si el navegador tiene la bandera
		const hasSession = localStorage.getItem('hasSession');
		if (hasSession === 'true') {
			reloginAction(dispatch);
		}
	}, []);

	// 2️⃣ CARGA PRIVADA (Solo si la sesión fue validada con éxito)
	useEffect(() => {
		// Si Redux tiene el id del usuario, significa que el reloginAction funcionó
		if (login && login.id) {
			obtenerUsuariosAction(dispatch);
			obtenerRolesAction(dispatch);
		}
	}, [login]);

	return null; // Componente invisible
};

export default AuthLoader;
