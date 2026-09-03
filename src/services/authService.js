import api from "./api";

export const login = async (correo, password) => {

    const response = await api.post("/auth/login", {
        correo,
        password
    });

    return response.data;
};

export const register = async (usuario) => {
    const response = await api.post("/auth/register", usuario);

    return response.data;
};