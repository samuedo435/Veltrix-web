import api from "./api";

// Estos endpoints son públicos y devuelven los productos tal como los modela
// el backend, incluyendo nombre, precio, stock y categoriaNombre.
export const obtenerProductos = async () => {
    const response = await api.get("/productos");
    return response.data;
};

export const obtenerProductoPorId = async (id) => {
    const response = await api.get(`/productos/${id}`);
    return response.data;
};