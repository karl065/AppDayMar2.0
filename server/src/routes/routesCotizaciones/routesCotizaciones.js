// src/routes/routesCotizaciones/routesCotizaciones.js
import { Router } from 'express';
import postHandlerCotizaciones from '../../handlers/handlerCotizaciones/postHandlerCotizaciones.js';
import getHandlerCotizaciones from '../../handlers/handlerCotizaciones/getHandlerCotizaciones.js';
import putHandlerCotizaciones from '../../handlers/handlerCotizaciones/putHandlerCotizaciones.js';
import deleteHandlerCotizaciones from '../../handlers/handlerCotizaciones/deleteHandlerCotizaciones.js';

const routesCotizaciones = Router();

// Rutas de Cotizaciones
routesCotizaciones.post('/', postHandlerCotizaciones);
routesCotizaciones.get('/', getHandlerCotizaciones);
routesCotizaciones.put('/:id', putHandlerCotizaciones);
routesCotizaciones.delete('/:id', deleteHandlerCotizaciones);

export default routesCotizaciones;
