import deleteImagen from '../../utils/Cloudinary/DeleteImagen.js';

// Endpoint POST: Elimina imagen (Se mantiene igual)
const handlerDeleteImagen = async (req, res) => {
	try {
		const { publicId } = req.body;
		const response = await deleteImagen(publicId);
		return res.status(200).json(response);
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

export default handlerDeleteImagen;
