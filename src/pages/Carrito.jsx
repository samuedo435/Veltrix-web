import { useCart }
from "../context/CartContext";

function Carrito() {

    const {
        carrito,
        total,
        eliminarDelCarrito
    } = useCart();

    return (

        <div className="container py-5">

            <h1 className="mb-5">
                Mi carrito
            </h1>

            {
                carrito.length === 0
                ? (
                    <h4>
                        Tu carrito está vacío.
                    </h4>
                )
                : (
                    <>
                        {
                            carrito.map(item => (

                                <div
                                    key={item.id}
                                    className="card p-3 mb-3"
                                >

                                    <h5>
                                        {item.nombre}
                                    </h5>

                                    <p>
                                        Cantidad:
                                        {" "}
                                        {item.cantidad}
                                    </p>

                                    <p>
                                        Precio:
                                        {" "}
                                        $
                                        {item.precio
                                            .toLocaleString()}
                                    </p>

                                    <button
                                        className="btn btn-danger"
                                        onClick={() =>
                                            eliminarDelCarrito(
                                                item.id
                                            )
                                        }
                                    >
                                        Eliminar
                                    </button>

                                </div>

                            ))
                        }

                        <h3>

                            Total:
                            {" "}
                            $
                            {total
                                .toLocaleString()}

                        </h3>

                    </>
                )
            }

        </div>
    );
}

export default Carrito;