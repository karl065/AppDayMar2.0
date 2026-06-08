import { Router } from 'express';
import HandlerCloudinaryWidget from '../../handlers/HandlerCloudinaryWidget/HandlerCloudinaryWidget';

const router = Router();

router.get('/', HandlerCloudinaryWidget.handlerCloudinaryWidget);
router.post('/', HandlerCloudinaryWidget.handlerDeleteImagen);

export default router;
