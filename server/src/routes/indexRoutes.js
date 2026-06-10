import { Router } from 'express';

import roles from './routesRoles/routesRoles.js';
import usuarios from './routesUsuarios/routesUsuarios.js';
import productos from './routesProductos/routesProductos.js';
import categorias from './routesCategorias/routesCategorias.js';
import tipos from './routesTipos/routesTipos.js';
import auth from './rutasAuth/rutasAuth.js';
import CloudinaryRoutesWidget from './CloudinaryRoutes/CloudinaryRoutesWidget.js';

const router = Router();

// Rutas de administración y usuarios
router.use('/roles', roles);
router.use('/usuarios', usuarios);
router.use('/auth', auth);

// Rutas de inventario y negocio
router.use('/productos', productos);
router.use('/categorias', categorias);
router.use('/tipos', tipos);

// Servicios externos
router.use('/cloudinary', CloudinaryRoutesWidget);

export default router;
