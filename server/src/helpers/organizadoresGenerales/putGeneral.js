const putGeneral = async (Modelo, id, dataUpdate, config) => {
	// 1. Obtenemos el documento viejo para comparar si algo cambió de lugar
	const docViejo = await Modelo.findById(id);
	if (!docViejo) throw new Error('El documento no existe');

	const updateQuery = { $set: {}, $addToSet: {} };

	// 2. Procesamos el payload que envió el frontend
	for (const [key, value] of Object.entries(dataUpdate)) {
		// Si el campo es un Array Relacional (Ej: inyectando un producto a una categoría)
		if (config.arraysRelacionales.includes(key)) {
			if (Array.isArray(value)) {
				updateQuery.$set[key] = value; // Si mandan un array completo, lo reemplazamos
			} else {
				updateQuery.$addToSet[key] = value; // Si mandan un solo ID, lo inyectamos sin duplicar
			}
		}
		// Si es un campo normal de texto/número o un ID de referencia simple
		else {
			updateQuery.$set[key] = value;
		}
	}

	// 3. MAGIA BIDIRECCIONAL: Actualizar los arrays de los modelos padre
	for (const ref of config.referenciasPadre) {
		const idViejoPadre = docViejo[ref.campoLocal]?.toString();
		const idNuevoPadre = updateQuery.$set[ref.campoLocal]?.toString();

		// Si se envió un nuevo padre y es diferente al que ya tenía
		if (idNuevoPadre && idViejoPadre !== idNuevoPadre) {
			// Sacamos este documento del array del padre viejo
			if (idViejoPadre) {
				await ref.modeloPadre.findByIdAndUpdate(idViejoPadre, {
					$pull: { [ref.campoArrayPadre]: id },
				});
			}

			// Inyectamos este documento en el array del padre nuevo
			await ref.modeloPadre.findByIdAndUpdate(idNuevoPadre, {
				$addToSet: { [ref.campoArrayPadre]: id },
			});
		}
	}

	// 4. Limpiamos operadores vacíos de Mongoose para evitar errores
	if (Object.keys(updateQuery.$set).length === 0) delete updateQuery.$set;
	if (Object.keys(updateQuery.$addToSet).length === 0)
		delete updateQuery.$addToSet;

	// 5. Ejecutamos la actualización principal
	const docActualizado = await Modelo.findByIdAndUpdate(id, updateQuery, {
		new: true,
	});

	return docActualizado;
};

export default putGeneral;
