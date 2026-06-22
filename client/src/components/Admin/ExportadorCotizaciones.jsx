import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { DownloadIcon } from '../Icons/Icons.jsx';
import autoTable from 'jspdf-autotable';

const ExportadorCotizaciones = ({ cotizacion }) => {
	const getInfoCliente = () => {
		const nombre = cotizacion.usuario
			? `${cotizacion.usuario.nombre} ${cotizacion.usuario.apellido}`
			: cotizacion.cliente.nombre;
		const celular = cotizacion.usuario
			? cotizacion.usuario.celular
			: cotizacion.cliente.celular;
		return `${nombre.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_${celular}`;
	};

	const generarExcel = (e) => {
		e.stopPropagation();
		const info = getInfoCliente();

		// 1. Estructura personalizada estilo "Factura"
		const cabecera = [
			['VIVERO DAYMAR'],
			['Contacto: 321 350 90 63 | Fusagasugá, Colombia'],
			[],
			['DATOS DEL CLIENTE'],
			[
				'Nombre:',
				cotizacion.usuario
					? `${cotizacion.usuario.nombre} ${cotizacion.usuario.apellido}`
					: cotizacion.cliente.nombre,
			],
			[
				'Celular:',
				cotizacion.usuario
					? cotizacion.usuario.celular
					: cotizacion.cliente.celular,
			],
			['Estado:', cotizacion.estado.toUpperCase()], // 🔥 Estado agregado
			[],
			['Producto', 'Cantidad', 'Precio Unitario', 'Subtotal'],
		];

		const detalle = cotizacion.productos.map((p) => [
			p.producto.nombre,
			p.cantidad,
			p.precioUnitario,
			p.precioUnitario * p.cantidad,
		]);

		const total = [['', '', 'TOTAL GENERAL:', cotizacion.total]];
		const datosFinales = [...cabecera, ...detalle, ...total];

		const ws = XLSX.utils.aoa_to_sheet(datosFinales);
		const wb = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(wb, ws, 'Factura');
		XLSX.writeFile(wb, `Cotizacion_${info}.xlsx`);
	};

	const generarPDF = async (e) => {
		e.stopPropagation();
		const info = getInfoCliente();
		const doc = new jsPDF();
		const logoUrl =
			'https://res.cloudinary.com/dpjeltekx/image/upload/v1781398170/appDayMar/app/ChatGPT_Image_13_jun_2026_07_47_48_p.m_kastgo.png';

		try {
			const response = await fetch(logoUrl, { mode: 'cors' });
			const blob = await response.blob();
			const base64data = await new Promise((resolve) => {
				const reader = new FileReader();
				reader.onloadend = () => resolve(reader.result);
				reader.readAsDataURL(blob);
			});
			doc.addImage(base64data, 'PNG', 14, 10, 20, 20);
		} catch (error) {
			console.warn('No se pudo cargar el logo:', error);
		}

		doc.setFontSize(20);
		doc.text('Vivero Daymar', 40, 20);
		doc.setFontSize(10);
		doc.text('Contacto: 321 350 90 63 | Fusagasugá, Colombia', 40, 26);
		doc.setDrawColor(200);
		doc.line(14, 35, 196, 35);

		doc.setFontSize(12);
		doc.text(
			`Cliente: ${cotizacion.usuario ? `${cotizacion.usuario.nombre} ${cotizacion.usuario.apellido}` : cotizacion.cliente.nombre}`,
			14,
			45,
		);
		doc.text(
			`Celular: ${cotizacion.usuario ? cotizacion.usuario.celular : cotizacion.cliente.celular}`,
			14,
			51,
		);
		doc.text(`Estado: ${cotizacion.estado.toUpperCase()}`, 14, 57); // 🔥 Estado agregado

		autoTable(doc, {
			startY: 65, // Ajustado para dar espacio al nuevo campo de estado
			head: [['Producto', 'Cant', 'Precio Unit.', 'Subtotal']],
			body: cotizacion.productos.map((p) => [
				p.producto.nombre,
				p.cantidad,
				`$${p.precioUnitario.toLocaleString()}`,
				`$${(p.precioUnitario * p.cantidad).toLocaleString()}`,
			]),
			theme: 'striped',
			headStyles: { fillColor: [51, 102, 51] },
		});

		doc.text(
			`Total a pagar: $${cotizacion.total.toLocaleString()}`,
			14,
			doc.lastAutoTable.finalY + 10,
		);
		doc.save(`Cotizacion_${info}.pdf`);
	};

	return (
		<div className="flex gap-2">
			<button
				onClick={generarExcel}
				className="hover:scale-110 transition-transform"
				title="Descargar Excel">
				📊
			</button>
			<button
				onClick={generarPDF}
				className="hover:scale-110 transition-transform"
				title="Descargar PDF">
				<DownloadIcon />
			</button>
		</div>
	);
};

export default ExportadorCotizaciones;
