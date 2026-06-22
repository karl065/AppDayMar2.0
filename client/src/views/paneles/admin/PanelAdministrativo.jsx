// src/views/paneles/admin/PanelAdministrativo.jsx
import { useOutletContext } from 'react-router-dom';
import TablaProductos from './tablas/TablaProductos.jsx';
// Importa aquí las tablas de los otros modelos
// import TablaUsuarios from './tablas/TablaUsuarios.jsx';
// import TablaCategorias from './tablas/TablaCategorias.jsx';
import Home from './../../Home.jsx';
import TablaTipos from './tablas/TablaTipos.jsx';
import ModalBase from '../../../components/ui/Modal.jsx';
import FormularioCrearTipo from '../../formularios/tipos/FormCrearTipo.jsx';
import FormularioCrearProducto from '../../formularios/productos/CrearProductosFrom.jsx';
import TablaCategorias from './tablas/TablaCategorias.jsx';
import FormularioCrearCategorias from '../../formularios/categorias/CrearCategoriasForm.jsx';
import TablaUsuarios from './tablas/TablaUsuario.jsx';
import TablaRoles from './tablas/TablaRoles.jsx';
import FormularioCrearUsuario from '../../formularios/usuarios/FormCrearUsuario.jsx';
import FormularioCrearRol from '../../formularios/roles/FormCrearRol.jsx';

const PanelAdministrativo = () => {
	const { seccion, modalCrearAbierto, setModalCrearAbierto } =
		useOutletContext();

	const renderContenido = () => {
		switch (seccion) {
			case 'productos':
				return <TablaProductos />;
			case 'categorias':
				return <TablaCategorias />;
			case 'tipos':
				return <TablaTipos />;
			case 'usuarios':
				return <TablaUsuarios />;
			case 'roles':
				return <TablaRoles />;
			case 'tienda':
			default:
				return <Home />; // O un componente de bienvenida para el dashboard general
		}
	};

	// 2. Renderizado del formulario de creación según sección
	const renderFormularioCrear = () => {
		const props = { onClose: () => setModalCrearAbierto(false) };
		switch (seccion) {
			case 'productos':
				return <FormularioCrearProducto {...props} />;
			case 'categorias':
				return <FormularioCrearCategorias {...props} />;
			case 'tipos':
				return <FormularioCrearTipo {...props} />;
			case 'usuarios':
				return <FormularioCrearUsuario {...props} />;
			case 'roles':
				return <FormularioCrearRol {...props} />;
			// case 'categorias': return <FormularioCrearCategoria {...props} />;
			default:
				return null;
		}
	};

	return (
		<div className="w-full h-full animate-fade-in">
			{/* Contenido principal */}
			{renderContenido()}

			{/* Modal Global de Creación */}
			{seccion !== 'dashboard' && seccion !== 'tienda' && (
				<ModalBase
					isOpen={modalCrearAbierto}
					onClose={() => setModalCrearAbierto(false)}
					title={`Crear ${seccion.charAt(0).toUpperCase() + seccion.slice(1)}`}>
					{renderFormularioCrear()}
				</ModalBase>
			)}
		</div>
	);
};

export default PanelAdministrativo;
