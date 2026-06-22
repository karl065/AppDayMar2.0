import { createSlice } from '@reduxjs/toolkit';

const ubicacionSlice = createSlice({
	name: 'ubicacion', // Cambiado a nombre correcto
	initialState: {
		departamentos: [],
		ciudades: [],
	},
	reducers: {
		guardarDepartamentos: (state, action) => {
			state.departamentos = action.payload;
		},
		guardarCiudades: (state, action) => {
			state.ciudades = action.payload;
		},
	},
});
export const { guardarDepartamentos, guardarCiudades } = ubicacionSlice.actions;

export default ubicacionSlice.reducer;
