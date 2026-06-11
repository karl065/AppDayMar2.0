import ClientLayout from '../../layouts/ClientLayout.jsx';
import Home from '../../views/Home.jsx';

export const clientRoutes = {
	layout: ClientLayout,
	routes: [
		{ path: '/', element: <Home /> },
		// Aquí puedes agregar más rutas de cliente como { path: '/contacto', element: <Contacto /> }
	],
};
