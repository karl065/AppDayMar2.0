const deleteGeneral = async (docPoblado, idNuevo, config) => {
	const idViejo = docPoblado._id;

	// 1. Limpiar en los Padres
	for (const padre of config.padres) {
		const idPadre = docPoblado[padre.campoLocal]; // Ej: docPoblado.tipo
		if (idPadre) {
			await padre.modelo.findByIdAndUpdate(idPadre, {
				$pull: { [padre.campoArrayPadre]: idViejo },
			});
		}
	}

	// 2. Mover Arrays Internos a la nueva categoría
	if (idNuevo && config.arraysAMover.length > 0) {
		for (const arrayName of config.arraysAMover) {
			const elementos = docPoblado[arrayName];
			if (elementos && elementos.length > 0) {
				const ids = elementos.map((el) => el._id); // Extraemos IDs de los poblados
				await docPoblado.constructor.findByIdAndUpdate(idNuevo, {
					$addToSet: { [arrayName]: { $each: ids } },
				});
			}
		}
	}

	// 3. Reasignar o eliminar en cascada a los Hijos
	for (const hijo of config.hijos) {
		if (idNuevo) {
			await hijo.modelo.updateMany(
				{ [hijo.campoRef]: idViejo },
				{ [hijo.campoRef]: idNuevo },
			);
		} else {
			// Comportamiento por defecto si no hay idNuevo: borrar huérfanos
			await hijo.modelo.deleteMany({ [hijo.campoRef]: idViejo });
		}
	}

	// 4. Eliminar el documento actual
	await docPoblado.deleteOne();

	return docPoblado;
};

export default deleteGeneral;
