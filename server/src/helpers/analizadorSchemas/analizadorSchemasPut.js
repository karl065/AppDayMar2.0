import mongoose from 'mongoose';

const analizarEsquemaPut = (ModeloPrincipal) => {
	try {
		const config = { arraysRelacionales: [], referenciasPadre: [] };
		const nombrePrincipal = ModeloPrincipal.modelName;

		// Obtenemos la conexión específica de este modelo
		const db = ModeloPrincipal.db;

		for (const [key, path] of Object.entries(ModeloPrincipal.schema.paths)) {
			if (path.instance === 'Array' && path.caster?.options?.ref) {
				config.arraysRelacionales.push(key);
			}

			if (path.instance === 'ObjectID' && path.options?.ref) {
				const nombrePadre = path.options.ref;
				const ModeloPadre = db.model(nombrePadre); // Usamos db.model aquí

				let campoArrayPadre = null;
				for (const [pKey, pPath] of Object.entries(ModeloPadre.schema.paths)) {
					if (
						pPath.instance === 'Array' &&
						pPath.caster?.options?.ref === nombrePrincipal
					) {
						campoArrayPadre = pKey;
						break;
					}
				}

				if (campoArrayPadre) {
					config.referenciasPadre.push({
						campoLocal: key,
						modeloPadre: ModeloPadre,
						campoArrayPadre: campoArrayPadre,
					});
				}
			}
		}
		return config;
	} catch (error) {
		console.log(error);
	}
};
export default analizarEsquemaPut;
