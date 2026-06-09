import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [usuario, setUsuario] = useState(null);
    const [loading, setLoading] = useState(true);

    const login = async (token) => {

        localStorage.setItem("token", token);

        try {

            const response = await api.get(
                "/auth/me",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setUsuario(response.data);

        } catch (error) {

            console.error(error);

            logout();
        }
    };

    const logout = () => {

        localStorage.removeItem("token");

        setUsuario(null);
    };

    useEffect(() => {

        const cargarUsuario = async () => {

            const token =
                localStorage.getItem("token");

            if (!token) {

                setLoading(false);
                return;
            }

            try {

                const response = await api.get(
                    "/auth/me",
                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );

                setUsuario(response.data);

            } catch (error) {

                console.error(error);

                localStorage.removeItem("token");
            }

            setLoading(false);
        };

        cargarUsuario();

    }, []);

    return (
        <AuthContext.Provider
            value={{
                usuario,
                login,
                logout,
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