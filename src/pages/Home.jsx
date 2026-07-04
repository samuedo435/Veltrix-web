import { Link } from "react-router-dom";
import "../styles/home.css";
import { useEffect, useState } from "react";
import { obtenerProductos } from "../services/productoService";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";

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
        <div className="home-page">

            <header className="hero-section d-flex align-items-center">
                <div className="container">
                    <div className="row align-items-center">

                        <div className="col-lg-6">
                            <div className="hero-content">
                                <h1 className="hero-title">Veltrix — Diseñado para correr</h1>
                                <p className="hero-sub">
                                    Zapatillas de alto rendimiento con diseño moderno y comodidad todo el día.
                                </p>
                                <Link to="/productos" className="btn btn-primary btn-hero">Ver catálogo</Link>
                            </div>
                        </div>

                        <div className="col-lg-6 d-none d-lg-block">
                            <div className="hero-image-wrap">
                                <img
                                    src="https://via.placeholder.com/700x500.png?text=Zapatilla+Veltrix"
                                    alt="Zapatilla Veltrix"
                                    className="hero-image"
                                />
                            </div>
                        </div>

                    </div>
                </div>
            </header>

            <main>
                <section className="container py-5">
                    <h2 className="section-title">Productos destacados</h2>
                    <div className="row g-4">
                        {productos.map(producto => (
                            <div className="col-12 col-md-6 col-lg-4" key={producto.id}>
                                <ProductCard producto={producto} />
                            </div>
                        ))}
                    </div>
                </section>

                <section className="bg-dark-section py-5">
                    <div className="container">
                        <h2 className="section-title text-center text-white mb-4">¿Por qué comprar en Veltrix?</h2>
                        <div className="row g-4 justify-content-center">

                            <div className="col-12 col-md-4">
                                <div className="why-card p-4 h-100">
                                    <h5>Envíos rápidos</h5>
                                    <p>Entrega express a todo el país para que no esperes por tus zapatillas.</p>
                                </div>
                            </div>

                            <div className="col-12 col-md-4">
                                <div className="why-card p-4 h-100">
                                    <h5>Pagos seguros</h5>
                                    <p>Plataforma protegida y múltiples opciones de pago.</p>
                                </div>
                            </div>

                            <div className="col-12 col-md-4">
                                <div className="why-card p-4 h-100">
                                    <h5>Calidad garantizada</h5>
                                    <p>Materiales premium y control de calidad en cada par.</p>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>
            </main>

            <Footer />

        </div>
    );
}

export default Home;