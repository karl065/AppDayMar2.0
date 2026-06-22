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

const TablaRoles = () => {
	const dispatch = useDispatch();
	const { roles } = useSelector((state) => state.roles);
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
		<div className="w-full ">
			<MobileTable
				columns={columns}
				data={roles.map((r) => ({
					id: r._id,
					nombre: r.nombre,
					descripcion: r.descripcion,
				}))}
				onEdit={handleEdit}
				onDelete={handleDelete}
			/>
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
