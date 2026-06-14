import { useState } from 'react';
import { useSelector } from 'react-redux';
import MobileTable from '../../../../components/MobileTable/MobileTable.jsx';
import ModalBase from './../../../../components/ui/Modal.jsx';
import FormularioCrearTipo from '../../../formularios/tipos/FormCrearTipo.jsx';
import FormularioEditarTipo from '../../../formularios/tipos/FormEditarTipo.jsx';

const TablaTipos = () => {
	const { tipos } = useSelector((state) => state.tipos);
	const [modal, setModal] = useState({ abierto: false, modo: null });
	const [tipoSeleccionado, setTipoSeleccionado] = useState(null);

	const columns = [
		{ key: 'nombre', label: 'Tipo' },
		{ key: 'descripcion', label: 'Descripcion' },
	];

	const data = tipos.map((t) => ({
		id: t._id,
		nombre: <span className="font-bold text-vivero-gold">{t.nombre}</span>,
		descripcion: (
			<span className="font-bold text-vivero-gold">{t.descripcion}</span>
		),
	}));

	return (
		<div className="h-full w-full">
			<MobileTable
				columns={columns}
				data={data}
				onEdit={(row) => {
					setTipoSeleccionado(row);
					setModal({ abierto: true, modo: 'editar' });
				}}
			/>

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
