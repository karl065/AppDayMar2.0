// src/controllers/ControllersCotizaciones/deleteControllerCotizaciones.js
import Cotizaciones from '../../models/Cotizaciones.js';
import analizarEsquemaDelete from '../../helpers/analizadorSchemas/analizadorSchemasDelete.js';
import deleteGeneral from '../../helpers/organizadoresGenerales/deleteGeneral.js';

const deleteControllerCotizaciones = async (
	idCotizacion,
	idNuevaCotizacion = null,
) => {
	try {
		const configDelete = analizarEsquemaDelete(Cotizaciones);
		if (!idCotizacion) throw new Error('El ID a eliminar es requerido');

		const query = Cotizaciones.findById(idCotizacion);
		configDelete.arraysAMover.forEach((arr) => query.populate(arr));

		const cotizacion = await query.exec();
		if (!cotizacion) throw new Error('La cotización no existe');

		const cotizacionEliminada = await deleteGeneral(
			cotizacion,
			idNuevaCotizacion,
			configDelete,
		);

		return cotizacionEliminada;
	} catch (error) {
		throw error;
	}
};

export default deleteControllerCotizaciones;
