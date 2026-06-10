import { createSlice } from '@reduxjs/toolkit';

const rolesSlice = createSlice({
	name: 'roles',
	initialState: {
		roles: [],
	},
	reducers: {
		cargarRoles: (state, action) => {
			state.roles = action.payload;
		},
		agregarRol: (state, action) => {
			state.roles.push(action.payload);
		},
		actualizarRol: (state, action) => {
			const rolActualizado = action.payload;

			const index = state.roles.findIndex(
				(rol) => rol._id === rolActualizado._id,
			);

			if (index !== -1) {
				state.roles[index] = {
					...state.roles[index],
					...rolActualizado,
				};
			}
		},
		eliminarRol: (state, action) => {
			const id = action.payload; // Aquí llega el ID
			state.roles = state.roles.filter((rol) => rol._id !== id);
		},
	},
});

export const { cargarRoles, agregarRol, actualizarRol, eliminarRol } =
	rolesSlice.actions;
export default rolesSlice.reducer;
