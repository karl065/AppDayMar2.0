// src/components/admin/productos/ActualizarProducto.jsx
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { actualizarProductosAction } from '../../../redux/productos/actions/actualizarProductosAction.jsx';
import { alertError, alertSuccess } from '../../../helpers/alertas.jsx';
import CargadorImagen from './../../../components/Admin/CargadorImagen'; // Ajusta la ruta si es necesario

// Esquema de validación unificado
const validationSchema = Yup.object({
	nombre: Yup.string().required('El nombre es obligatorio'),
	precio: Yup.number()
		.min(0, 'No puede ser negativo')
		.required('El precio es obligatorio'),
	stock: Yup.number()
		.integer()
		.min(0, 'No puede ser negativo')
		.required('El stock es obligatorio'),
	categoria: Yup.string().required('Debes seleccionar una categoría'),
	descripcion: Yup.string().required('La descripción es obligatoria'),
	imagen: Yup.string().required('El producto debe tener una imagen'),
});

const ActualizarProducto = ({ producto, onClose }) => {
	const dispatch = useDispatch();
	const { categorias } = useSelector((state) => state.categorias);

	// Si la categoría viene populada (como objeto) extraemos su _id, sino usamos el valor directo
	const categoriaId = producto?.categoria?._id || producto?.categoria || '';

	const formik = useFormik({
		initialValues: {
			nombre: producto?.nombre || '',
			precio: producto?.precio || 0,
			stock: producto?.stock || 0,
			categoria: categoriaId,
			descripcion: producto?.descripcion || '',
			imagen: producto?.imagen || '',
		},
		validationSchema,
		enableReinitialize: true, // Permite que el formulario se actualice si cambia el prop 'producto'
		onSubmit: async (values) => {
			try {
				// Soportamos tanto _id (MongoDB) como id plano
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
			{/* Campo Nombre */}
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

			{/* Imagen del Producto */}
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
					className={`w-full p-2 border rounded bg-white ${
						formik.touched.categoria && formik.errors.categoria
							? 'border-red-500'
							: 'border-vivero-gold/30'
					}`}>
					<option value="">-- Seleccione una categoría --</option>
					{categorias.map((c) => (
						<option key={c._id} value={c._id}>
							{c.nombre}
						</option>
					))}
				</select>
				{formik.touched.categoria && formik.errors.categoria && (
					<div className="text-red-500 text-xs mt-1">
						{formik.errors.categoria}
					</div>
				)}
			</div>

			{/* Campos Precio y Stock */}
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
					className={`w-full p-2 border rounded bg-white ${
						formik.touched.descripcion && formik.errors.descripcion
							? 'border-red-500'
							: 'border-vivero-gold/30'
					}`}
					rows="2"
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
