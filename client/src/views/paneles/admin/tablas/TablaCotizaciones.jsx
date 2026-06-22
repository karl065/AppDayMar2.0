// src/components/admin/cotizaciones/TablaCotizaciones.jsx
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import {
	alertConfirm,
	alertError,
	alertSuccess,
} from '../../../../helpers/alertas.jsx';
import { eliminarCotizacionesAction } from '../../../../redux/cotizaciones/actions/eliminarCotizacionesAction.jsx';
import MobileTable from '../../../../components/MobileTable/MobileTable.jsx';
import ModalBase from '../../../../components/ui/Modal.jsx';
import RespuestaCotizacionForm from '../../../formularios/cotizaciones/RespuestaCotizacionForm.jsx';
import ExportadorCotizaciones from '../../../../components/Admin/ExportadorCotizaciones.jsx';

const TablaCotizaciones = () => {
	const dispatch = useDispatch();
	const { cotizaciones } = useSelector((state) => state.cotizaciones);

	const [modalAbierto, setModalAbierto] = useState(false);
	const [cotizacionSeleccionada, setCotizacionSeleccionada] = useState(null);

	// 1. Columnas
	const columns = [
		{ key: 'cliente', label: 'Cliente' },
		{ key: 'productos', label: 'Productos' },
		{ key: 'total', label: 'Total' },
		{ key: 'estado', label: 'Estado' },
	];

	// 2. Mapeo de datos
	const data = cotizaciones.map((c) => ({
		id: c._id,
		cliente: c.usuario
			? `${c.usuario.nombre} ${c.usuario.apellido}`
			: c.cliente.nombre,
		celular: c.usuario ? c.usuario.celular : c.cliente.celular,
		productos: <div className="text-xs">{c.productos.length} items</div>,
		total: `$${c.total.toLocaleString()}`,
		estado: (
			<span
				className={`px-2 py-1 rounded text-xs font-bold ${
					c.estado === 'aprobada'
						? 'bg-green-100 text-green-700'
						: c.estado === 'rechazada'
							? 'bg-red-100 text-red-700'
							: c.estado === 'respondida'
								? 'bg-blue-100 text-blue-700'
								: 'bg-yellow-100 text-yellow-700'
				}`}>
				{c.estado.toUpperCase()}
			</span>
		),
	}));

	// 3. Handlers
	const handleEdit = (row) => {
		const original = cotizaciones.find((c) => c._id === row.id);
		setCotizacionSeleccionada(original);
		setModalAbierto(true);
	};

	const handleDelete = async (row) => {
		const confirmar = await alertConfirm(
			'Eliminar Cotización',
			`¿Estás seguro de eliminar la cotización de "${row.cliente}"?`,
		);

		if (confirmar) {
			try {
				await eliminarCotizacionesAction(dispatch, row.id);
				alertSuccess('Cotización eliminada correctamente');
			} catch (error) {
				alertError('Hubo un error al eliminar');
				console.log(error);
			}
		}
	};
	const renderExtraActions = (row) => {
		const cotizacionOriginal = cotizaciones.find((c) => c._id === row.id);
		return <ExportadorCotizaciones cotizacion={cotizacionOriginal} />;
	};

	return (
		<div className="h-[calc(100vh-200px)] w-full">
			{cotizaciones.length > 0 ? (
				<MobileTable
					columns={columns}
					data={data}
					onEdit={handleEdit}
					onDelete={handleDelete}
					renderActions={renderExtraActions}
				/>
			) : (
				<div className="flex items-center justify-center h-full text-gray-400">
					No hay cotizaciones registradas.
				</div>
			)}

			{/* Modal de Detalle/Edición */}
			<ModalBase
				isOpen={modalAbierto}
				onClose={() => setModalAbierto(false)}
				title="Responder Cotización">
				{cotizacionSeleccionada && (
					<RespuestaCotizacionForm
						cotizacion={cotizacionSeleccionada}
						onClose={() => setModalAbierto(false)}
					/>
				)}
			</ModalBase>
		</div>
	);
};

export default TablaCotizaciones;
