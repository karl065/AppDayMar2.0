import { createSlice } from '@reduxjs/toolkit';

const tiposSlice = createSlice({
	name: 'tipos',
	initialState: {
		tipos: [],
	},
	reducers: {
		cargarTipos: (state, action) => {
			state.tipos = action.payload;
		},
		agregarTipo: (state, action) => {
			state.tipos.push(action.payload);
		},
		actualizarTipo: (state, action) => {
			const tipoActualizado = action.payload;

			const index = state.tipos.findIndex(
				(tipo) => tipo._id === tipoActualizado._id,
			);

			if (index !== -1) {
				state.tipos[index] = {
					...state.tipos[index],
					...tipoActualizado,
				};
			}
		},
		eliminarTipo: (state, action) => {
			const id = action.payload; // Aquí llega el ID
			state.tipos = state.tipos.filter((tipo) => tipo._id !== id);
		},
	},
});

export const { cargarTipos, agregarTipo, actualizarTipo, eliminarTipo } =
	tiposSlice.actions;

export default tiposSlice.reducer;
