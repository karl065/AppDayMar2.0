import RolesModel from '../../models/Roles.js';

const getHandlerRoles = async (req, res) => {
	try {
		const { idRol } = req.query;

		const roles = await RolesModel(idRol);

		return res.status(200).json(roles);
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
};

export default getHandlerRoles;
