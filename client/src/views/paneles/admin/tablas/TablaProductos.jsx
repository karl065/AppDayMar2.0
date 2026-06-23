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
import { useFiltrado } from '../../../../hooks/useFiltrado.jsx';
import FiltroUniversal from '../../../../components/Filtros/FiltroUniversal.jsx';

const TablaProductos = () => {
	const dispatch = useDispatch();
	const { productos } = useSelector((state) => state.productos);

	// 1. Integración del Hook de Filtrado
	const { datosFiltrados, aplicarFiltro, setBusqueda, busqueda, filtros } =
		useFiltrado(productos, [
			'nombre',
			'categoria.nombre',
			'categoria.tipo.nombre',
		]);

	const [modalAbierto, setModalAbierto] = useState(false);
	const [productoSeleccionado, setProductoSeleccionado] = useState(null);

	const columns = [
		{ key: 'info', label: 'Producto' },
		{ key: 'imagen', label: 'Imagen' },
		{ key: 'precio', label: 'Precio' },
		{ key: 'stock', label: 'Stock' },
	];

	// 2. Mapeo de datos usando datosFiltrados
	const data = datosFiltrados.map((prod) => ({
		id: prod._id,
		nombre: prod.nombre,
		precio: prod.precio,
		stock: prod.stock,
		imagen: (
			<img
				src={prod.imagen}
				alt={prod.nombre}
				className="w-12 h-12 object-cover rounded-md border border-vivero-gold/20 shadow-sm"
			/>
		),
		info: (
			<div className="flex flex-col">
				<span className="font-bold text-vivero-gold">{prod.nombre}</span>
				<span className="text-xs text-gray-400">
					{prod.categoria?.nombre || 'Sin categoría'}
				</span>
			</div>
		),
		precio_formato: `$${prod.precio.toLocaleString()}`,
		stock_formato: (
			<span
				className={
					prod.stock < 5 ? 'text-red-400 font-bold' : 'text-green-400'
				}>
				{prod.stock}
			</span>
		),
	}));

	const handleEdit = (row) => {
		const original = productos.find((p) => p._id === row.id);
		setProductoSeleccionado(original);
		setModalAbierto(true);
	};

	const handleDelete = async (row) => {
		const confirmar = await alertConfirm(
			'Eliminar Producto',
			`¿Estás seguro de que deseas eliminar "${row.nombre}"?`,
		);
		if (confirmar) {
			try {
				await eliminarProductosAction(dispatch, row.id);
				alertSuccess('Producto eliminado correctamente');
			} catch (error) {
				console.log(error);
				alertError('Hubo un error al eliminar el producto');
			}
		}
	};

	return (
		<div className="w-full">
			{/* 3. Filtro Universal */}
			<FiltroUniversal
				data={productos}
				busqueda={busqueda}
				onSearch={setBusqueda}
				onFilter={aplicarFiltro}
				filtrosActuales={filtros}
				config={[
					{ label: 'Tipo', key: 'categoria.tipo.nombre' },
					{ label: 'Categoría', key: 'categoria.nombre' },
				]}
			/>

			<div className="p-4 h-[calc(100vh-250px)] overflow-y-auto">
				{datosFiltrados.length > 0 ? (
					<MobileTable
						columns={columns}
						data={data.map((item) => ({
							...item,
							precio: item.precio_formato,
							stock: item.stock_formato,
						}))}
						onEdit={handleEdit}
						onDelete={handleDelete}
					/>
				) : (
					<div className="flex items-center justify-center h-full text-gray-400">
						No se encontraron productos.
					</div>
				)}
			</div>

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
