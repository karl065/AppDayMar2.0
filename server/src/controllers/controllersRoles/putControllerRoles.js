import RolesModel from '../../models/Roles';

const putControllerRoles = async (roleUpdate, idRol) => {
	try {
		await RolesModel.findByIdAndUpdate(idRol, roleUpdate);
		const rolActualizado = await RolesModel.findById(idRol);
		return rolActualizado;
	} catch (error) {
		return error;
	}
};

export default putControllerRoles;
