const Footer = () => (
	// 🔥 Cambiamos z-50 por z-10 para que el botón flotante (z-50) siempre gane
	<footer className="bg-vivero-dark text-vivero-gold text-center py-3 border-t-2 border-vivero-gold/30 shrink-0 z-10 relative">
		<p className="font-serif text-lg tracking-wide m-0">
			Muchas gracias por su confianza.
		</p>
		<p className="text-xs opacity-70 m-0">
			© {new Date().getFullYear()} JACAB Tech & Solutions para Vivero Daymar
		</p>
	</footer>
);

export default Footer;
