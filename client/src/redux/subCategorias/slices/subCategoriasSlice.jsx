import { createSlice } from '@reduxjs/toolkit';

const subCategoriasSlice = createSlice({
	name: 'subCategorias',
	initialState: {
		subCategorias: [],
	},
	reducers: {
		cargarSubCategorias: (state, action) => {
			state.subCategorias = action.payload;
		},
		agregarSubCategoria: (state, action) => {
			state.subCategorias.push(action.payload);
		},
		actualizarSubCategoria: (state, action) => {
			const { _id } = action.payload;

			const index = state.subCategorias.findIndex(
				(subCategoria) => subCategoria._id === _id,
			);

			if (index !== -1) {
				state.subCategorias[index] = {
					...state.subCategorias[index],
					...action.payload,
				};
			}
		},
		eliminarSubCategoria: (state, action) => {
			const id = action.payload; // Aquí llega el ID
			state.subCategorias = state.subCategorias.filter(
				(subCategoria) => subCategoria._id !== id,
			);
		},
	},
});

export const {
	cargarSubCategorias,
	agregarSubCategoria,
	actualizarSubCategoria,
	eliminarSubCategoria,
} = subCategoriasSlice.actions;

export default subCategoriasSlice.reducer;
