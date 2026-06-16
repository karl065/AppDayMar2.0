const putGeneral = async (Modelo, id, dataUpdate, config) => {
	const docViejo = await Modelo.findById(id);
	if (!docViejo) throw new Error('El documento no existe');

	const updateQuery = { $set: {}, $addToSet: {} };

	for (const [key, value] of Object.entries(dataUpdate)) {
		// A. Si el valor YA viene con operadores ($addToSet)
		if (
			typeof value === 'object' &&
			value !== null &&
			Object.keys(value).some((k) => k.startsWith('$'))
		) {
			for (const [operador, subVal] of Object.entries(value)) {
				updateQuery[operador] = { ...(updateQuery[operador] || {}), ...subVal };
			}
		}
		// B. Si es un array relacional configurado (inyectamos el valor)
		else if (config.arraysRelacionales.includes(key)) {
			updateQuery.$addToSet[key] = value;
		}
		// C. Campo normal o ID simple
		else {
			updateQuery.$set[key] = value;
		}
	}

	// 3. Bidireccionalidad (referencias padre)
	for (const ref of config.referenciasPadre) {
		const idViejoPadre = docViejo[ref.campoLocal]?.toString();
		const idNuevoPadre = updateQuery.$set[ref.campoLocal]?.toString();
		if (idNuevoPadre && idViejoPadre !== idNuevoPadre) {
			if (idViejoPadre)
				await ref.modeloPadre.findByIdAndUpdate(idViejoPadre, {
					$pull: { [ref.campoArrayPadre]: id },
				});
			await ref.modeloPadre.findByIdAndUpdate(idNuevoPadre, {
				$addToSet: { [ref.campoArrayPadre]: id },
			});
		}
	}

	// 4. Limpieza de operadores vacíos
	if (Object.keys(updateQuery.$set).length === 0) delete updateQuery.$set;
	if (Object.keys(updateQuery.$addToSet).length === 0)
		delete updateQuery.$addToSet;

	return await Modelo.findByIdAndUpdate(id, updateQuery, { new: true });
};

export default putGeneral;
