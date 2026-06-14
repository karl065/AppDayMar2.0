// src/components/admin/productos/TablaProductos.jsx
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import MobileTable from '../../../../components/MobileTable/MobileTable.jsx'; // Ajusta la ruta a tu ModalBase
import {
	alertConfirm,
	alertError,
	alertSuccess,
} from '../../../../helpers/alertas.jsx';
import { eliminarProductosAction } from '../../../../redux/productos/actions/eliminarProductosAction.jsx';
import ModalBase from './../../../../components/ui/Modal.jsx';
import ActualizarProducto from '../../../formularios/productos/ActualizarProductos.jsx';

const TablaProductos = () => {
	const dispatch = useDispatch();
	const { productos } = useSelector((state) => state.productos);

	// Estados para el manejo del modal
	const [modalAbierto, setModalAbierto] = useState(false);
	const [productoSeleccionado, setProductoSeleccionado] = useState(null);

	// 1. Definición de columnas
	const columns = [
		{ key: 'info', label: 'Producto' },
		{ key: 'precio', label: 'Precio' },
		{ key: 'stock', label: 'Stock' },
	];

	// 2. Mapeo de datos para MobileTable
	const data = productos.map((prod) => ({
		id: prod._id, // Importante: mantenemos el id para identificar la fila
		nombre: prod.nombre, // Pasamos el nombre real para que el formulario lo reciba
		precio: prod.precio, // Pasamos el valor numérico para el formulario
		stock: prod.stock, // Pasamos el stock numérico para el formulario
		info: (
			<div className="flex flex-col">
				<span className="font-bold text-vivero-gold">{prod.nombre}</span>
				<span className="text-xs text-gray-400">
					{prod.categoria?.nombre || 'Sin categoría'}
				</span>
			</div>
		),
		precio_formato: `$${prod.precio.toLocaleString()}`, // Usamos este para mostrar
		stock_formato: (
			<span
				className={
					prod.stock < 5 ? 'text-red-400 font-bold' : 'text-green-400'
				}>
				{prod.stock}
			</span>
		),
	}));

	// 3. Handlers para las acciones
	const handleEdit = (row) => {
		setProductoSeleccionado(row); // Guardamos la fila completa con los datos originales
		setModalAbierto(true);
	};

	const handleDelete = async (row) => {
		// 1. Pedimos confirmación antes de proceder
		const confirmar = await alertConfirm(
			'Eliminar Producto',
			`¿Estás seguro de que deseas eliminar "${row.nombre}"? Esta acción no se puede deshacer.`,
		);

		if (confirmar) {
			try {
				// 2. Ejecutamos la acción de Redux
				await eliminarProductosAction(dispatch, row.id);

				// 3. Notificamos al usuario
				alertSuccess('Producto eliminado correctamente');
			} catch (error) {
				console.log(error);
				alertError('Hubo un error al eliminar el producto');
			}
		}
	};

	return (
		<div className="h-[calc(100vh-200px)] w-full">
			{productos.length > 0 ? (
				<MobileTable
					columns={columns}
					data={data.map((item) => ({
						...item,
						precio: item.precio_formato, // Reemplazamos visualmente
						stock: item.stock_formato,
					}))}
					onEdit={handleEdit}
					onDelete={handleDelete}
				/>
			) : (
				<div className="flex items-center justify-center h-full text-gray-400">
					No hay productos registrados.
				</div>
			)}

			{/* Modal de Edición */}
			<ModalBase
				isOpen={modalAbierto}
				onClose={() => setModalAbierto(false)}
				title="Editar Producto">
				{productoSeleccionado && (
					<ActualizarProducto
						producto={productoSeleccionado}
						onClose={() => setModalAbierto(false)}
					/>
				)}
			</ModalBase>
		</div>
	);
};

export default TablaProductos;
