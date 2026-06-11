// src/App.jsx
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { allRoutes } from './routes/routes.jsx';

const App = () => {
	const { login } = useSelector((state) => state.login);

	// Determinamos el rol: si no hay login, por defecto es 'Cliente' para ver el Home
	const role = login?.usuario?.rol || login?.rol || 'Cliente';

	const config = allRoutes[role];

	// Si el rol no está definido en allRoutes, redirigimos al Home
	if (!config) {
		return (
			<Routes>
				<Route path="*" element={<Navigate to="/" replace />} />
			</Routes>
		);
	}

	const Layout = config.layout;

	return (
		<Routes>
			{/* El Layout envuelve a las rutas correspondientes usando Outlet */}
			<Route element={<Layout />}>
				{config.routes.map((route, i) => (
					<Route key={i} path={route.path} element={route.element} />
				))}

				{/* Ruta comodín: si el cliente entra a una ruta que no existe, va a Home */}
				<Route
					path="*"
					element={
						<Navigate to={role === 'Cliente' ? '/' : '/admin'} replace />
					}
				/>
			</Route>
		</Routes>
	);
};

export default App;
