import categoriasSocketsListeners from './modulos/categorias/categoriasSocket.jsx';
import cotizacionesSocketsListeners from './modulos/cotizaciones/cotizacionesSocket.jsx';
import productosSocketsListeners from './modulos/productos/productosSocket.jsx';
import rolesSocketsListeners from './modulos/roles/rolesSockets.jsx';
import tiposSocketsListeners from './modulos/tipos/tiposSockets.jsx';
import usuariosSocketsListeners from './modulos/usuarios/usuariosSockets.jsx';
// ... importa otros modulos ...

const registerClientModules = (socket) => {
	productosSocketsListeners(socket);
	usuariosSocketsListeners(socket);
	tiposSocketsListeners(socket);
	categoriasSocketsListeners(socket);
	rolesSocketsListeners(socket);
	cotizacionesSocketsListeners(socket);

	// ... registra otros modulos ...
};

export default registerClientModules;
