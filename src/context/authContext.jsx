import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [usuario, setUsuario] = useState(null);
    const [loading, setLoading] = useState(true);

    // /auth/me devuelve la identidad autenticada; /clientes aporta el perfil
    // comercial que necesitan el carrito, el checkout y la página de perfil.
    const obtenerUsuarioCompleto = async (token) => {
        const headers = { Authorization: `Bearer ${token}` };

        // 1. Obtener los datos básicos de autenticación.
        const authRes = await api.get("/auth/me", { headers });
        const datosAuth = authRes.data;

        let clienteAsociado = null;

        // 2. El backend no entrega siempre el cliente dentro de /auth/me, por
        //    eso se busca por usuarioId y se usa el correo como respaldo.
        try {
            const clientesRes = await api.get("/clientes", { headers });
            const clientes = clientesRes.data || [];
            
            clienteAsociado = clientes.find(
                (c) => c.usuarioId === datosAuth.id || c.correo === datosAuth.correo
            );
        } catch (err) {
            console.warn("No se pudieron cargar los datos del cliente:", err);
        }

        // 3. Unificar ambos objetos para que el resto de la aplicación trabaje
        //    con una sola forma de usuario.
        return {
            ...datosAuth,
            cliente: clienteAsociado || {}
        };
    };

    const login = async (token) => {
        localStorage.setItem("token", token);

        try {
            const usuarioCompleto = await obtenerUsuarioCompleto(token);
            setUsuario(usuarioCompleto);
        } catch (error) {
            console.error("Error en login:", error);
            logout();
            throw error;
        }
    };

    const logout = () => {
        // El carrito pertenece a la sesión activa y no debe quedar disponible
        // para el siguiente usuario del mismo navegador.
        localStorage.removeItem("token");
        localStorage.removeItem("carrito");
        setUsuario(null);
    };

    const actualizarDatosUsuario = (datos) => {
        setUsuario((prev) => ({ ...prev, ...datos }));
    };

    useEffect(() => {
        // Restaurar la sesión al arrancar evita pedir al usuario que inicie
        // sesión de nuevo mientras el token siga siendo válido.
        const cargarUsuario = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                setLoading(false);
                return;
            }

            try {
                const usuarioCompleto = await obtenerUsuarioCompleto(token);
                setUsuario(usuarioCompleto);
            } catch (error) {
                console.error("Error al restaurar sesión:", error);
                localStorage.removeItem("token");
            } finally {
                setLoading(false);
            }
        };

        cargarUsuario();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                usuario,
                login,
                logout,
                actualizarDatosUsuario,
                loading,
                isAuthenticated: !!usuario
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}