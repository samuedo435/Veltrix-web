import "../styles/product-card.css";
import { Link } from "react-router-dom";

function ProductCard({ producto }) {
    const placeholder = "https://via.placeholder.com/600x400.png?text=Zapatilla";

    return (
        <article className="product-card">

            <div className="product-image">
                <img src={producto.imagen || placeholder} alt={producto.nombre} />
            </div>

            <div className="product-body">

                <div className="product-head d-flex justify-content-between">
                    <div>
                        <h5 className="product-title">{producto.nombre}</h5>
                        <p className="product-category">{producto.categoriaNombre || "Sin categoría"}</p>
                    </div>

                    <div className="price-stock text-end">
                        <div className="product-price">${producto.precio.toLocaleString()}</div>
                        <div className={`stock ${producto.stock > 0 ? 'in' : 'out'}`}>
                            {producto.stock > 0 ? `Stock: ${producto.stock}` : 'Agotado'}
                        </div>
                    </div>
                </div>

                <p className="product-description">{producto.descripcion}</p>

                <div className="product-footer">
                    <Link to={`/productos/${producto.id}`} className="btn-product">Ver más</Link>
                </div>

            </div>

        </article>
    );
}

export default ProductCard;
