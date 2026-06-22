// src/views/paneles/admin/formularios/roles/FormularioCrearRol.jsx
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { crearRolesAction } from './../../../redux/roles/actions/crearRolesAction.jsx';
import { alertError, alertSuccess } from '../../../helpers/alertas.jsx';
import { useDispatch } from 'react-redux';

const FormularioCrearRol = ({ onClose }) => {
	const dispatch = useDispatch();

	const formik = useFormik({
		initialValues: { nombre: '', descripcion: '' },
		validationSchema: Yup.object({
			nombre: Yup.string().required('Obligatorio'),
			descripcion: Yup.string().required('Obligatorio'),
		}),
		onSubmit: async (values) => {
			try {
				// Aquí activamos la acción de creación directamente
				await crearRolesAction(dispatch, values);
				alertSuccess('Rol creado exitosamente');
				onClose();
			} catch (error) {
				alertError(error.message);
			}
		},
	});

	return (
		<form onSubmit={formik.handleSubmit} className="space-y-4">
			<div>
				<label className="block text-sm font-bold text-vivero-dark">
					Nombre
				</label>
				<input
					name="nombre"
					value={formik.values.nombre}
					onChange={formik.handleChange}
					className="w-full p-2 border rounded"
				/>
			</div>
			<div>
				<label className="block text-sm font-bold text-vivero-dark">
					Descripción
				</label>
				<textarea
					name="descripcion"
					value={formik.values.descripcion}
					onChange={formik.handleChange}
					className="w-full p-2 border rounded"
				/>
			</div>
			<button
				type="submit"
				className="w-full bg-vivero-dark text-vivero-gold py-2 rounded font-bold">
				Crear Rol
			</button>
		</form>
	);
};
export default FormularioCrearRol;
