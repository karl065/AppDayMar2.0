import Productos from '../../models/Productos.js';
import filtroAvanzado from './../../helpers/filtros/filtroAvanzado.js';

const getControllerProductos = async (query) => {
	try {
		if (query.obtenerEstados) {
			const estadosEnum = await Productos.schema.path('estado').enumValues;
			return estadosEnum;
		}

		const filtro = filtroAvanzado(query, Productos.schema);

		const productos = await Productos.find(
			Object.keys(filtro).length > 0 ? filtro : {},
		)
			.populate({
				path: 'subCategoria',
				populate: {
					path: 'categoria', // Esto llena el objeto 'tipo' dentro de 'categoria'
					model: 'Categorias', // Asegúrate de usar el nombre correcto de tu modelo
					populate: {
						path: 'tipo',
						model: 'Tipos', // Asegúrate de usar el nombre correcto de tu modelo
					},
				},
			})
			.populate('usuario');

		return productos;
	} catch (error) {
		throw error;
	}
};

export default getControllerProductos;
