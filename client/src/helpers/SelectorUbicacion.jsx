import { useSelector } from 'react-redux';

const SelectorUbicacion = ({ onChange, initialData }) => {
	const { departamentos, ciudades } = useSelector((state) => state.ubicaciones);

	// 🔥 EL CAMBIO: Ya no usamos useState interno.
	// Los valores los dictamina el padre (formik) a través de initialData.
	const deptId = initialData?.departamento
		? departamentos.find((d) => d.name === initialData.departamento)?.id
		: '';

	const city = initialData?.ciudad || '';

	// Filtramos ciudades basándonos en el deptId actual
	const ciudadesFiltradas = ciudades.filter(
		(c) => Number(c.departmentId) === Number(deptId),
	);

	const handleDeptChange = (e) => {
		const id = e.target.value;
		const nombreDept =
			departamentos.find((d) => d.id === Number(id))?.name || '';
		onChange({ departamento: nombreDept, ciudad: '' }); // Reset ciudad
	};

	const handleCiudadChange = (e) => {
		const ciudadNombre = e.target.value;
		onChange({
			departamento: initialData.departamento,
			ciudad: ciudadNombre,
		});
	};

	return (
		<div className="space-y-3">
			<select
				value={deptId || ''}
				onChange={handleDeptChange}
				className="w-full p-2 border rounded">
				<option value="">Seleccione Departamento</option>
				{departamentos?.map((d) => (
					<option key={d.id} value={d.id}>
						{d.name}
					</option>
				))}
			</select>

			<select
				value={city}
				onChange={handleCiudadChange}
				className="w-full p-2 border rounded"
				disabled={!deptId}>
				<option value="">Seleccione Ciudad</option>
				{ciudadesFiltradas.map((c) => (
					<option key={c.id} value={c.name}>
						{c.name}
					</option>
				))}
			</select>
		</div>
	);
};

export default SelectorUbicacion;
