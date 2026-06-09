import mongoose from 'mongoose';

const analizarEsquemaDelete = (ModeloPrincipal) => {
	const config = { padres: [], arraysAMover: [], hijos: [] };
	const nombrePrincipal = ModeloPrincipal.modelName;

	for (const [key, path] of Object.entries(ModeloPrincipal.schema.paths)) {
		// ==========================================
		// 1. DETECTAR PADRES (Campos ObjectID -> ref)
		// ==========================================
		if (path.instance === 'ObjectID' && path.options?.ref) {
			const nombrePadre = path.options.ref;
			const ModeloPadre = mongoose.model(nombrePadre);

			// Buscamos TODOS los arrays en el padre que apunten a este modelo
			for (const [pKey, pPath] of Object.entries(ModeloPadre.schema.paths)) {
				if (
					pPath.instance === 'Array' &&
					pPath.caster?.options?.ref === nombrePrincipal
				) {
					config.padres.push({
						modelo: ModeloPadre,
						campoLocal: key,
						campoArrayPadre: pKey, // Guardamos cada coincidencia sin usar 'break'
					});
				}
			}
		}

		// ==========================================
		// 2. DETECTAR HIJOS Y ARRAYS PROPIOS
		// ==========================================
		if (path.instance === 'Array' && path.caster?.options?.ref) {
			const nombreHijo = path.caster.options.ref;
			const ModeloHijo = mongoose.model(nombreHijo);

			// Guardamos este array propio para poblarlo y moverlo
			config.arraysAMover.push(key);

			// Buscamos TODOS los campos en el hijo que apunten de vuelta hacia nosotros
			for (const [hKey, hPath] of Object.entries(ModeloHijo.schema.paths)) {
				if (
					hPath.instance === 'ObjectID' &&
					hPath.options?.ref === nombrePrincipal
				) {
					config.hijos.push({
						modelo: ModeloHijo,
						campoRef: hKey, // Guardamos cada coincidencia sin usar 'break'
					});
				}
			}
		}
	}

	// Eliminamos duplicados en arraysAMover por si acaso
	config.arraysAMover = [...new Set(config.arraysAMover)];

	return config;
};

export default analizarEsquemaDelete;
