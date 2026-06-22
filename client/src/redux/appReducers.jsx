import { combineReducers } from '@reduxjs/toolkit';

// App Slices
import loadingReducer from './app/slices/loadingSlice.jsx';

// admin Slices
import loginReducer from './admin/slices/loginSlice.jsx';
import usuariosReducer from './admin/slices/usuariosSlice.jsx';
import cotizacionesReducer from './cotizaciones/slices/cotizacionesSlices.jsx';

// roles Slices
import rolesReducer from './roles/slices/rolesSlice.jsx';
// productos Slices
import productosReducer from './productos/slices/productosSlice.jsx';

// Categorias Slices
import categoriasReducer from './categorias/slices/categoriasSlice.jsx';

// tipos Slices
import tiposReducer from './tipos/slices/tiposSlices.jsx';

// ubicaciones Slices
import ubicacionReducer from './ubicacion/slices/ubicacionSlices.jsx';

const appReducers = combineReducers({
	// App Reducers
	loading: loadingReducer,

	// admin reducers
	login: loginReducer,
	usuarios: usuariosReducer,
	cotizaciones: cotizacionesReducer,
	// roles reducers
	roles: rolesReducer,

	// Categorias reducers
	categorias: categoriasReducer,

	// productos reducers
	productos: productosReducer,

	// tipos reducers
	tipos: tiposReducer,

	//ubicaciones reducers
	ubicaciones: ubicacionReducer,
});

export default appReducers;
