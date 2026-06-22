import { createSlice } from '@reduxjs/toolkit';

const cotizacionesSlice = createSlice({
	name: 'cotizaciones',
	initialState: {
		cotizaciones: [],
	},
	reducers: {
		cargarCotizaciones: (state, action) => {
			state.cotizaciones = action.payload;
		},
		agregarCotizacion: (state, action) => {
			state.cotizaciones.push(action.payload);
		},
		actualizarCotizacion: (state, action) => {
			const cotizacionActualizada = action.payload;

			const index = state.cotizaciones.findIndex(
				(cot) => cot._id === cotizacionActualizada._id,
			);

			if (index !== -1) {
				state.cotizaciones[index] = {
					...state.cotizaciones[index],
					...cotizacionActualizada,
				};
			}
		},
		eliminarCotizacion: (state, action) => {
			const id = action.payload;
			state.cotizaciones = state.cotizaciones.filter((cot) => cot._id !== id);
		},
	},
});

export const {
	cargarCotizaciones,
	agregarCotizacion,
	actualizarCotizacion,
	eliminarCotizacion,
} = cotizacionesSlice.actions;

export default cotizacionesSlice.reducer;
