import PanelAdministrativo from '../../views/paneles/admin/PanelAdministrativo.jsx';

export const adminRoutes = {
	routes: [
		{ path: '/admin', element: <PanelAdministrativo /> },
		// Aquí agregarás más rutas: { path: '/admin/productos', element: <Productos /> }
	],
};
