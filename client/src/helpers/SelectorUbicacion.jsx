import { useState } from 'react';
import { useSelector } from 'react-redux';

const SelectorUbicacion = ({ onChange, initialData }) => {
	const { departamentos, ciudades } = useSelector((state) => state.ubicaciones);

	// 1. Usamos el valor de initialData directamente si existe, si no, estado local
	// Si el usuario edita, initialData tiene valor. Si crea, es vacío.
	const [deptId, setDeptId] = useState(initialData?.departamento || '');
	const [city, setCity] = useState(initialData?.ciudad || '');

	// Filtramos ciudades basándonos en el departamento seleccionado (ya sea el inicial o el que el usuario elija)
	const ciudadesFiltradas = ciudades.filter(
		(c) => c.departmentId === parseInt(deptId),
	);

	const handleDeptChange = (e) => {
		const id = e.target.value;
		setDeptId(id);
		setCity(''); // Reset ciudad
		const nombreDept =
			departamentos.find((d) => d.id === parseInt(id))?.name || '';
		onChange({ departamento: nombreDept, ciudad: '' });
	};

	const handleCiudadChange = (e) => {
		const ciudadNombre = e.target.value;
		setCity(ciudadNombre);
		onChange({
			departamento: departamentos.find((d) => d.id === parseInt(deptId))?.name,
			ciudad: ciudadNombre,
		});
	};

	return (
		<div className="space-y-3">
			<select
				value={deptId}
				onChange={handleDeptChange}
				className="w-full p-2 border rounded">
				{/* Si ya hay un deptId seleccionado, mostramos una opción temporal con el nombre o ID */}
				{deptId && !departamentos.find((d) => d.id === parseInt(deptId)) && (
					<option value={deptId}>{deptId}</option>
				)}

				{/* Opción por defecto (Placeholder) */}
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
				{city && !ciudadesFiltradas.find((c) => c.name === city) && (
					<option value={city}>{city}</option>
				)}

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
