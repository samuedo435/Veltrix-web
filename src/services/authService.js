import api from "./api";

// Devuelve la respuesta de autenticación, incluido el token JWT que AuthContext
// guarda y usa para cargar el perfil completo.
export const login = async (correo, password) => {

    const response = await api.post("/auth/login", {
        correo,
        password
    });

    return response.data;
};

export const register = async (usuario) => {
    // El payload de registro contiene los datos de usuario y cliente del
    // formulario; la respuesta solo se devuelve al componente de login.
    const response = await api.post("/auth/register", usuario);

    return response.data;
};