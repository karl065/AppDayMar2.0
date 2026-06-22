import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { actualizarCotizacionesAction } from '../../../redux/cotizaciones/actions/actualizarCotizacionesAction.jsx';
import { alertError, alertSuccess } from '../../../helpers/alertas.jsx';

const RespuestaCotizacionForm = ({ cotizacion, onClose }) => {
	const dispatch = useDispatch();

	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			productos: cotizacion.productos.map((p) => ({
				...p,
				precioUnitario: p.precioUnitario || 0,
			})),
			notasAdmin: cotizacion.notasAdmin || '',
		},
		onSubmit: async (values) => {
			try {
				const totalCalculado = values.productos.reduce(
					(acc, p) => acc + p.precioUnitario * p.cantidad,
					0,
				);

				const dataActualizada = {
					...values,
					total: totalCalculado,
					estado: 'respondida',
				};

				await actualizarCotizacionesAction(
					dispatch,
					cotizacion._id,
					dataActualizada,
				);

				// Emojis
				const ePlanta = '🌿';
				const eDinero = '💰';
				const eLista = '📋';
				const eCheck = '✅';

				const celularCliente = cotizacion.usuario
					? cotizacion.usuario.celular
					: cotizacion.cliente.celular;
				const nombreCliente = cotizacion.usuario
					? cotizacion.usuario.nombre
					: cotizacion.cliente.nombre;

				const mensaje =
					`${ePlanta} *Respuesta de Cotización - Vivero Daymar* ${ePlanta}\n\n` +
					`Hola ${nombreCliente}, ${eCheck} hemos procesado tu solicitud.\n\n` +
					`${eLista} *Resumen Final:*\n` +
					cotizacion.productos
						.map(
							(p) =>
								`• ${p.producto.nombre} (x${p.cantidad}): $${(p.precioUnitario * p.cantidad).toLocaleString()}`,
						)
						.join('\n') +
					`\n\nTotal de la cotización: ${eDinero} *$${totalCalculado.toLocaleString()}*\n\n` +
					(values.notasAdmin ? `*Notas:* ${values.notasAdmin}\n\n` : '') +
					`Puedes consultar el detalle en nuestra plataforma.`;

				window.open(
					`https://api.whatsapp.com/send?phone=57${celularCliente}&text=${encodeURIComponent(mensaje)}`,
					'_blank',
				);

				alertSuccess('Cotización respondida y enviada a WhatsApp');
				onClose();
			} catch (error) {
				console.error(error);
				alertError('Error al actualizar la cotización');
			}
		},
	});

	const handleCambiarEstado = async (nuevoEstado) => {
		try {
			await actualizarCotizacionesAction(dispatch, cotizacion._id, {
				...formik.values,
				total: totalActual,
				estado: nuevoEstado,
			});
			alertSuccess(`Cotización ${nuevoEstado} correctamente`);
			onClose();
		} catch (error) {
			console.error(error);
			alertError('Error al actualizar estado');
		}
	};

	const totalActual = formik.values.productos.reduce(
		(acc, p) => acc + p.precioUnitario * p.cantidad,
		0,
	);

	return (
		<form onSubmit={formik.handleSubmit} className="space-y-4 p-4">
			<div className="space-y-3">
				{formik.values.productos.map((p, index) => (
					<div key={index} className="flex items-center gap-3 border-b pb-3">
						<div className="flex-1">
							<p className="font-bold text-sm text-vivero-dark">
								{p.producto?.nombre}
							</p>
							<p className="text-xs text-gray-500">
								Cantidad: <span className="font-bold">{p.cantidad}</span> | Ref:
								${p.producto?.precio?.toLocaleString()}
							</p>
						</div>

						<div className="flex flex-col items-end">
							<input
								type="number"
								name={`productos.${index}.precioUnitario`}
								value={p.precioUnitario}
								onChange={formik.handleChange}
								className="w-24 p-1.5 border border-vivero-gold/30 rounded text-sm text-right"
								placeholder="Precio unit."
							/>
							<span className="text-xs text-vivero-gold font-bold mt-1">
								Sub: ${(p.precioUnitario * p.cantidad).toLocaleString()}
							</span>
						</div>
					</div>
				))}
			</div>

			<div className="flex justify-between items-center bg-vivero-gold/10 p-3 rounded-lg">
				<span className="font-bold text-vivero-dark">Total Cotización:</span>
				<span className="text-lg font-bold text-vivero-dark">
					${totalActual.toLocaleString()}
				</span>
			</div>

			<textarea
				name="notasAdmin"
				value={formik.values.notasAdmin}
				onChange={formik.handleChange}
				placeholder="Notas para el cliente..."
				className="w-full p-2 border border-vivero-gold/30 rounded"
				rows="2"
			/>

			<div className="grid grid-cols-2 gap-2">
				<button
					type="submit"
					className="col-span-2 bg-vivero-gold text-vivero-dark py-3 rounded-full font-bold hover:bg-vivero-accent transition-all">
					Enviar Respuesta y WhatsApp 🌿
				</button>

				{cotizacion.estado === 'respondida' && (
					<>
						<button
							type="button"
							onClick={() => handleCambiarEstado('aprobada')}
							className="bg-green-600 text-white py-2 rounded-lg font-bold hover:bg-green-700">
							Aprobar ✅
						</button>
						<button
							type="button"
							onClick={() => handleCambiarEstado('rechazada')}
							className="bg-red-600 text-white py-2 rounded-lg font-bold hover:bg-red-700">
							Rechazar ❌
						</button>
					</>
				)}
			</div>
		</form>
	);
};

export default RespuestaCotizacionForm;
