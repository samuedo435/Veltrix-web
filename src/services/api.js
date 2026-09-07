import axios from "axios";

// Cliente HTTP compartido para el backend local. Todos los servicios usan el
// prefijo /api y envían JSON; los endpoints protegidos agregan su propio JWT.
const api = axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
        "Content-Type": "application/json"
    }
});

export default api;