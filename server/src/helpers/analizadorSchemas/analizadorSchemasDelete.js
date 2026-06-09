import mongoose from 'mongoose';

const analizarEsquemaDelete = (ModeloPrincipal) => {
	try {
		const config = { padres: [], arraysAMover: [], hijos: [] };
		// USAR EL NOMBRE REAL QUE Mongoose tiene registrado (ej: 'Roles')
		const nombrePrincipal = ModeloPrincipal.modelName;
		const db = ModeloPrincipal.db; // Usar la conexión activa

		for (const [key, path] of Object.entries(ModeloPrincipal.schema.paths)) {
			// 1. DETECTAR PADRES
			if (path.instance === 'ObjectID' && path.options?.ref) {
				const nombrePadre = path.options.ref;
				// Usar db.model para buscar en la conexión correcta
				const ModeloPadre = db.models[nombrePadre] || db.model(nombrePadre);

				for (const [pKey, pPath] of Object.entries(ModeloPadre.schema.paths)) {
					// Comparar contra el nombre real (ej: 'Roles')
					if (
						pPath.instance === 'Array' &&
						pPath.caster?.options?.ref === nombrePrincipal
					) {
						config.padres.push({
							modelo: ModeloPadre,
							campoLocal: key,
							campoArrayPadre: pKey,
						});
					}
				}
			}

			// 2. DETECTAR HIJOS
			if (path.instance === 'Array' && path.caster?.options?.ref) {
				const nombreHijo = path.caster.options.ref;
				const ModeloHijo = db.models[nombreHijo] || db.model(nombreHijo);

				config.arraysAMover.push(key);

				for (const [hKey, hPath] of Object.entries(ModeloHijo.schema.paths)) {
					if (
						hPath.instance === 'ObjectID' &&
						hPath.options?.ref === nombrePrincipal
					) {
						config.hijos.push({ modelo: ModeloHijo, campoRef: hKey });
					}
				}
			}
		}

		config.arraysAMover = [...new Set(config.arraysAMover)];
		return config;
	} catch (error) {
		console.error('Error en analizarEsquemaDelete:', error);
		throw error; // Lanzar para que el controlador lo atrape
	}
};

export default analizarEsquemaDelete;
