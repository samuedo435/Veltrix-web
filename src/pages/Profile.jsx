import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";
import { actualizarUsuario } from "../services/usuarioService";
import { obtenerPedidosPorCliente } from "../services/pedidoService";
import { obtenerDetallesPorPedido } from "../services/detallePedidoService";
import "../styles/profile.css";

const camposPerfil = [
    { nombre: "nombre", etiqueta: "Nombre", tipo: "text" },
    { nombre: "apellido", etiqueta: "Apellido", tipo: "text" },
    { nombre: "telefono", etiqueta: "Teléfono", tipo: "tel" },
    { nombre: "correo", etiqueta: "Correo", tipo: "email" },
    { nombre: "direccion", etiqueta: "Dirección", tipo: "text" }
];

const obtenerIdUsuario = usuario => usuario?.id ?? usuario?.usuarioId;
const obtenerIdCliente = usuario => usuario?.cliente?.id ?? usuario?.clienteId;

const obtenerDatosPerfil = usuario => {
    const cliente = usuario?.cliente || usuario?.client || {};

    return {
        nombre: cliente.nombre ?? usuario?.nombre ?? "",
        apellido: cliente.apellido ?? usuario?.apellido ?? "",
        telefono: cliente.telefono ?? cliente.tel ?? usuario?.telefono ?? "",
        correo: usuario?.correo ?? usuario?.email ?? "",
        direccion: cliente.direccion ?? cliente.address ?? usuario?.direccion ?? ""
    };
};

const obtenerListaPedidos = respuesta => {
    if (Array.isArray(respuesta)) return respuesta;
    return respuesta?.content || respuesta?.pedidos || respuesta?.data || [];
};

const obtenerFechaPedido = pedido => pedido.fechaPedido || pedido.fecha || pedido.createdAt || pedido.fechaCreacion || "";

const formatearValor = valor => {
    if (valor === null || valor === undefined || valor === "") return "Sin información";
    if (typeof valor === "object") return JSON.stringify(valor);
    return String(valor);
};

