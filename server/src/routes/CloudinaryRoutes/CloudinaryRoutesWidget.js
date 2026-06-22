import { Router } from 'express';
import handlerGetConfig from '../../handlers/HandlerCloudinaryWidget/handlerGetConfig.js';
import handlerSignWidget from '../../handlers/HandlerCloudinaryWidget/handlerSignWidget.js';
import handlerDeleteImagen from '../../handlers/HandlerCloudinaryWidget/handlerDeleteImagen.js';

const router = Router();

// /api/cloudinary/config -> Obtiene cloudName y apiKey
router.get('/config', handlerGetConfig);

// /api/cloudinary/sign -> Genera la firma
router.post('/sign', handlerSignWidget);

// /api/cloudinary/ -> Elimina la imagen
router.post('/', handlerDeleteImagen);

export default router;
