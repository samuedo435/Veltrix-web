import "../styles/product-card.css";
import {Link} from "react-router-dom";

function ProductCard({ producto }) {
    return (
        <div className="product-card">

            <div className="product-image">
                Imagen
            </div>

            <div className="product-body">

                <h5>{producto.nombre}</h5>

                <p className="product-category">
                    {producto.categoriaNombre || "Sin categoría"}
                </p>

                <p className="product-description">
                    {producto.descripcion}
                </p>

                <div className="product-footer">

                    <span className="product-price">
                        $
                        {producto.precio.toLocaleString()}
                    </span>

                    <Link
                        to={`/productos/${producto.id}`}
                        className="btn-product"
                    >
                        Ver más
                    </Link>

                </div>

            </div>

        </div>
    );
}

export default ProductCard;