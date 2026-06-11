// Importa aquí tus vistas de admin cuando las crees
// import AdminDashboard from '../views/paneles/admin/Dashboard.jsx';

import { clientRoutes } from './clientRoutes/clientRoutes.jsx';

export const allRoutes = {
	// Administrador: {
	// 	layout: AdminLayout,
	// 	routes: [
	// 		{ path: '/admin', element: <div>Dashboard Admin</div> }, // Cambia por tu componente
	// 		// { path: '/admin/productos', element: <Productos /> },
	// 	],
	// },
	// Supervisor: {
	// 	layout: AdminLayout,
	// 	routes: [{ path: '/admin', element: <div>Dashboard Supervisor</div> }],
	// },
	Cliente: clientRoutes,
};
