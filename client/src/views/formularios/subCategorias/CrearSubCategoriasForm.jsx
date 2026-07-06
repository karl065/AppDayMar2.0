// src/views/formularios/subCategorias/CrearSubCategoriasForm.jsx

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { alertError, alertSuccess } from '../../../helpers/alertas.jsx';
import { crearSubCategoriaAction } from '../../../redux/subCategorias/actions/crearSubCategoriaAction.jsx';

const FormularioCrearSubCategorias = ({ onClose }) => {
	const dispatch = useDispatch();

	const { categorias } = useSelector((state) => state.categorias);
	const { login } = useSelector((state) => state.login);

	const formik = useFormik({
		initialValues: {
			nombre: '',
			categoria: '',
			descripcion: '',
		},

		validationSchema: Yup.object({
			nombre: Yup.string().required('El nombre es obligatorio'),
			categoria: Yup.string().required('Selecciona una categoría'),
			descripcion: Yup.string().required('La descripción es obligatoria'),
		}),

		onSubmit: async (values) => {
			try {
				const subCategoriaData = {
					...values,
					usuario: login?.usuario?._id || login?._id,
				};

				await crearSubCategoriaAction(dispatch, subCategoriaData);

				alertSuccess('Subcategoría creada exitosamente');

				onClose();
			} catch (error) {
				console.error(error);
				alertError('Error al crear la subcategoría');
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
					onBlur={formik.handleBlur}
					className="w-full p-2 border border-vivero-gold/30 rounded bg-white"
				/>

				{formik.touched.nombre && formik.errors.nombre && (
					<p className="text-red-500 text-xs">{formik.errors.nombre}</p>
				)}
			</div>

			{/* Categoría */}
			<div>
				<label className="block text-sm font-bold text-vivero-dark">
					Categoría
				</label>

				<select
					name="categoria"
					value={formik.values.categoria}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					className="w-full p-2 border border-vivero-gold/30 rounded bg-white">
					<option value="">-- Seleccione una categoría --</option>

					{categorias.map((categoria) => (
						<option key={categoria._id} value={categoria._id}>
							{categoria.nombre}
						</option>
					))}
				</select>

				{formik.touched.categoria && formik.errors.categoria && (
					<p className="text-red-500 text-xs">{formik.errors.categoria}</p>
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
					onBlur={formik.handleBlur}
					rows="3"
					className="w-full p-2 border border-vivero-gold/30 rounded bg-white"
				/>

				{formik.touched.descripcion && formik.errors.descripcion && (
					<p className="text-red-500 text-xs">{formik.errors.descripcion}</p>
				)}
			</div>

			<button
				type="submit"
				className="w-full bg-vivero-dark text-vivero-gold py-2 rounded font-bold hover:bg-vivero-accent transition-all">
				Registrar Subcategoría
			</button>
		</form>
	);
};

export default FormularioCrearSubCategorias;
