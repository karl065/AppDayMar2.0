// src/views/paneles/admin/formularios/FormularioCrearCategorias.jsx
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { alertError, alertSuccess } from '../../../helpers/alertas.jsx';
import { crearCategoriaAction } from '../../../redux/categorias/actions/crearCategoriaAction.jsx';

const FormularioCrearCategorias = ({ onClose }) => {
	const dispatch = useDispatch();
	const { tipos } = useSelector((state) => state.tipos);
	const { login } = useSelector((state) => state.login);

	const formik = useFormik({
		initialValues: {
			nombre: '',
			tipo: '',
			descripcion: '',
		},
		validationSchema: Yup.object({
			nombre: Yup.string().required('El nombre es obligatorio'),
			tipo: Yup.string().required('Selecciona un tipo'),
			descripcion: Yup.string().required('La descripción es obligatoria'),
		}),
		onSubmit: async (values) => {
			try {
				// Añadimos el usuario que crea la categoría
				const categoriaData = {
					...values,
					usuario: login?.usuario?._id || login?._id,
				};
				await crearCategoriaAction(dispatch, categoriaData);
				alertSuccess('Categoría creada exitosamente');
				onClose();
			} catch (error) {
				console.error(error);
				alertError('Error al crear la categoría');
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
				Registrar Categoría
			</button>
		</form>
	);
};

export default FormularioCrearCategorias;
