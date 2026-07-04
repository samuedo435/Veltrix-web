import "../styles/home.css";
import { Link } from "react-router-dom";

function Footer() {
	return (
		<footer className="veltrix-footer">
			<div className="container">
				<div className="row">
					<div className="col-md-4 mb-3">
						<h5 className="text-white">Veltrix</h5>
						<p className="small">Calzado de rendimiento con estilo contemporáneo.</p>
					</div>

					<div className="col-md-4 mb-3">
						<h6 className="text-white">Enlaces</h6>
						<ul className="list-unstyled small">
							<li><Link to="/productos">Catálogo</Link></li>
							<li><Link to="/perfil">Mi cuenta</Link></li>
							<li><Link to="/contacto">Contacto</Link></li>
						</ul>
					</div>

					<div className="col-md-4 mb-3">
						<h6 className="text-white">Síguenos</h6>
						<div className="d-flex gap-3 mt-2">
							<a href="#" aria-label="instagram">Instagram</a>
							<a href="#" aria-label="twitter">Twitter</a>
							<a href="#" aria-label="facebook">Facebook</a>
						</div>
					</div>
				</div>

				<div className="row mt-4">
					<div className="col-12 text-center small">
						© {new Date().getFullYear()} Veltrix. Todos los derechos reservados.
					</div>
				</div>
			</div>
		</footer>
	);
}

export default Footer;
