import { Router } from 'express';

import roles from './routesRoles/routesRoles.js';
import usuarios from './routesUsuarios/routesUsuarios.js';
import CloudinaryRoutesWidget from './CloudinaryRoutes/CloudinaryRoutesWidget.js';

const router = Router();

router.use('/roles', roles);
router.use('/usuarios', usuarios);
router.use('/cloudinary', CloudinaryRoutesWidget);

export default router;
