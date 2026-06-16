// src/views/paneles/admin/tablas/TablaCategorias.jsx
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MobileTable from '../../../../components/MobileTable/MobileTable.jsx';
import ModalBase from './../../../../components/ui/Modal.jsx';
import FormularioCrearCategorias from '../../../formularios/categorias/CrearCategoriasForm.jsx';
import FormularioEditarCategoria from '../../../formularios/categorias/EditarCategoriaForm.jsx';
import { eliminarCategoriaAction } from './../../../../redux/categorias/actions/eliminarCategoriaAction';
import { alertDeleteWithTransfer } from '../../../../helpers/alertas.jsx';

const TablaCategorias = () => {
	const dispatch = useDispatch();
	const { categorias } = useSelector((state) => state.categorias);
	const [modal, setModal] = useState({ abierto: false, modo: null });
	const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);

	const handleEliminar = async (categoria) => {
		// 1. Preparamos opciones excluyendo la que vamos a eliminar
		const opciones = categorias
			.filter((c) => c._id !== categoria._id)
			.map((c) => ({ id: c._id, nombre: c.nombre }));

		// 2. Lanzamos la alerta reutilizable
		const result = await alertDeleteWithTransfer(
			'Eliminar Categoría',
			`Los productos de "${categoria.nombre}" se moverán a:`,
			opciones,
		);

		// 3. Ejecución
		if (result.isConfirmed) {
			const idNueva = result.value;
			eliminarCategoriaAction(dispatch, categoria._id, idNueva);
			console.log(
				'Eliminando:',
				categoria._id,
				'Moviendo productos a:',
				idNueva,
			);
		}
	};

	const columns = [
		{ key: 'nombre', label: 'Categoría' },
		{ key: 'tipo', label: 'Tipo' },
		{ key: 'descripcion', label: 'Descripción' },
	];

	const data = categorias.map((c) => ({
		id: c._id,
		nombre: <span className="font-bold text-vivero-gold">{c.nombre}</span>,
		tipo: (
			<span className="text-sm font-bold text-vivero-accent">
				{c.tipo?.nombre || 'Sin tipo'}
			</span>
		),
		descripcion: (
			<span className="text-sm font-bold text-vivero-accent">
				{c.descripcion}
			</span>
		),
	}));

	return (
		<div className="h-full w-full">
			<MobileTable
				columns={columns}
				data={data}
				onEdit={(row) => {
					const original = categorias.find((t) => t._id === row.id);
					setCategoriaSeleccionada(original);
					setModal({ abierto: true, modo: 'editar' });
				}}
				onDelete={(row) => {
					const original = categorias.find((t) => t._id === row.id);
					handleEliminar(original);
				}}
			/>

			<ModalBase
				isOpen={modal.abierto}
				onClose={() => setModal({ abierto: false, modo: null })}
				title={
					modal.modo === 'crear' ? 'Crear Nueva Categoría' : 'Editar Categoría'
				}>
				{modal.modo === 'crear' ? (
					<FormularioCrearCategorias
						onClose={() => setModal({ abierto: false, modo: null })}
					/>
				) : (
					<FormularioEditarCategoria
						categoria={categoriaSeleccionada}
						onClose={() => setModal({ abierto: false, modo: null })}
					/>
				)}
			</ModalBase>
		</div>
	);
};

export default TablaCategorias;
