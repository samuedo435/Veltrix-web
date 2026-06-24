function ProductCard({ producto }) {

    return (

        <div
            style={{
                border: "1px solid #ccc",
                padding: "15px",
                margin: "10px",
                width: "250px"
            }}
        >

            <h3>{producto.nombre}</h3>

            <p>{producto.descripcion}</p>

            <p>
                Categoría:
                {" "}
                {producto.categoriaNombre || "Sin categoría"}
            </p>

            <p>
                ${producto.precio.toLocaleString()}
            </p>

            <p>
                Stock:
                {" "}
                {producto.stock}
            </p>

            <button>
                Ver detalle
            </button>

        </div>
    );
}

export default ProductCard;