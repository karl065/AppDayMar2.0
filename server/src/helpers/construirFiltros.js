const construirFiltros = (queryParams) => {
	const filtros = {};

	for (const campo in queryParams) {
		const valor = queryParams[campo];

		// Si es un objeto con min o max => rango
		if (
			valor &&
			typeof valor === 'object' &&
			('min' in valor || 'max' in valor)
		) {
			const filtroRango = {};
			if (valor.min !== undefined) filtroRango.$gte = parsearValor(valor.min);
			if (valor.max !== undefined) filtroRango.$lte = parsearValor(valor.max);
			filtros[campo] = filtroRango;
			continue;
		}

		// Si es una cadena separada por coma => posible rango
		if (typeof valor === 'string' && valor.includes(',')) {
			const [min, max] = valor.split(',');
			if (!isNaN(min) && !isNaN(max)) {
				filtros[campo] = {
					$gte: parsearValor(min),
					$lte: parsearValor(max),
				};
				continue;
			}
		}

		// Si parece booleano
		if (valor === 'true' || valor === 'false') {
			filtros[campo] = valor === 'true';
			continue;
		}

		// Si es numérico puro
		if (!isNaN(valor)) {
			filtros[campo] = Number(valor);
			continue;
		}

		// Si parece fecha
		if (esFechaValida(valor)) {
			filtros[campo] = new Date(valor);
			continue;
		}

		// Si no es ninguno de los anteriores => texto libre
		filtros[campo] = new RegExp(valor, 'i');
	}

	return filtros;
};

function parsearValor(valor) {
	if (!isNaN(valor)) return Number(valor);
	if (esFechaValida(valor)) return new Date(valor);
	return valor;
}

function esFechaValida(valor) {
	const fecha = new Date(valor);
	return !isNaN(fecha.getTime());
}

export default construirFiltros;
