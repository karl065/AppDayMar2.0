// src/routes/routes.jsx
// import AdminLayout from '../layouts/AdminLayout.jsx';
import AdminLayout from '../layouts/AdminLayout.jsx';
import ClientLayout from '../layouts/ClientLayout.jsx';
import { adminRoutes } from './adminRoutes/adminRoutes.jsx';
import { clientRoutes } from './clientRoutes/clientRoutes.jsx';
// import ClientLayout from './../layouts/ClientLayout.jsx';

const allRoutes = (login, roles) => {
	// 1. Obtenemos el ID del rol del usuario logueado (si lo hay)
	const userRoleId = login?.usuario?.rol?._id || login?.rol?._id;

	// 2. Buscamos el rol del usuario en la lista global
	const userRoleObj = roles?.find((r) => r._id === userRoleId);

	// 3. Evaluamos si es administrador (cualquier rol distinto a "Cliente")
	const isAdmin = userRoleObj && userRoleObj.nombre !== 'Cliente';

	// 4. Construimos el arreglo dinámico
	// Todos los usuarios (logueados o no) tienen acceso al lado del cliente (Vivero)
	const activeLayouts = [clientRoutes];

	// Si tiene privilegios, inyectamos también el bloque de rutas del panel
	if (isAdmin) {
		activeLayouts.push(adminRoutes);
		activeLayouts.map((layout) => (layout.layout = AdminLayout)); // Asignamos el layout del admin a todas las rutas
	} else {
		activeLayouts.map((layout) => (layout.layout = ClientLayout));
	}

	return activeLayouts;
};

export default allRoutes;
