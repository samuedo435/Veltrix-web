import { useEffect, useState } from "react";
import api from "../services/api";

function Productos() {

    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const cargarProductos = async () => {

            try {

                const response =
                    await api.get("/productos");

                setProductos(response.data);

            } catch (error) {

                console.error(
                    "Error al cargar productos",
                    error
                );

            } finally {

                setLoading(false);
            }
        };

        cargarProductos();

    }, []);

    if (loading) {

        return <h2>Cargando productos...</h2>;
    }

    return (

        <div>

            <h1>Catálogo Veltrix</h1>

            {productos.map(producto => (

                <div
                    key={producto.id}
                    style={{
                        border: "1px solid #ccc",
                        padding: "15px",
                        margin: "10px"
                    }}
                >

                    <h3>{producto.nombre}</h3>

                    <p>
                        {producto.descripcion}
                    </p>

                    <p>
                        Categoría:
                        {" "}
                        {producto.categoriaNombre || "Sin categoría"}
                    </p>

                    <p>
                        Precio:
                        {" "}
                        ${producto.precio.toLocaleString()}
                    </p>

                    <p>
                        Stock:
                        {" "}
                        {producto.stock}
                    </p>

                </div>

            ))}

        </div>
    );
}

export default Productos;