// src/hooks/useFiltrado.js
import { useState, useMemo } from 'react';

export const useFiltrado = (data, camposBusqueda = ['nombre']) => {
	const [filtros, setFiltros] = useState({});
	const [busqueda, setBusqueda] = useState('');

	const aplicarFiltro = (key, value) => {
		setFiltros((prev) => {
			const next = { ...prev, [key]: value === 'Todos' ? null : value };
			// Si cambias el tipo, limpiamos la categoría para evitar inconsistencias
			if (key.includes('tipo')) delete next['categoria.nombre'];
			return next;
		});
	};

	const datosFiltrados = useMemo(() => {
		if (!data) return [];
		return data.filter((item) => {
			const cumpleFiltros = Object.entries(filtros).every(([key, value]) => {
				if (!value) return true;
				const itemValue = key.split('.').reduce((o, i) => o?.[i], item);
				return String(itemValue) === String(value);
			});

			const cumpleBusqueda = camposBusqueda.some((campo) => {
				const valor = campo.split('.').reduce((o, i) => o?.[i], item);
				return valor?.toString().toLowerCase().includes(busqueda.toLowerCase());
			});

			return cumpleFiltros && cumpleBusqueda;
		});
	}, [data, filtros, busqueda, camposBusqueda]);

	return { datosFiltrados, aplicarFiltro, setBusqueda, busqueda, filtros };
};
