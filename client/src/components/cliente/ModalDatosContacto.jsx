import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { crearCotizacionesAction } from './../../redux/cotizaciones/actions/crearCotizacionesAction.jsx';
import ModalBase from '../ui/Modal.jsx';
import SelectorUbicacion from '../../helpers/SelectorUbicacion.jsx';
import { alertError } from '../../helpers/alertas.jsx';

const ModalDatosContacto = ({
	isOpen,
	onClose,
	cotizacion,
	limpiarCotizacion,
}) => {
	const dispatch = useDispatch();
	const rawLogin = useSelector((state) => state.login.login);

	const login = rawLogin && Object.keys(rawLogin).length > 0 ? rawLogin : null;

	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			nombre: login
				? `${login.nombre || ''} ${login.apellido || ''}`.trim()
				: '',
			celular: login?.celular ? String(login.celular) : '', // Aseguramos que sea string
			direccion: login?.direccion || '',
			departamento: login?.departamento || '',
			ciudad: login?.ciudad || '',
		},
		// 🔥 Validación de celular colombiano
		validate: (values) => {
			const errors = {};
			if (!values.celular) {
				errors.celular = 'El celular es obligatorio';
			} else if (!/^3\d{9}$/.test(values.celular)) {
				errors.celular =
					'Número inválido. Debe tener 10 dígitos y empezar por 3';
			}
			return errors;
		},
		onSubmit: async (values) => {
			try {
				// 1. Preparar datos para el Backend
				const nuevaCotizacion = {
					usuario: login ? login._id : null,
					cliente: login
						? null
						: {
								nombre: values.nombre,
								celular: values.celular,
								direccion: values.direccion,
								departamento: values.departamento,
								ciudad: values.ciudad,
							},
					productos: cotizacion.map((i) => ({
						producto: i.producto._id,
						cantidad: i.cantidad,
					})),
				};

				// 2. Enviar al Backend
				await crearCotizacionesAction(dispatch, nuevaCotizacion);

				// 3. Lógica original de WhatsApp
				const ePlanta = String.fromCodePoint(0x1f33f);
				const eUsuario = String.fromCodePoint(0x1f464);
				const eCelular = String.fromCodePoint(0x1f4f1);
				const ePin = String.fromCodePoint(0x1f4cd);
				const eMundo = String.fromCodePoint(0x1f30e);
				const eLista = String.fromCodePoint(0x1f4cb);

				const lista = cotizacion
					.map((i) => `• ${i.producto.nombre} (x${i.cantidad})`)
					.join('\n');

				const mensaje =
					`${ePlanta} *Nueva Cotización Vivero Daymar* ${ePlanta}\n\n` +
					`${eUsuario} Cliente: ${values.nombre}\n` +
					`${eCelular} Celular: ${values.celular}\n` +
					`${ePin} Dirección: ${values.direccion}\n` +
					`${eMundo} Ubicación: ${values.departamento}, ${values.ciudad}\n\n` +
					`${eLista} *Productos:*\n${lista}`;

				const url = `https://api.whatsapp.com/send?phone=573213509063&text=${encodeURIComponent(mensaje)}`;

				window.open(url, '_blank');
				limpiarCotizacion();
				onClose();
			} catch (error) {
				console.error('Error en el envío:', error);
				alertError('Hubo un error al enviar la cotización.');
			}
		},
	});

	return (
		<ModalBase isOpen={isOpen} onClose={onClose} title="Datos de Contacto">
			<form onSubmit={formik.handleSubmit} className="space-y-3 p-4">
				<div>
					<label className="block text-sm font-bold text-vivero-dark">
						Nombre
					</label>
					<input
						name="nombre"
						type="text"
						value={formik.values.nombre}
						onChange={formik.handleChange}
						className="w-full p-3 border border-vivero-gold/30 rounded-lg"
					/>
				</div>

				<div>
					<label className="block text-sm font-bold text-vivero-dark">
						Celular
					</label>
					<input
						name="celular"
						type="number"
						value={formik.values.celular}
						onChange={formik.handleChange}
						className="w-full p-3 border border-vivero-gold/30 rounded-lg"
					/>
				</div>

				<div className="border p-3 rounded-lg bg-gray-50">
					<label className="block text-sm font-bold text-vivero-dark mb-2">
						Ubicación
					</label>
					<SelectorUbicacion
						key={`${formik.values.departamento}-${formik.values.ciudad}`}
						initialData={{
							departamento: formik.values.departamento,
							ciudad: formik.values.ciudad,
						}}
						onChange={(u) => {
							formik.setFieldValue('departamento', u.departamento);
							formik.setFieldValue('ciudad', u.ciudad);
						}}
					/>
				</div>

				<div>
					<label className="block text-sm font-bold text-vivero-dark">
						Dirección exacta
					</label>
					<input
						name="direccion"
						type="text"
						value={formik.values.direccion}
						onChange={formik.handleChange}
						className="w-full p-3 border border-vivero-gold/30 rounded-lg"
					/>
				</div>

				<button
					type="submit"
					className="w-full bg-vivero-gold text-vivero-dark py-3 rounded-full font-bold hover:bg-vivero-accent transition-all">
					Enviar a WhatsApp 🌿
				</button>
			</form>
		</ModalBase>
	);
};

export default ModalDatosContacto;
