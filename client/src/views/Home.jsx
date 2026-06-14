import { useSelector } from 'react-redux';

const Home = () => {
	const productos = useSelector((state) => state.productos.productos);

	return (
		// Agregamos bg-vivero-light para el fondo general del catálogo
		<div className="bg-linear-to-b from-pastel-cream via-vivero-light to-pastel-green">
			<div className="max-w-7xl mx-auto p-4 md:p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
				{productos.map((p) => (
					<div
						key={p._id}
						// Agregamos bg-white y el borde personalizado
						className="bg-white p-4 border border-vivero-gold/20 shadow-sm transition-transform hover:scale-[1.02]">
						<img
							src={p.imagen?.url}
							alt={p.nombre}
							className="w-full h-48 object-cover border-b border-vivero-gold/10"
						/>
						{/* Aplicamos color vivero-dark al texto del título */}
						<h4 className="font-bold mt-2 text-vivero-dark font-serif text-lg">
							{p.nombre}
						</h4>
						{/* El precio ya tenía el color, pero nos aseguramos */}
						<p className="text-vivero-gold font-bold text-xl">${p.precio}</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default Home;
