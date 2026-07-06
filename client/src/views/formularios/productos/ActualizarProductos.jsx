// src/components/admin/productos/ActualizarProducto.jsx

import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { actualizarProductosAction } from '../../../redux/productos/actions/actualizarProductosAction.jsx';
import { alertError, alertSuccess } from '../../../helpers/alertas.jsx';
import CargadorImagen from '../../../components/Admin/CargadorImagen.jsx';

const validationSchema = Yup.object({
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

	imagen: Yup.string().required('El producto debe tener una imagen'),
});

const ActualizarProducto = ({ producto, onClose }) => {
	const dispatch = useDispatch();

	const { subCategorias } = useSelector((state) => state.subCategorias);

	// Si viene populada obtenemos el _id
	const subCategoriaId =
		producto?.subCategoria?._id || producto?.subCategoria || '';

	const formik = useFormik({
		initialValues: {
			nombre: producto?.nombre || '',
			precio: producto?.precio || 0,
			stock: producto?.stock || 0,
			subCategoria: subCategoriaId,
			descripcion: producto?.descripcion || '',
			imagen: producto?.imagen || '',
		},

		enableReinitialize: true,

		validationSchema,

		onSubmit: async (values) => {
			try {
				const idActualizar = producto?._id || producto?.id;

				await actualizarProductosAction(dispatch, idActualizar, values);

				alertSuccess('Producto actualizado correctamente');

				onClose();
			} catch (error) {
				console.error(error);
				alertError('Error al actualizar el producto');
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
					type="text"
					name="nombre"
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
					<div className="text-red-500 text-xs mt-1">
						{formik.errors.nombre}
					</div>
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
					<div className="relative w-20 h-20">
						<img
							src={formik.values.imagen}
							alt="Preview"
							className="w-full h-full object-cover rounded border border-vivero-gold"
						/>
					</div>
				)}

				{formik.touched.imagen && formik.errors.imagen && (
					<div className="text-red-500 text-xs">{formik.errors.imagen}</div>
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
					<div className="text-red-500 text-xs mt-1">
						{formik.errors.subCategoria}
					</div>
				)}
			</div>

			{/* Precio y Stock */}
			<div className="grid grid-cols-2 gap-4">
				<div>
					<label className="block text-sm font-bold text-vivero-dark">
						Precio
					</label>

					<input
						type="number"
						name="precio"
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
						<div className="text-red-500 text-xs mt-1">
							{formik.errors.precio}
						</div>
					)}
				</div>

				<div>
					<label className="block text-sm font-bold text-vivero-dark">
						Stock
					</label>

					<input
						type="number"
						name="stock"
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
						<div className="text-red-500 text-xs mt-1">
							{formik.errors.stock}
						</div>
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
					<div className="text-red-500 text-xs mt-1">
						{formik.errors.descripcion}
					</div>
				)}
			</div>

			<button
				type="submit"
				disabled={formik.isSubmitting}
				className="w-full bg-vivero-dark text-vivero-gold py-2 rounded font-bold hover:bg-vivero-accent transition-all disabled:opacity-50">
				{formik.isSubmitting ? 'Guardando...' : 'Guardar Cambios'}
			</button>
		</form>
	);
};

export default ActualizarProducto;
