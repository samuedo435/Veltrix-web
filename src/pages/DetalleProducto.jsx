import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { obtenerProductoPorId } from "../services/productoService";
import { useCart } from "../context/CartContext";

function DetalleProducto() {

    const { id } = useParams();

    const [producto, setProducto] =
        useState(null);

    const [loading, setLoading] =
        useState(true);

    const { agregarAlCarrito } = useCart();

    useEffect(() => {

        const cargarProducto =
            async () => {

                try {

                    const data =
                        await obtenerProductoPorId(id);

                    setProducto(data);

                } catch (error) {

                    console.error(error);

                } finally {

                    setLoading(false);
                }
            };

        cargarProducto();

    }, [id]);

    if (loading) {
        return (
            <h2 className="container py-5">
                Cargando producto...
            </h2>
        );
    }

    if (!producto) {
        return (
            <h2 className="container py-5">
                Producto no encontrado
            </h2>
        );
    }

    return (

        <div className="container py-5">

            <div className="row">

                <div className="col-md-6">

                    <div
                        style={{
                            background: "#111827",
                            height: "400px",
                            borderRadius: "20px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                    >
                        Imagen del producto
                    </div>

                </div>

                <div className="col-md-6">

                    <h1>{producto.nombre}</h1>

                    <p
                        style={{
                            color:
                                "var(--primary)"
                        }}
                    >
                        {
                            producto.categoriaNombre
                            || "Sin categoría"
                        }
                    </p>

                    <p>
                        {producto.descripcion}
                    </p>

                    <h2 className="my-4">

                        $

                        {producto.precio
                            .toLocaleString()}

                    </h2>

                    <p>

                        Stock:
                        {" "}
                        {producto.stock}

                    </p>

                    <button
                        className="btn btn-info mt-4"
                        onClick={() =>
                                    agregarAlCarrito(producto)
                                }
                    >
                        Agregar al carrito
                    </button>

                </div>

            </div>

        </div>
    );
}

export default DetalleProducto;