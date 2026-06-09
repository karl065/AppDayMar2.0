import mongoose from 'mongoose';

const analizarEsquemaPut = (ModeloPrincipal) => {
	const config = { arraysRelacionales: [], referenciasPadre: [] };
	const nombrePrincipal = ModeloPrincipal.modelName;

	for (const [key, path] of Object.entries(ModeloPrincipal.schema.paths)) {
		// 1. Detectar Arrays Propios (Ej: 'productos' en Categorias)
		if (path.instance === 'Array' && path.caster?.options?.ref) {
			config.arraysRelacionales.push(key);
		}

		// 2. Detectar Referencias a Padres (Ej: 'categoria' en Productos)
		if (path.instance === 'ObjectID' && path.options?.ref) {
			const nombrePadre = path.options.ref;
			const ModeloPadre = mongoose.model(nombrePadre);

			// Buscamos cómo se llama el array en el padre que nos apunta
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
					campoLocal: key, // Ej: 'categoria'
					modeloPadre: ModeloPadre, // CategoriasModel
					campoArrayPadre: campoArrayPadre, // Ej: 'productos'
				});
			}
		}
	}
	return config;
};

export default analizarEsquemaPut;
