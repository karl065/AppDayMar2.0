// src/components/admin/roles/TablaRoles.jsx
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { actualizarRolesAction } from './../../../../redux/roles/actions/actualizarRolesAction.jsx';
import {
	alertConfirm,
	alertError,
	alertSuccess,
} from '../../../../helpers/alertas.jsx';
import MobileTable from '../../../../components/MobileTable/MobileTable.jsx';
import ModalBase from '../../../../components/ui/Modal.jsx';
import FormularioActualizarRol from '../../../formularios/roles/FormActualizarRol.jsx';
import { eliminarRolesAction } from './../../../../redux/roles/actions/eliminarRolesAction.jsx';
import FiltroUniversal from '../../../../components/Filtros/FiltroUniversal.jsx';
import { useFiltrado } from '../../../../hooks/useFiltrado.jsx';

const TablaRoles = () => {
	const dispatch = useDispatch();
	const { roles } = useSelector((state) => state.roles);

	// Integración del filtro
	const { datosFiltrados, aplicarFiltro, setBusqueda, busqueda, filtros } =
		useFiltrado(roles, ['nombre', 'descripcion']);

	const [modal, setModal] = useState({ abierto: false, rol: null });

	const columns = [
		{ key: 'nombre', label: 'Rol' },
		{ key: 'descripcion', label: 'Descripción' },
	];

	const handleEdit = (row) => {
		const original = roles.find((r) => r._id === row.id);
		setModal({ abierto: true, rol: original });
	};

	const handleActualizar = async (values) => {
		try {
			await actualizarRolesAction(dispatch, modal.rol._id, values);
			alertSuccess('Rol actualizado');
			setModal({ abierto: false, rol: null });
		} catch (error) {
			console.log(error);
			alertError('Error al actualizar');
		}
	};

	const handleDelete = async (row) => {
		const confirmar = await alertConfirm(
			'Eliminar Rol',
			`¿Estás seguro de eliminar el rol "${row.nombre}"? Esto podría afectar a los usuarios asignados.`,
		);

		if (confirmar) {
			try {
				await eliminarRolesAction(dispatch, row.id);
				alertSuccess('Rol eliminado correctamente');
			} catch (error) {
				console.error(error);
				alertError('Error al eliminar el rol');
			}
		}
	};

	return (
		<div className="w-full">
			<FiltroUniversal
				data={roles}
				busqueda={busqueda}
				onSearch={setBusqueda}
				onFilter={aplicarFiltro}
				filtrosActuales={filtros}
				config={[]} // Sin selects, solo usamos la barra de búsqueda por texto
			/>

			<div className="p-4 h-[calc(100vh-250px)] overflow-y-auto">
				<MobileTable
					columns={columns}
					data={datosFiltrados.map((r) => ({
						id: r._id,
						nombre: r.nombre,
						descripcion: r.descripcion,
					}))}
					onEdit={handleEdit}
					onDelete={handleDelete}
				/>
			</div>

			<ModalBase
				isOpen={modal.abierto}
				onClose={() => setModal({ abierto: false, rol: null })}
				title="Editar Rol">
				<FormularioActualizarRol
					rol={modal.rol}
					onSubmit={handleActualizar}
					onClose={() => setModal({ abierto: false, rol: null })}
				/>
			</ModalBase>
		</div>
	);
};
export default TablaRoles;
