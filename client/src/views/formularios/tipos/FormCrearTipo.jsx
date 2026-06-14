import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { crearTiposAction } from '../../../redux/tipos/actions/crearTiposAction.jsx';
import { alertSuccess } from '../../../helpers/alertas.jsx';

const FormularioCrearTipo = ({ onClose }) => {
	const dispatch = useDispatch();
	const login = useSelector((state) => state.login.login);
	const formik = useFormik({
		initialValues: { nombre: '' },
		validationSchema: Yup.object({
			nombre: Yup.string().required('Requerido'),
			descripcion: Yup.string().required('Coloca una descripcion'),
		}),
		onSubmit: async (values) => {
			values.usuario = login._id;
			await crearTiposAction(dispatch, values);
			alertSuccess('Tipo creado exitosamente');
			onClose();
		},
	});

	return (
		<form onSubmit={formik.handleSubmit} className="space-y-4">
			<input
				name="nombre"
				placeholder="Nombre del tipo"
				onChange={formik.handleChange}
				className="w-full p-2 border rounded"
			/>
			<input
				name="descripcion"
				placeholder="descripcion"
				onChange={formik.handleChange}
				className="w-full p-2 border rounded"
			/>
			<button
				type="submit"
				className="w-full bg-vivero-dark text-vivero-gold py-2 rounded font-bold">
				Guardar
			</button>
		</form>
	);
};
export default FormularioCrearTipo;