function Profile() {
    const { usuario, loading: authLoading, actualizarDatosUsuario } = useAuth();
    const [formulario, setFormulario] = useState({});
    const [pedidos, setPedidos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [mensaje, setMensaje] = useState("");
    const [confirmar, setConfirmar] = useState(false);
    const [guardando, setGuardando] = useState(false);
    const datosPerfil = useMemo(() => obtenerDatosPerfil(usuario), [usuario]);

    useEffect(() => {
    if (!usuario) return;

    const clienteId = obtenerIdCliente(usuario);

    if (!clienteId) {
        setLoading(false);
        return;
    }

    const cargarPedidosYDetalles = async () => {
        try {
            const respuestaPedidos = await obtenerPedidosPorCliente(clienteId);
            const listaPedidos = obtenerListaPedidos(respuestaPedidos);

            // Cargar los detalles de cada pedido en paralelo
            const pedidosConDetalles = await Promise.all(
                listaPedidos.map(async (pedido) => {
                    try {
                        const detalles = await obtenerDetallesPorPedido(pedido.id);
                        return { ...pedido, detalles };
                    } catch (err) {
                        console.error(`Error al cargar detalles del pedido ${pedido.id}`, err);
                        return { ...pedido, detalles: [] };
                    }
                })
            );

            setPedidos(pedidosConDetalles);
        } catch (pedidoError) {
            console.error(pedidoError);
            setError("No se pudieron cargar tus pedidos.");
        } finally {
            setLoading(false);
        }
    };

    cargarPedidosYDetalles();
}, [usuario]);

    const pedidosOrdenados = useMemo(() => (
        [...pedidos].sort((a, b) => new Date(obtenerFechaPedido(b)) - new Date(obtenerFechaPedido(a)))
    ), [pedidos]);

    const valoresFormulario = Object.keys(formulario).length > 0 ? formulario : datosPerfil;
    const formularioModificado = camposPerfil.some(({ nombre }) => valoresFormulario[nombre] !== datosPerfil[nombre]);

    const cambiarCampo = (nombre, valor) => {
        setFormulario(prev => ({ ...valoresFormulario, ...prev, [nombre]: valor }));
        setMensaje("");
        setError("");
    };

    const guardarCambios = async () => {
        setGuardando(true);
        setError("");
        
        try {
            const clienteId = usuario?.cliente?.id;
        
            if (!clienteId) {
                throw new Error("No se encontró el ID del cliente para actualizar.");
            }
        
            // Construir el objeto completo requerido por el esquema Cliente de la API
            const payloadCliente = {
                id: clienteId,
                nombre: valoresFormulario.nombre || datosPerfil.nombre,
                apellido: valoresFormulario.apellido || datosPerfil.apellido,
                telefono: valoresFormulario.telefono || datosPerfil.telefono,
                direccion: valoresFormulario.direccion || datosPerfil.direccion,
                usuario: {
                    id: usuario.id,
                    correo: usuario.correo,
                    rol: usuario.rol
                }
            };
        
            const clienteActualizado = await actualizarUsuario(clienteId, payloadCliente);
        
            // Actualizar el estado global del usuario con la información nueva del cliente
            const usuarioActualizado = {
                ...usuario,
                cliente: clienteActualizado
            };
        
            actualizarDatosUsuario(usuarioActualizado);
            setFormulario(obtenerDatosPerfil(usuarioActualizado));
            setMensaje("Tus datos se actualizaron correctamente.");
            setConfirmar(false);
        } catch (updateError) {
            console.error("Error al actualizar el perfil:", updateError);
            setError("No se pudieron actualizar tus datos. Verifica que todos los campos estén completos.");
        } finally {
            setGuardando(false);
        }
    };

    if (authLoading || (loading && obtenerIdUsuario(usuario))) return <main className="profile-page container py-5"><h2>Cargando perfil...</h2></main>;

    if (!usuario) {
        return <main className="profile-page container py-5"><section className="profile-panel profile-empty"><h1>Inicia sesión para ver tu perfil</h1><Link to="/login" className="btn profile-primary-btn">Iniciar sesión</Link></section></main>;
    }

    const clavesPedido = pedido => Object.keys(pedido).filter(clave => clave !== "estado");

    return (
    <>
        <main className="profile-page container py-5">
            <section className="profile-panel">
                <p className="profile-eyebrow">Mi cuenta</p>
                <h1 className="profile-title">Perfil</h1>
                {error && <div className="profile-message profile-message-error" role="alert">{error}</div>}
                {mensaje && <div className="profile-message profile-message-success" role="status">{mensaje}</div>}

                <div className="profile-form-grid">
                    {camposPerfil.map(({ nombre, etiqueta, tipo }) => (
                        <div className={`profile-field ${nombre === "direccion" ? "profile-field-wide" : ""}`} key={nombre}>
                            <label htmlFor={nombre}>{etiqueta}</label>
                            <input id={nombre} type={tipo} value={valoresFormulario[nombre] || ""} onChange={event => cambiarCampo(nombre, event.target.value)} />
                        </div>
                    ))}
                </div>

                <div className="profile-actions">
                    <button type="button" className="btn profile-primary-btn" disabled={!formularioModificado || guardando} onClick={() => setConfirmar(true)}>Actualizar</button>
                </div>
            </section>

            <section className="profile-panel orders-panel">
                <p className="profile-eyebrow">Historial</p>
                <h2 className="profile-section-title">Mis pedidos</h2>
                {pedidosOrdenados.length === 0 ? (
                    <p className="profile-no-orders">No tienes pedidos aún</p>
                ) : (
                    <div className="orders-list">
                        {pedidosOrdenados.map((pedido, index) => (
                            <article className="order-card" key={pedido.id || index}>
                                <div className="order-header" style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
                                    <strong>Pedido #{pedido.id}</strong>
                                    <span className="order-status">{formatearValor(pedido.estado)}</span>
                                </div>

                                <div className="order-data">
                                    <div className="order-data-row">
                                        <span>Fecha:</span>
                                        <strong>{new Date(obtenerFechaPedido(pedido)).toLocaleDateString()}</strong>
                                    </div>
                                    <div className="order-data-row">
                                        <span>Total:</span>
                                        <strong>${pedido.montoTotal}</strong>
                                    </div>
                                </div>

                                {pedido.detalles && pedido.detalles.length > 0 && (
                                    <div className="order-details-section" style={{ marginTop: "1rem", paddingTop: "1rem", borderTop: "1px solid #eee" }}>
                                        <p style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>Productos:</p>
                                        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                                            {pedido.detalles.map((detalle) => (
                                                <li key={detalle.id} style={{ display: "flex", justifyContent: "space-between", padding: "0.25rem 0" }}>
                                                    <span>{detalle.productoNombre} (x{detalle.cantidad})</span>
                                                    <strong>${detalle.subtotal}</strong>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </article>
                        ))}
                    </div>
                )}
            </section>
        </main>
        <Footer />
        {confirmar && (
            <div className="profile-dialog-backdrop" role="presentation">
                <div className="profile-dialog" role="dialog" aria-modal="true" aria-labelledby="profile-dialog-title">
                    <h2 id="profile-dialog-title">¿Actualizar tus datos?</h2>
                    <p>Se guardarán los campos que hayas modificado.</p>
                    <div className="profile-dialog-actions">
                        <button type="button" className="btn profile-cancel-btn" onClick={() => setConfirmar(false)} disabled={guardando}>Cancelar</button>
                        <button type="button" className="btn profile-primary-btn" onClick={guardarCambios} disabled={guardando}>{guardando ? "Actualizando..." : "Actualizar"}</button>
                    </div>
                </div>
            </div>
        )}
    </>
);
}

export default Profile;