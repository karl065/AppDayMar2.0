import signUploadWidget from '../../utils/Cloudinary/signUploadWidget.js';

// Endpoint POST: Firma los parámetros exactos que envía el widget
const handlerSignWidget = (req, res) => {
	try {
		const { paramsToSign } = req.body;
		if (!paramsToSign) {
			return res
				.status(400)
				.json({ error: 'Faltan los parámetros para firmar' });
		}

		const signature = signUploadWidget(paramsToSign);
		return res.status(200).json({ signature });
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

export default handlerSignWidget;
