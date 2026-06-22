// src/components/admin/usuarios/TablaUsuarios.jsx
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import MobileTable from '../../../../components/MobileTable/MobileTable.jsx';
import ModalBase from '../../../../components/ui/Modal.jsx';
import FormularioActualizarUsuario from '../../../formularios/usuarios/FormActualizarUsuario.jsx';
import { actualizarUsuariosAction } from './../../../../redux/admin/actions/actualizarUsuariosAction.jsx';
import {
	alertConfirm,
	alertError,
	alertSuccess,
} from '../../../../helpers/alertas.jsx';
import { eliminarUsuarioAction } from '../../../../redux/admin/actions/eliminarUsuarioAction.jsx';

const TablaUsuarios = () => {
	const dispatch = useDispatch();
	const { usuarios } = useSelector((state) => state.usuarios);
	const [modal, setModal] = useState({ abierto: false, usuario: null });

	const columns = [
		{ key: 'info', label: 'Usuario' },
		{ key: 'rol', label: 'Rol' },
	];

	const data = usuarios.map((u) => ({
		id: u._id,
		rol: u.rol?.nombre || 'Sin Rol',
		info: (
			<div className="flex flex-col">
				<span className="font-bold">
					{u.nombre} {u.apellido}
				</span>
				<span className="text-xs text-gray-400">{u.email}</span>
			</div>
		),
	}));

	const handleEdit = (row) => {
		const original = usuarios.find((u) => u._id === row.id);
		setModal({ abierto: true, usuario: original });
	};

	const handleDelete = async (row) => {
		const confirmar = await alertConfirm(
			'Eliminar Usuario',
			`¿Estás seguro de eliminar a ${row.nombre}? Esta acción no se puede deshacer.`,
		);

		if (confirmar) {
			try {
				await eliminarUsuarioAction(dispatch, row.id);
				alertSuccess('Usuario eliminado correctamente');
			} catch (error) {
				console.error(error);
				alertError('Error al eliminar el usuario');
			}
		}
	};

	return (
		<div className="w-full">
			<MobileTable
				columns={columns}
				data={data}
				onEdit={handleEdit}
				onDelete={handleDelete}
			/>

			<ModalBase
				isOpen={modal.abierto}
				onClose={() => setModal({ abierto: false, usuario: null })}
				title="Editar Usuario">
				<FormularioActualizarUsuario
					usuario={modal.usuario}
					onSubmit={async (values) => {
						try {
							await actualizarUsuariosAction(
								dispatch,
								modal.usuario._id,
								values,
							);
							alertSuccess('Usuario actualizado');
							setModal({ abierto: false, usuario: null });
						} catch (e) {
							console.log(e);
							alertError('Error');
						}
					}}
					onClose={() => setModal({ abierto: false, usuario: null })}
				/>
			</ModalBase>
		</div>
	);
};
export default TablaUsuarios;
