import { Link } from "react-router-dom";
import "../styles/home.css";
import { useEffect, useState } from "react";
import { obtenerProductos }
from "../services/productoService";
import ProductCard from "../components/ProductCard";

function Home() {
    const [productos, setProductos] =
        useState([]);

    useEffect(() => {

        const cargarProductos =
            async () => {

                const data =
                    await obtenerProductos();

                setProductos(
                    data.slice(0, 3)
                );
            };

        cargarProductos();

    }, []);
    return (
        <div className="hero-section">

            <div className="container">

                <div className="hero-content">

                    <h1>
                        Encuentra el calzado perfecto
                    </h1>

                    <p>
                        Descubre las mejores zapatillas
                        para cualquier ocasión.
                    </p>

                    <Link
                        to="/productos"
                        className="btn-hero"
                    >
                        Ver catálogo
                    </Link>

                </div>

                <section className="container py-5">

                    <h2 className="mb-5">
                        Productos destacados
                    </h2>

                    <div className="row g-4">

                        {
                            productos.map(producto => (
                            
                                <div
                                    className="col-lg-4"
                                    key={producto.id}
                                >
                                    <ProductCard
                                        producto={producto}
                                    />
                                </div>

                            ))
                        }

                    </div>
                    
                </section>

            </div>

        </div>
        
    );
}

export default Home;