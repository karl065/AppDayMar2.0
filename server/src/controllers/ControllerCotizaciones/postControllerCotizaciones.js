import Cotizaciones from '../../models/Cotizaciones.js';
import Productos from './../../models/Productos.js';
import Usuarios from './../../models/Usuarios.js';

const postControllerCotizaciones = async (cotizacionData) => {
	try {
		// 1. Crear la cotización
		const cotizacionConEstado = {
			...cotizacionData,
			estado: 'pendiente',
			productos: cotizacionData.productos.map((p) => ({
				...p,
				disponibilidad: 'pendiente',
				precioUnitario: 0,
			})),
			total: 0,
		};

		const cotizacionNueva = await Cotizaciones.create(cotizacionConEstado);

		// 2. Actualizar Usuario: Push de la cotización si el usuario es registrado
		if (cotizacionData.usuario) {
			await Usuarios.findByIdAndUpdate(cotizacionData.usuario, {
				$push: { cotizaciones: cotizacionNueva._id },
			});
		}

		// 3. Actualizar Productos: Push de la cotización en cada producto cotizado
		// Usamos Promise.all para actualizar todos los productos concurrentemente
		await Promise.all(
			cotizacionData.productos.map(async (item) => {
				await Productos.findByIdAndUpdate(item.producto, {
					$push: { cotizaciones: cotizacionNueva._id },
				});
			}),
		);

		// 4. Obtener registro final poblado
		const cotizacionCompleta = await Cotizaciones.findById(cotizacionNueva._id)
			.populate('usuario')
			.populate('productos.producto');

		const cotizacionFinal = cotizacionCompleta.toObject();
		if (cotizacionFinal.usuario && cotizacionFinal.usuario.password) {
			delete cotizacionFinal.usuario.password;
		}

		return cotizacionFinal;
	} catch (error) {
		console.log(error);
		throw error;
	}
};

export default postControllerCotizaciones;
