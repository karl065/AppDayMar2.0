// src/components/universal/FiltroUniversal.jsx
const FiltroUniversal = ({
	data,
	onFilter,
	config,
	onSearch,
	busqueda,
	filtrosActuales,
}) => {
	// Obtener opciones únicas basadas en el estado actual de los otros filtros
	const getOptions = (field) => {
		let filteredData = data;

		// Si ya hay un filtro aplicado en otro campo, restringimos las opciones
		config.forEach((f) => {
			if (f.key !== field.key && filtrosActuales[f.key]) {
				filteredData = filteredData.filter(
					(item) =>
						f.key.split('.').reduce((o, i) => o?.[i], item) ===
						filtrosActuales[f.key],
				);
			}
		});

		const values = filteredData.map((item) =>
			field.key.split('.').reduce((o, i) => o?.[i], item),
		);
		return [...new Set(values.filter(Boolean))];
	};

	return (
		<div className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm shadow-md border-b border-gray-100 p-4 transition-all">
			<div className="max-w-7xl mx-auto flex flex-wrap gap-4 items-end">
				<div className="flex flex-col grow md:grow-0">
					<label className="text-[10px] font-bold text-gray-400 uppercase mb-1">
						Buscar
					</label>
					<input
						type="text"
						value={busqueda}
						onChange={(e) => onSearch(e.target.value)}
						placeholder="Buscar..."
						className="p-2 border border-gray-200 rounded-lg text-sm w-full md:w-64 outline-none focus:ring-2 focus:ring-vivero-gold"
					/>
				</div>

				{config.map((field) => (
					<div key={field.key} className="flex flex-col">
						<label className="text-[10px] font-bold text-gray-400 uppercase mb-1">
							{field.label}
						</label>
						<select
							value={filtrosActuales[field.key] || 'Todos'}
							onChange={(e) => onFilter(field.key, e.target.value)}
							className="p-2 border border-gray-200 rounded-lg text-sm bg-white outline-none focus:ring-2 focus:ring-vivero-gold">
							<option value="Todos">Todos</option>
							{getOptions(field).map((val) => (
								<option key={val} value={val}>
									{val}
								</option>
							))}
						</select>
					</div>
				))}
			</div>
		</div>
	);
};
export default FiltroUniversal;
