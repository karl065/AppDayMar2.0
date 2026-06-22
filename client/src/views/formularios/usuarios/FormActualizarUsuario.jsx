// src/views/paneles/admin/formularios/usuarios/FormActualizarUsuario.jsx
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import SelectorUbicacion from '../../../helpers/SelectorUbicacion.jsx';

const FormularioActualizarUsuario = ({ usuario, onSubmit, onClose }) => {
	const { roles } = useSelector((state) => state.roles);

	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			nombre: usuario?.nombre || '',
			apellido: usuario?.apellido || '',
			email: usuario?.email || '',
			password: '', // Iniciamos vacío, si se queda así no la enviamos
			celular: usuario?.celular || '',
			rol: usuario?.rol?._id || usuario?.rol || '',
			departamento: usuario?.departamento || '',
			ciudad: usuario?.ciudad || '',
			direccion: usuario?.direccion || '',
		},
		validationSchema: Yup.object({
			nombre: Yup.string().required('Obligatorio'),
			email: Yup.string().email('Email inválido').required('Obligatorio'),
			rol: Yup.string().required('Selecciona un rol'),
			departamento: Yup.string().required('Departamento requerido'),
			ciudad: Yup.string().required('Ciudad requerida'),
			direccion: Yup.string().required('Dirección requerida'),
			// Contraseña opcional en actualización
			password: Yup.string()
				.min(6, 'Mínimo 6 caracteres')
				.nullable()
				.optional(),
		}),
		onSubmit: (values) => {
			// 🔥 Lógica: Si password está vacío, lo eliminamos antes de enviar
			const dataToSubmit = { ...values };
			if (!dataToSubmit.password) {
				delete dataToSubmit.password;
			}

			onSubmit(dataToSubmit);
			onClose();
		},
	});

	return (
		<form
			onSubmit={formik.handleSubmit}
			className="space-y-4 max-h-[80vh] overflow-y-auto p-2">
			<div className="grid grid-cols-2 gap-2">
				<input
					name="nombre"
					value={formik.values.nombre}
					onChange={formik.handleChange}
					placeholder="Nombre"
					className="w-full p-2 border rounded"
				/>
				<input
					name="apellido"
					value={formik.values.apellido}
					onChange={formik.handleChange}
					placeholder="Apellido"
					className="w-full p-2 border rounded"
				/>
			</div>

			<input
				name="email"
				value={formik.values.email}
				onChange={formik.handleChange}
				placeholder="Email"
				className="w-full p-2 border rounded"
			/>

			{/* 🔥 Campo de Contraseña nuevo */}
			<input
				name="password"
				type="password"
				placeholder="Nueva Contraseña (dejar vacío para no cambiar)"
				onChange={formik.handleChange}
				value={formik.values.password}
				className="w-full p-2 border rounded"
			/>
			{formik.errors.password && (
				<div className="text-red-500 text-xs">{formik.errors.password}</div>
			)}

			<input
				name="celular"
				type="number"
				value={formik.values.celular}
				onChange={formik.handleChange}
				placeholder="Celular"
				className="w-full p-2 border rounded"
			/>

			<div className="border p-3 rounded bg-gray-50">
				<p className="text-sm font-bold mb-2 text-vivero-dark">Ubicación</p>
				<SelectorUbicacion
					initialData={{
						departamento: formik.values.departamento,
						ciudad: formik.values.ciudad,
					}}
					onChange={(u) => {
						formik.setFieldValue('departamento', u.departamento);
						formik.setFieldValue('ciudad', u.ciudad);
					}}
				/>
				<input
					name="direccion"
					value={formik.values.direccion}
					onChange={formik.handleChange}
					placeholder="Dirección exacta"
					className="w-full p-2 border rounded mt-3"
				/>
			</div>

			<select
				name="rol"
				value={formik.values.rol}
				onChange={formik.handleChange}
				className="w-full p-2 border rounded">
				<option value="">Seleccione Rol</option>
				{roles?.map((r) => (
					<option key={r._id} value={r._id}>
						{r.nombre}
					</option>
				))}
			</select>

			<button
				type="submit"
				className="w-full bg-vivero-dark text-vivero-gold py-2 rounded font-bold hover:scale-[1.02] transition-all">
				Actualizar Usuario
			</button>
		</form>
	);
};

export default FormularioActualizarUsuario;
