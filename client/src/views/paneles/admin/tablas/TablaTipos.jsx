// src/views/paneles/admin/tablas/TablaTipos.jsx
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MobileTable from '../../../../components/MobileTable/MobileTable.jsx';
import ModalBase from './../../../../components/ui/Modal.jsx';
import FormularioCrearTipo from '../../../formularios/tipos/FormCrearTipo.jsx';
import FormularioEditarTipo from '../../../formularios/tipos/FormEditarTipo.jsx';
import {
	alertDeleteWithTransfer,
	alertError,
} from '../../../../helpers/alertas.jsx';
import { eliminarTiposAction } from '../../../../redux/tipos/actions/eliminarTiposAction.jsx';
import FiltroUniversal from '../../../../components/Filtros/FiltroUniversal.jsx';
import { useFiltrado } from '../../../../hooks/useFiltrado.jsx';

const TablaTipos = () => {
	const dispatch = useDispatch();
	const { tipos } = useSelector((state) => state.tipos);

	// Integración del filtro
	const { datosFiltrados, aplicarFiltro, setBusqueda, busqueda, filtros } =
		useFiltrado(tipos, ['nombre', 'descripcion']);

	const [modal, setModal] = useState({ abierto: false, modo: null });
	const [tipoSeleccionado, setTipoSeleccionado] = useState(null);

	const handleEliminar = async (tipo) => {
		// 1. Preparamos opciones excluyendo el tipo actual
		const opciones = tipos
			.filter((t) => t._id !== tipo._id)
			.map((t) => ({ id: t._id, nombre: t.nombre }));

		// 2. Validación: ¿Hay a dónde asignar los productos/categorías?
		if (opciones.length === 0) {
			alertError('No puedes eliminar este tipo porque es el único existente.');
			return;
		}

		// 3. Lanzamos alerta
		const result = await alertDeleteWithTransfer(
			'Eliminar Tipo',
			`Las categorías de "${tipo.nombre}" se moverán a:`,
			opciones,
		);

		// 4. Ejecución
		if (result.isConfirmed) {
			const idAsignar = result.value;
			eliminarTiposAction(dispatch, tipo._id, idAsignar);
			console.log('Eliminando:', tipo._id, 'Asignando a:', idAsignar);
		}
	};

	const columns = [
		{ key: 'nombre', label: 'Tipo' },
		{ key: 'descripcion', label: 'Descripcion' },
	];

	// Mapeo usando datosFiltrados
	const data = datosFiltrados.map((t) => ({
		id: t._id,
		nombre: <span className="font-bold text-vivero-gold">{t.nombre}</span>,
		descripcion: (
			<span className="font-bold text-vivero-gold">{t.descripcion}</span>
		),
	}));

	return (
		<div className="w-full">
			<FiltroUniversal
				data={tipos}
				busqueda={busqueda}
				onSearch={setBusqueda}
				onFilter={aplicarFiltro}
				filtrosActuales={filtros}
				config={[]} // Sin selects, solo usamos la barra de búsqueda por texto
			/>

			<div className="p-4 h-[calc(100vh-250px)] overflow-y-auto">
				<MobileTable
					columns={columns}
					data={data}
					onEdit={(row) => {
						const original = tipos.find((t) => t._id === row.id);
						setTipoSeleccionado(original);
						setModal({ abierto: true, modo: 'editar' });
					}}
					onDelete={(row) => {
						const original = tipos.find((t) => t._id === row.id);
						handleEliminar(original);
					}}
				/>
			</div>

			<ModalBase
				isOpen={modal.abierto}
				onClose={() => setModal({ abierto: false, modo: null })}
				title={modal.modo === 'crear' ? 'Crear Nuevo Tipo' : 'Editar Tipo'}>
				{modal.modo === 'crear' ? (
					<FormularioCrearTipo
						onClose={() => setModal({ abierto: false, modo: null })}
					/>
				) : (
					<FormularioEditarTipo
						tipo={tipoSeleccionado}
						onClose={() => setModal({ abierto: false, modo: null })}
					/>
				)}
			</ModalBase>
		</div>
	);
};
export default TablaTipos;
