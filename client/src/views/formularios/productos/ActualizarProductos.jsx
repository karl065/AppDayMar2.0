// src/components/admin/productos/ActualizarProducto.jsx
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { actualizarProductosAction } from '../../../redux/productos/actions/actualizarProductosAction.jsx';
import { alertError, alertSuccess } from '../../../helpers/alertas.jsx';

// Esquema de validación con Yup
const validationSchema = Yup.object({
	nombre: Yup.string().required('El nombre es obligatorio'),
	precio: Yup.number()
		.min(0, 'No puede ser negativo')
		.required('El precio es obligatorio'),
	stock: Yup.number()
		.integer()
		.min(0, 'No puede ser negativo')
		.required('El stock es obligatorio'),
});

const ActualizarProducto = ({ producto, onClose }) => {
	const dispatch = useDispatch();

	const formik = useFormik({
		initialValues: {
			nombre: producto?.nombre || '',
			precio: producto?.precio || 0,
			stock: producto?.stock || 0,
		},
		validationSchema,
		onSubmit: async (values) => {
			try {
				await actualizarProductosAction(dispatch, producto.id, values);
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
						className="w-full p-2 border border-vivero-gold/30 rounded bg-white"
					/>
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
						className="w-full p-2 border border-vivero-gold/30 rounded bg-white"
					/>
				</div>
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
