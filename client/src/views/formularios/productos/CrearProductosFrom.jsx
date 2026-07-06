// src/views/formularios/productos/CrearProductosForm.jsx

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { crearProductosAction } from '../../../redux/productos/actions/crearProductosAction.jsx';
import { alertError, alertSuccess } from '../../../helpers/alertas.jsx';
import CargadorImagen from '../../../components/Admin/CargadorImagen.jsx';

const FormularioCrearProducto = ({ onClose }) => {
	const dispatch = useDispatch();

	const { subCategorias } = useSelector((state) => state.subCategorias);
	const { login } = useSelector((state) => state.login);

	const formik = useFormik({
		initialValues: {
			nombre: '',
			precio: '',
			stock: '',
			subCategoria: '',
			descripcion: '',
			imagen: '',
		},

		validationSchema: Yup.object({
			nombre: Yup.string().required('El nombre es obligatorio'),

			precio: Yup.number()
				.min(0, 'No puede ser negativo')
				.required('El precio es obligatorio'),

			stock: Yup.number()
				.integer()
				.min(0, 'No puede ser negativo')
				.required('El stock es obligatorio'),

			subCategoria: Yup.string().required('Debes seleccionar una subcategoría'),

			descripcion: Yup.string().required('La descripción es obligatoria'),

			imagen: Yup.string().required('Debes subir una imagen'),
		}),

		onSubmit: async (values) => {
			try {
				const dataFinal = {
					...values,
					usuario: login?.usuario?._id || login?._id,
				};

				await crearProductosAction(dispatch, dataFinal);

				alertSuccess('Producto registrado exitosamente');

				onClose();
			} catch (error) {
				console.error(error);
				alertError('Error al crear el producto');
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
					className={`w-full p-2 border rounded bg-white ${
						formik.touched.nombre && formik.errors.nombre
							? 'border-red-500'
							: 'border-vivero-gold/30'
					}`}
				/>

				{formik.touched.nombre && formik.errors.nombre && (
					<p className="text-red-500 text-xs mt-1">{formik.errors.nombre}</p>
				)}
			</div>

			{/* Imagen */}
			<div className="flex flex-col gap-2">
				<label className="block text-sm font-bold text-vivero-dark">
					Imagen del Producto
				</label>

				<CargadorImagen
					onUpload={(url) => formik.setFieldValue('imagen', url)}
				/>

				{formik.values.imagen && (
					<img
						src={formik.values.imagen}
						alt="Preview"
						className="w-20 h-20 object-cover rounded border border-vivero-gold"
					/>
				)}

				{formik.touched.imagen && formik.errors.imagen && (
					<p className="text-red-500 text-xs">{formik.errors.imagen}</p>
				)}
			</div>

			{/* SubCategoría */}
			<div>
				<label className="block text-sm font-bold text-vivero-dark">
					Subcategoría
				</label>

				<select
					name="subCategoria"
					value={formik.values.subCategoria}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					className={`w-full p-2 border rounded bg-white ${
						formik.touched.subCategoria && formik.errors.subCategoria
							? 'border-red-500'
							: 'border-vivero-gold/30'
					}`}>
					<option value="">-- Seleccione una subcategoría --</option>

					{subCategorias.map((s) => (
						<option key={s._id} value={s._id}>
							{`${s.categoria?.tipo?.nombre || ''} / ${
								s.categoria?.nombre || ''
							} / ${s.nombre}`}
						</option>
					))}
				</select>

				{formik.touched.subCategoria && formik.errors.subCategoria && (
					<p className="text-red-500 text-xs mt-1">
						{formik.errors.subCategoria}
					</p>
				)}
			</div>

			{/* Precio y Stock */}
			<div className="grid grid-cols-2 gap-4">
				<div>
					<label className="block text-sm font-bold text-vivero-dark">
						Precio
					</label>

					<input
						name="precio"
						type="number"
						value={formik.values.precio}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						className={`w-full p-2 border rounded bg-white ${
							formik.touched.precio && formik.errors.precio
								? 'border-red-500'
								: 'border-vivero-gold/30'
						}`}
					/>

					{formik.touched.precio && formik.errors.precio && (
						<p className="text-red-500 text-xs mt-1">{formik.errors.precio}</p>
					)}
				</div>

				<div>
					<label className="block text-sm font-bold text-vivero-dark">
						Stock
					</label>

					<input
						name="stock"
						type="number"
						value={formik.values.stock}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						className={`w-full p-2 border rounded bg-white ${
							formik.touched.stock && formik.errors.stock
								? 'border-red-500'
								: 'border-vivero-gold/30'
						}`}
					/>

					{formik.touched.stock && formik.errors.stock && (
						<p className="text-red-500 text-xs mt-1">{formik.errors.stock}</p>
					)}
				</div>
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
					rows="2"
					className={`w-full p-2 border rounded bg-white ${
						formik.touched.descripcion && formik.errors.descripcion
							? 'border-red-500'
							: 'border-vivero-gold/30'
					}`}
				/>

				{formik.touched.descripcion && formik.errors.descripcion && (
					<p className="text-red-500 text-xs mt-1">
						{formik.errors.descripcion}
					</p>
				)}
			</div>

			<button
				type="submit"
				className="w-full bg-vivero-dark text-vivero-gold py-2 rounded font-bold hover:bg-vivero-accent transition-all">
				Registrar Producto
			</button>
		</form>
	);
};

export default FormularioCrearProducto;
