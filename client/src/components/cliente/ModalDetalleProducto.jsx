import { useState } from 'react';
import ModalBase from './../ui/Modal.jsx';

const ModalDetalleProducto = ({
	producto,
	isOpen,
	onClose,
	cantidad: cantidadInicial,
	isSelected,
	toggleSeleccion,
}) => {
	const [cantidadLocal, setCantidadLocal] = useState(cantidadInicial || 1);

	if (!producto) return null;

	return (
		<ModalBase isOpen={isOpen} onClose={onClose} title={producto.nombre}>
			<div className="flex flex-col max-h-[80vh]">
				<img
					src={producto.imagen}
					alt={producto.nombre}
					className="w-full h-64 object-cover rounded-lg flex-shrink-0"
				/>

				{/* Descripción con scroll */}
				<div className="mt-4 flex-1 overflow-y-auto max-h-48 pr-2">
					<p className="text-gray-600 leading-relaxed whitespace-pre-line">
						{producto.descripcion}
					</p>
				</div>

				<div className="flex items-center justify-between pt-4 mt-4 border-t flex-shrink-0">
					<div className="flex items-center gap-4">
						<span className="font-bold">Cant:</span>

						<div className="flex items-center gap-2 bg-gray-100 rounded-full px-2 py-1">
							<button
								onClick={() => setCantidadLocal(Math.max(1, cantidadLocal - 1))}
								className="px-2 font-bold hover:text-vivero-gold">
								-
							</button>

							<span className="font-bold w-4 text-center">{cantidadLocal}</span>

							<button
								onClick={() => setCantidadLocal(cantidadLocal + 1)}
								className="px-2 font-bold hover:text-vivero-gold">
								+
							</button>
						</div>
					</div>

					<button
						onClick={() => {
							toggleSeleccion(producto, cantidadLocal);
							onClose();
						}}
						className={`px-6 py-2 rounded-full font-bold transition-colors ${
							isSelected
								? 'bg-red-100 text-red-600 hover:bg-red-200'
								: 'bg-vivero-gold text-vivero-dark hover:bg-vivero-accent hover:text-white'
						}`}>
						{isSelected ? 'Quitar de la lista' : 'Agregar a la lista'}
					</button>
				</div>
			</div>
		</ModalBase>
	);
};

export default ModalDetalleProducto;
