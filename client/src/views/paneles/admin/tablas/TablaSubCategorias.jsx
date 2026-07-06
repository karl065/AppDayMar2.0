// src/views/paneles/admin/tablas/TablaSubCategorias.jsx

import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MobileTable from '../../../../components/MobileTable/MobileTable.jsx';
import ModalBase from './../../../../components/ui/Modal.jsx';
import FormularioCrearSubCategorias from '../../../formularios/subCategorias/CrearSubCategoriasForm.jsx';
import FormularioEditarSubCategoria from '../../../formularios/subCategorias/EditarSubCategoriaForm.jsx';
import { eliminarSubCategoriaAction } from './../../../../redux/subCategorias/actions/eliminarSubCategoriaAction.jsx';
import { alertDeleteWithTransfer } from '../../../../helpers/alertas.jsx';
import FiltroUniversal from '../../../../components/Filtros/FiltroUniversal.jsx';
import { useFiltrado } from '../../../../hooks/useFiltrado.jsx';

const TablaSubCategorias = () => {
	const dispatch = useDispatch();

	const { subCategorias } = useSelector((state) => state.subCategorias);

	// Integración del filtro
	const { datosFiltrados, aplicarFiltro, setBusqueda, busqueda, filtros } =
		useFiltrado(subCategorias, [
			'nombre',
			'categoria.nombre',
			'categoria.tipo.nombre',
		]);

	const [modal, setModal] = useState({
		abierto: false,
		modo: null,
	});

	const [subCategoriaSeleccionada, setSubCategoriaSeleccionada] =
		useState(null);

	const handleEliminar = async (subCategoria) => {
		// Opciones disponibles para mover los productos
		const opciones = subCategorias
			.filter((s) => s._id !== subCategoria._id)
			.map((s) => ({
				id: s._id,
				nombre: s.nombre,
			}));

		const result = await alertDeleteWithTransfer(
			'Eliminar Subcategoría',
			`Los productos de "${subCategoria.nombre}" se moverán a:`,
			opciones,
		);

		if (result.isConfirmed) {
			const idNueva = result.value;

			eliminarSubCategoriaAction(dispatch, subCategoria._id, idNueva);

			console.log(
				'Eliminando:',
				subCategoria._id,
				'Moviendo productos a:',
				idNueva,
			);
		}
	};

	const columns = [
		{
			key: 'nombre',
			label: 'Subcategoría',
		},
		{
			key: 'categoria',
			label: 'Categoría',
		},
		{
			key: 'tipo',
			label: 'Tipo',
		},
		{
			key: 'descripcion',
			label: 'Descripción',
		},
	];

	const data = datosFiltrados.map((s) => ({
		id: s._id,

		nombre: <span className="font-bold text-vivero-gold">{s.nombre}</span>,

		categoria: (
			<span className="text-sm font-bold text-vivero-accent">
				{s.categoria?.nombre || 'Sin categoría'}
			</span>
		),

		tipo: (
			<span className="text-sm font-bold text-vivero-accent">
				{s.categoria?.tipo?.nombre || 'Sin tipo'}
			</span>
		),

		descripcion: (
			<span className="text-sm font-bold text-vivero-accent">
				{s.descripcion}
			</span>
		),
	}));

	return (
		<div className="w-full">
			<FiltroUniversal
				data={subCategorias}
				busqueda={busqueda}
				onSearch={setBusqueda}
				onFilter={aplicarFiltro}
				filtrosActuales={filtros}
				config={[
					{
						label: 'Tipo',
						key: 'categoria.tipo.nombre',
					},
					{
						label: 'Categoría',
						key: 'categoria.nombre',
					},
				]}
			/>

			<div className="p-4 h-[calc(100vh-250px)] overflow-y-auto">
				<MobileTable
					columns={columns}
					data={data}
					onEdit={(row) => {
						const original = subCategorias.find((s) => s._id === row.id);

						setSubCategoriaSeleccionada(original);

						setModal({
							abierto: true,
							modo: 'editar',
						});
					}}
					onDelete={(row) => {
						const original = subCategorias.find((s) => s._id === row.id);

						handleEliminar(original);
					}}
				/>
			</div>

			<ModalBase
				isOpen={modal.abierto}
				onClose={() =>
					setModal({
						abierto: false,
						modo: null,
					})
				}
				title={
					modal.modo === 'crear'
						? 'Crear Nueva Subcategoría'
						: 'Editar Subcategoría'
				}>
				{modal.modo === 'crear' ? (
					<FormularioCrearSubCategorias
						onClose={() =>
							setModal({
								abierto: false,
								modo: null,
							})
						}
					/>
				) : (
					<FormularioEditarSubCategoria
						subCategoria={subCategoriaSeleccionada}
						onClose={() =>
							setModal({
								abierto: false,
								modo: null,
							})
						}
					/>
				)}
			</ModalBase>
		</div>
	);
};

export default TablaSubCategorias;
