// src/components/AuthLoader/AuthLoader.jsx
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
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
import { useNavigate } from 'react-router-dom';
import {
	obtenerCiudadesAction,
	obtenerDepartamentosAction,
} from '../../redux/ubicacion/actions/obtenerUbicacionesAction.jsx';

// Ahora recibe 'children' (que será App.jsx)
const AuthLoader = ({ children }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [isReady, setIsReady] = useState(false);

	useEffect(() => {
		const inicializarApp = async () => {
			// 1. Inicializar Sockets
			setAppDispatch(dispatch);
			connectSocket();

			// 2. Disparamos la carga del catálogo público y UBICACIÓN
			// Los hacemos en paralelo para que la carga sea más rápida (Promise.all)
			await Promise.all([
				obtenerTiposAction(dispatch),
				obtenerProductosAction(dispatch),
				obtenerCategoriasAction(dispatch),
				obtenerDepartamentosAction(dispatch),
				obtenerCiudadesAction(dispatch), // <--- Carga inicial
				obtenerRolesAction(dispatch),
			]);

			// 3. Verificamos la sesión
			const hasSession = localStorage.getItem('hasSession');
			if (hasSession === 'true') {
				// Pasamos dispatch y navigate
				const loginExitoso = await reloginAction(dispatch, navigate);

				// Si el token era válido, necesitamos los roles ANTES de pintar App.jsx
				if (loginExitoso) {
					await obtenerRolesAction(dispatch);
					await obtenerUsuariosAction(dispatch);
				}
			}

			// 4. Levantamos el telón: La App ya puede renderizarse
			setIsReady(true);
		};

		inicializarApp();
	}, [dispatch, navigate]);

	// Mientras carga la info, mostramos un loader en lugar de las rutas
	if (!isReady) {
		return (
			<div className="flex items-center justify-center h-screen bg-vivero-light">
				<div className="flex flex-col items-center gap-4 animate-pulse">
					{/* Puedes cambiar esto por el rombo de tu logo luego */}
					<div className="w-16 h-16 border-4 border-vivero-gold border-t-vivero-dark rounded-full animate-spin"></div>
					<h2 className="text-xl font-serif text-vivero-dark font-bold tracking-widest uppercase">
						Cargando Vivero Daymar...
					</h2>
				</div>
			</div>
		);
	}

	// Cuando termina, renderiza la aplicación con todas las rutas y permisos correctos
	return children;
};

export default AuthLoader;
