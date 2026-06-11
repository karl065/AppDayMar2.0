import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { loginAction } from '../../redux/admin/actions/loginAction.jsx';
import ModalBase from '../../components/ui/Modal.jsx';

const LoginModal = ({ isOpen, onClose }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [credenciales, setCredenciales] = useState({
		correo: '',
		password: '',
	});

	const handleSubmit = async (e) => {
		e.preventDefault();
		const success = await loginAction(credenciales, dispatch, navigate);
		if (success) onClose();
	};

	return (
		<ModalBase isOpen={isOpen} onClose={onClose} title="Acceso Administrativo">
			<form onSubmit={handleSubmit} className="space-y-4">
				<input
					type="email"
					name="correo"
					placeholder="Correo"
					onChange={(e) =>
						setCredenciales({ ...credenciales, correo: e.target.value })
					}
					className="w-full px-4 py-2 border rounded"
					required
				/>
				<input
					type="password"
					name="password"
					placeholder="Contraseña"
					onChange={(e) =>
						setCredenciales({ ...credenciales, password: e.target.value })
					}
					className="w-full px-4 py-2 border rounded"
					required
				/>
				<button
					type="submit"
					className="w-full bg-vivero-dark text-vivero-gold py-2 rounded uppercase font-bold">
					Ingresar
				</button>
			</form>
		</ModalBase>
	);
};

export default LoginModal;
