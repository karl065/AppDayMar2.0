// src/Home.jsx
import { useState } from 'react';
import { useSelector } from 'react-redux';
import CardProducto from '../components/cliente/CardProducto.jsx';
import ModalDatosContacto from '../components/cliente/ModalDatosContacto.jsx';
import ModalDetalleProducto from '../components/cliente/ModalDetalleProducto.jsx';

const Home = () => {
	const productos = useSelector((state) => state.productos.productos);
	const [cotizacion, setCotizacion] = useState([]);
	const [modalContacto, setModalContacto] = useState(false);

	// 👈 Nuevo estado para controlar qué producto se abre en el modal de detalle
	const [productoDetalle, setProductoDetalle] = useState(null);

	const toggleSeleccion = (producto, cantidad) => {
		setCotizacion((prev) => {
			const existe = prev.find((i) => i.producto._id === producto._id);
			if (existe) return prev.filter((i) => i.producto._id !== producto._id);
			return [...prev, { producto, cantidad }];
		});
	};

	// Función para manejar el cambio de cantidad desde la tarjeta O desde el modal
	const handleSetCantidad = (productoId, val) => {
		setCotizacion((prev) =>
			prev.map((c) =>
				c.producto._id === productoId ? { ...c, cantidad: val } : c,
			),
		);
	};

	return (
		<div className="p-8">
			<h2 className="text-3xl font-bold mb-6">Nuestro Catálogo</h2>

			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
				{productos.map((p) => (
					<CardProducto
						key={p._id}
						producto={p}
						isSelected={!!cotizacion.find((c) => c.producto._id === p._id)}
						toggleSeleccion={toggleSeleccion}
						cantidad={
							cotizacion.find((c) => c.producto._id === p._id)?.cantidad || 1
						}
						setCantidad={(val) => handleSetCantidad(p._id, val)}
						// 👈 Le pasamos la función para abrir el detalle
						onOpenDetalle={() => setProductoDetalle(p)}
					/>
				))}
			</div>

			{cotizacion.length > 0 && (
				<button
					onClick={() => setModalContacto(true)}
					/* 🔥 Integración de las clases de animación */
					className="fixed bottom-12 right-8 bg-vivero-gold text-vivero-dark px-8 py-4 rounded-full shadow-2xl font-bold z-50 hover:scale-105 transition-all border-2 border-white/20 animate-in fade-in zoom-in duration-500">
					Cotizar ({cotizacion.length})
				</button>
			)}

			<ModalDatosContacto
				isOpen={modalContacto}
				onClose={() => setModalContacto(false)}
				cotizacion={cotizacion}
			/>

			{/* 👈 Renderizamos el Modal de Detalle aquí abajo */}
			<ModalDetalleProducto
				// 🔥 2. EL TRUCO MÁGICO: La key fuerza a React a resetear el modal
				// Si cambia el ID del producto (o se cierra), se reinicia el estado local.
				key={productoDetalle?._id || 'modal-vacio'}
				producto={productoDetalle}
				isOpen={!!productoDetalle}
				onClose={() => setProductoDetalle(null)}
				cantidad={
					cotizacion.find((c) => c.producto._id === productoDetalle?._id)
						?.cantidad || 1
				}
				setCantidad={(val) => {
					if (productoDetalle) handleSetCantidad(productoDetalle._id, val);
				}}
				isSelected={
					!!cotizacion.find((c) => c.producto._id === productoDetalle?._id)
				}
				toggleSeleccion={toggleSeleccion}
			/>
		</div>
	);
};
export default Home;
