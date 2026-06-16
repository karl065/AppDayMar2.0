// src/views/paneles/admin/formularios/FormularioEditarCategoria.jsx
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { alertError, alertSuccess } from '../../../helpers/alertas.jsx';
import { actualizarCategoriaAction } from '../../../redux/categorias/actions/actualizarCategoriaAction.jsx';

const FormularioEditarCategoria = ({ categoria, onClose }) => {
	const dispatch = useDispatch();
	const { tipos } = useSelector((state) => state.tipos);

	const formik = useFormik({
		// Precargamos los valores con la categoria recibida
		initialValues: {
			nombre: categoria?.nombre || '',
			tipo: categoria?.tipo?._id || '', // Usamos el ID del tipo para el select
			descripcion: categoria?.descripcion || '',
		},
		validationSchema: Yup.object({
			nombre: Yup.string().required('El nombre es obligatorio'),
			tipo: Yup.string().required('Selecciona un tipo'),
			descripcion: Yup.string().required('La descripción es obligatoria'),
		}),
		onSubmit: async (values) => {
			try {
				await actualizarCategoriaAction(dispatch, categoria.id, values);
				alertSuccess('Categoría actualizada exitosamente');
				onClose();
			} catch (error) {
				console.error(error);
				alertError('Error al actualizar la categoría');
			}
		},
	});

	return (
		<form onSubmit={formik.handleSubmit} className="space-y-4">
			{/* Nombre */}
			<div>
				<label className="block text-sm font-bold text-vivero-dark">
					Nombre
				</label>
				<input
					name="nombre"
					type="text"
					value={formik.values.nombre}
					onChange={formik.handleChange}
					className="w-full p-2 border border-vivero-gold/30 rounded bg-white"
				/>
				{formik.touched.nombre && formik.errors.nombre && (
					<p className="text-red-500 text-xs">{formik.errors.nombre}</p>
				)}
			</div>

			{/* Select Tipo */}
			<div>
				<label className="block text-sm font-bold text-vivero-dark">Tipo</label>
				<select
					name="tipo"
					value={formik.values.tipo}
					onChange={formik.handleChange}
					className="w-full p-2 border border-vivero-gold/30 rounded bg-white">
					<option value="">-- Seleccione un tipo --</option>
					{tipos.map((t) => (
						<option key={t._id} value={t._id}>
							{t.nombre}
						</option>
					))}
				</select>
				{formik.touched.tipo && formik.errors.tipo && (
					<p className="text-red-500 text-xs">{formik.errors.tipo}</p>
				)}
			</div>

			{/* Descripción */}
			<div>
				<label className="block text-sm font-bold text-vivero-dark">
					Descripción
				</label>
				<textarea
					name="descripcion"
					value={formik.values.descripcion}
					onChange={formik.handleChange}
					className="w-full p-2 border border-vivero-gold/30 rounded bg-white"
					rows="3"
				/>
				{formik.touched.descripcion && formik.errors.descripcion && (
					<p className="text-red-500 text-xs">{formik.errors.descripcion}</p>
				)}
			</div>

			<button
				type="submit"
				className="w-full bg-vivero-dark text-vivero-gold py-2 rounded font-bold hover:bg-vivero-accent transition-all">
				Actualizar Categoría
			</button>
		</form>
	);
};

export default FormularioEditarCategoria;
