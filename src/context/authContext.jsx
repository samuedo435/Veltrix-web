import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [usuario, setUsuario] = useState(null);
    const [loading, setLoading] = useState(true);

    const obtenerUsuarioCompleto = async (token) => {
        const headers = { Authorization: `Bearer ${token}` };

        // 1. Obtener los datos básicos de autenticación
        const authRes = await api.get("/auth/me", { headers });
        const datosAuth = authRes.data;

        let clienteAsociado = null;

        // 2. Consultar clientes para encontrar el perfil vinculado a este usuario
        try {
            const clientesRes = await api.get("/clientes", { headers });
            const clientes = clientesRes.data || [];
            
            clienteAsociado = clientes.find(
                (c) => c.usuarioId === datosAuth.id || c.correo === datosAuth.correo
            );
        } catch (err) {
            console.warn("No se pudieron cargar los datos del cliente:", err);
        }

        // 3. Unificar ambos objetos para que el perfil tenga toda la información
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
        localStorage.removeItem("token");
        localStorage.removeItem("carrito");
        setUsuario(null);
    };

    const actualizarDatosUsuario = (datos) => {
        setUsuario((prev) => ({ ...prev, ...datos }));
    };

    useEffect(() => {
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