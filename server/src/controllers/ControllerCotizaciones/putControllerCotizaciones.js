// src/controllers/ControllersCotizaciones/putControllerCotizaciones.js
import Cotizaciones from '../../models/Cotizaciones.js';
import analizarEsquemaPut from '../../helpers/analizadorSchemas/analizadorSchemasPut.js';
import putGeneral from '../../helpers/organizadoresGenerales/PutGeneral.js';

const putControllerCotizaciones = async (updateData, idCotizacion) => {
	try {
		const configPut = analizarEsquemaPut(Cotizaciones);
		if (!idCotizacion) throw new Error('El ID de la cotización es requerido');

		const cotizacionActualizada = await putGeneral(
			Cotizaciones,
			idCotizacion,
			updateData,
			configPut,
		);

		// Poblamos para devolver el objeto completo
		return await Cotizaciones.findById(cotizacionActualizada._id)
			.populate('usuario')
			.populate('productos.producto');
	} catch (error) {
		throw error;
	}
};

export default putControllerCotizaciones;
