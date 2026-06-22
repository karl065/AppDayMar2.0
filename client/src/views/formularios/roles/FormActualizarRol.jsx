// src/views/paneles/admin/formularios/roles/FormularioActualizarRol.jsx
import { useFormik } from 'formik';
import * as Yup from 'yup';

const FormularioActualizarRol = ({ rol, onSubmit, onClose }) => {
	const formik = useFormik({
		initialValues: {
			nombre: rol?.nombre || '',
			descripcion: rol?.descripcion || '',
		},
		validationSchema: Yup.object({
			nombre: Yup.string().required('Obligatorio'),
			descripcion: Yup.string().required('Obligatorio'),
		}),
		enableReinitialize: true,
		onSubmit: (values) => {
			onSubmit(values);
			onClose();
		},
	});

	return (
		<form onSubmit={formik.handleSubmit} className="space-y-4">
			<input
				name="nombre"
				value={formik.values.nombre}
				onChange={formik.handleChange}
				className="w-full p-2 border rounded"
			/>
			<textarea
				name="descripcion"
				value={formik.values.descripcion}
				onChange={formik.handleChange}
				className="w-full p-2 border rounded"
			/>
			<button
				type="submit"
				className="w-full bg-vivero-dark text-vivero-gold py-2 rounded font-bold">
				Actualizar Rol
			</button>
		</form>
	);
};
export default FormularioActualizarRol;
