import { useState } from "react";
import { login as loginService, register as registerService } from "../services/authService";
import { useAuth } from "../context/AuthContext";
import "../styles/login.css"; 

function Login() {
    const [isRegistering, setIsRegistering] = useState(false);
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [telefono, setTelefono] = useState("");
    const [direccion, setDireccion] = useState("");
    const [correo, setCorreo] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const { login } = useAuth();

    // Estados para mensajes de éxito/error
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Validación simple en el front-end
    if (
        !correo ||
        !password ||
        (isRegistering && (!nombre || !apellido || !telefono || !direccion || !confirmPassword))
    ) {
        setError("Por favor, rellena todos los campos.");
        return;
    }
    if (isRegistering && password !== confirmPassword) {
        setError("Las contraseñas no coinciden.");
        return;
    }

    try {
        if (isRegistering) {
        await registerService({
            nombre,
            apellido,
            telefono,
            direccion,
            correo,
            password,
        });

        setSuccess("Registro exitoso. Ahora puedes iniciar sesión.");
        setIsRegistering(false);
        setPassword("");
        setConfirmPassword("");
        } else {
        const response = await loginService(correo, password);
        const token = response?.token;

        if (!token) {
            throw new Error("Credenciales inválidas");
        }

        await login(token);
        setSuccess("Inicio de sesión exitoso. ¡Bienvenido!");
        }
    } catch (err) {
        console.error(err);
        setError(isRegistering
            ? "No se pudo crear el usuario. Verifica los datos e inténtalo de nuevo."
            : "Usuario o contraseña incorrectos.");
    }
    };

    return (
    <div className="login-page">
      {/* Contenido principal */}
        <div className="login-main-content">
        <div className="login-content-wrapper">
          {/* Sección de Bienvenida (Texto a la izquierda) */}
            <div className="welcome-section">
            <p className="welcome-section-sub">BIENVENIDO DE NUEVO</p>
            <h1 className="welcome-section-title">
                Accede a tu cuenta Veltrix
            </h1>
            <p className="welcome-section-text">
                Guarda favoritos, gestiona pedidos y paga más rápido. Únete al
                movimiento con calzado deportivo de alto rendimiento.
            </p>
            <ul className="welcome-section-list">
                <li>Lanzamientos exclusivos</li>
                <li>Pago rápido</li>
                <li>Seguimiento de pedidos</li>
            </ul>
            </div>

          {/* Sección del Formulario (Tarjeta a la derecha) */}
            <div className="login-card-container">
            <div className="login-card">
              {/* Pestañas de Iniciar sesión / Registrarse */}
                <div className="login-tabs">
                <button
                    className={`login-tab ${!isRegistering ? "active" : ""}`}
                    onClick={() => setIsRegistering(false)}
                >
                    Iniciar sesión
                </button>
                <button
                    className={`login-tab ${isRegistering ? "active" : ""}`}
                    onClick={() => setIsRegistering(true)}
                >
                    Registrarse
                </button>
                </div>

              {/* Formulario */}
                <form onSubmit={handleSubmit} className="login-form">
                {/* Mensajes de error/éxito */}
                {error && <div className="alert alert-error">{error}</div>}
                {success && <div className="alert alert-success">{success}</div>}

                {isRegistering && (
                    <>
                    <div className="form-group">
                    <label htmlFor="nombre">Nombre</label>
                    <input
                    type="text"
                    id="nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder="Tu nombre"
                    />
                    </div>

                    <div className="form-group">
                    <label htmlFor="apellido">Apellido</label>
                    <input
                    type="text"
                    id="apellido"
                    value={apellido}
                    onChange={(e) => setApellido(e.target.value)}
                    placeholder="Tu apellido"
                    />
                    </div>

                    <div className="form-group">
                    <label htmlFor="telefono">Teléfono</label>
                    <input
                    type="tel"
                    id="telefono"
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value.replace(/\D/g, ""))}
                    inputMode="numeric"
                    pattern="[0-9]*"
                    placeholder="Tu teléfono"
                    />
                    </div>

                    <div className="form-group">
                    <label htmlFor="direccion">Dirección</label>
                    <input
                    type="text"
                    id="direccion"
                    value={direccion}
                    onChange={(e) => setDireccion(e.target.value)}
                    placeholder="Tu dirección"
                    />
                    </div>
                    </>
                )}

                <div className="form-group">
                    <label htmlFor="correo">Correo electrónico</label>
                    <input
                    type="email"
                    id="correo"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                    placeholder="nombre@dominio.com"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Contraseña</label>
                    <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Ingresa tu contraseña"
                    />
                </div>

                {/* Campo extra para confirmación de contraseña si se está registrando */}
                {isRegistering && (
                    <div className="form-group">
                    <label htmlFor="confirmPassword">
                        Confirmar contraseña
                    </label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Repite tu contraseña"
                    />
                    </div>
                )}

                <button type="submit" className="login-submit-btn">
                    {isRegistering ? "Registrarse" : "Iniciar sesión"}
                </button>
                </form>

              {/* Texto debajo del formulario */}
                <p className="login-card-footer">
                {isRegistering
                    ? "¿Ya tienes una cuenta? Inicia sesión en la pestaña superior."
                    : "¿Nuevo en Veltrix? Crea una cuenta para guardar tus preferencias."}
                </p>
            </div>
            </div>
        </div>
        </div>

    
    </div>
    );
}

export default Login;