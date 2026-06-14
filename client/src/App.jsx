// src/App.jsx
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import allRoutes from './routes/routes.jsx';

const App = () => {
	// Traemos los estados desde Redux
	const { login } = useSelector((state) => state.login);
	const { roles } = useSelector((state) => state.roles);

	// Obtenemos únicamente los layouts/rutas que este usuario tiene permitidos
	const allowedLayouts = allRoutes(login, roles);

	return (
		<Routes>
			{/* Iteramos sobre los Layouts permitidos (Cliente y/o Admin) */}
			{allowedLayouts.map((config, index) => {
				const Layout = config.layout;

				return (
					<Route key={index} element={<Layout />}>
						{/* Iteramos sobre las rutas internas de ese Layout */}
						{config.routes.map((route, i) => (
							<Route key={i} path={route.path} element={route.element} />
						))}
					</Route>
				);
			})}

			{/* Ruta comodín: Si la URL no existe en ninguno de sus layouts permitidos */}
			<Route path="*" element={<Navigate to="/" replace />} />
		</Routes>
	);
};

export default App;
