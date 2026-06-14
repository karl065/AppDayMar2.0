import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { actualizarTiposAction } from '../../../redux/tipos/actions/actualizarTiposAction.jsx';
import { alertSuccess } from '../../../helpers/alertas.jsx';

const FormularioEditarTipo = ({ tipo, onClose }) => {
	const dispatch = useDispatch();
	const formik = useFormik({
		initialValues: { nombre: tipo?.nombre || '' },
		validationSchema: Yup.object({
			nombre: Yup.string().required('Requerido'),
		}),
		onSubmit: async (values) => {
			await actualizarTiposAction(dispatch, tipo.id, values);
			alertSuccess('Tipo actualizado');
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
			<button
				type="submit"
				className="w-full bg-vivero-dark text-vivero-gold py-2 rounded font-bold">
				Actualizar
			</button>
		</form>
	);
};
export default FormularioEditarTipo;
