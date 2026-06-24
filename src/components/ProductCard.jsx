import "../styles/product-card.css";

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

                    <button
                        className="btn-product"
                    >
                        Ver más
                    </button>

                </div>

            </div>

        </div>
    );
}

export default ProductCard;