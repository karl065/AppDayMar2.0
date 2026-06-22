// src/views/paneles/admin/formularios/usuarios/FormularioCrearUsuario.jsx
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import SelectorUbicacion from '../../../helpers/SelectorUbicacion.jsx';
import { crearUsuariosAction } from '../../../redux/admin/actions/crearUsuariosAction.jsx';
import { alertSuccess, alertError } from '../../../helpers/alertas.jsx';

const FormularioCrearUsuario = ({ onClose }) => {
	const dispatch = useDispatch();
	const { roles } = useSelector((state) => state.roles);

	const formik = useFormik({
		initialValues: {
			nombre: '',
			apellido: '',
			email: '',
			password: '',
			celular: '',
			rol: '',
			departamento: '',
			ciudad: '',
			direccion: '',
		},
		validationSchema: Yup.object({
			nombre: Yup.string().required('Obligatorio'),
			apellido: Yup.string().required('Obligatorio'),
			email: Yup.string().email('Email inválido').required('Obligatorio'),
			password: Yup.string()
				.min(6, 'Mínimo 6 caracteres')
				.required('Obligatorio'),
			celular: Yup.string().required('Obligatorio'),
			rol: Yup.string().required('Selecciona un rol'),
			departamento: Yup.string().required('Departamento requerido'),
			ciudad: Yup.string().required('Ciudad requerida'),
			direccion: Yup.string().required('Dirección requerida'),
		}),
		onSubmit: async (values) => {
			try {
				// Aquí activamos la acción de creación directamente
				await crearUsuariosAction(dispatch, values);
				alertSuccess('Usuario creado exitosamente');
				onClose();
			} catch (error) {
				alertError(error.message);
			}
		},
	});

	return (
		<form
			onSubmit={formik.handleSubmit}
			className="space-y-4 max-h-[80vh] overflow-y-auto p-2">
			<div className="grid grid-cols-2 gap-2">
				<input
					name="nombre"
					placeholder="Nombre"
					onChange={formik.handleChange}
					className="p-2 border rounded"
				/>
				<input
					name="apellido"
					placeholder="Apellido"
					onChange={formik.handleChange}
					className="p-2 border rounded"
				/>
			</div>

			<input
				name="email"
				type="email"
				placeholder="Email"
				onChange={formik.handleChange}
				className="w-full p-2 border rounded"
			/>
			<input
				name="password"
				type="password"
				placeholder="Contraseña"
				onChange={formik.handleChange}
				className="w-full p-2 border rounded"
			/>
			<input
				name="celular"
				type="number"
				placeholder="Celular"
				onChange={formik.handleChange}
				className="w-full p-2 border rounded"
			/>

			<div className="border p-3 rounded bg-gray-50">
				<p className="text-sm font-bold mb-2 text-vivero-dark">Ubicación</p>
				<SelectorUbicacion
					onChange={(ubicacion) => {
						formik.setFieldValue('departamento', ubicacion.departamento);
						formik.setFieldValue('ciudad', ubicacion.ciudad);
					}}
				/>
				<input
					name="direccion"
					placeholder="Dirección exacta"
					onChange={formik.handleChange}
					className="w-full p-2 border rounded mt-3"
				/>
			</div>

			<select
				name="rol"
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
				className="w-full bg-vivero-dark text-vivero-gold py-2 rounded font-bold hover:bg-vivero-accent transition-all">
				Crear Usuario
			</button>
		</form>
	);
};

export default FormularioCrearUsuario;
