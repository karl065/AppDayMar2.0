// src/components/tienda/CardProducto.jsx
const CardProducto = ({
	producto,
	isSelected,
	toggleSeleccion,
	cantidad,
	setCantidad,
	onOpenDetalle, // 👈 Recibimos la nueva prop
}) => {
	return (
		<div
			// 👈 Agregamos el onClick al contenedor principal
			onClick={onOpenDetalle}
			className={`relative h-87.5 w-full rounded-lg overflow-hidden transition-all flex flex-col justify-end cursor-pointer border-2 ${isSelected ? 'border-vivero-gold' : 'border-vivero-gold/20'}`}>
			<img
				src={producto.imagen}
				className="absolute inset-0 w-full h-full object-cover"
				alt={producto.nombre}
			/>
			<div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />

			<div className="relative p-5 text-white z-10">
				<h4 className="font-bold text-lg truncate">{producto.nombre}</h4>
				<p className="text-vivero-gold text-sm mb-4">
					{producto.categoria?.nombre}
				</p>

				<div className="flex items-center justify-between">
					<input
						type="checkbox"
						checked={isSelected}
						// 👈 Detenemos la propagación para que al dar click aquí, no se abra el modal
						onClick={(e) => e.stopPropagation()}
						onChange={() => toggleSeleccion(producto, cantidad)}
						className="w-6 h-6 accent-vivero-gold"
					/>
					<div className="flex items-center gap-2 bg-white/20 rounded-full px-2">
						<button
							onClick={(e) => {
								e.stopPropagation();
								setCantidad(Math.max(1, cantidad - 1));
							}}
							className="px-2">
							-
						</button>
						<span className="text-sm font-bold">{cantidad}</span>
						<button
							onClick={(e) => {
								e.stopPropagation();
								setCantidad(cantidad + 1);
							}}
							className="px-2">
							+
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
export default CardProducto;
