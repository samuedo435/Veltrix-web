import { useState } from "react";
import api from "../services/api";

function Login() {

    const [correo, setCorreo] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await api.post("/auth/login", {
                correo,
                password
            });

            console.log("Respuesta del backend:");
            console.log(response.data);
            localStorage.setItem(
            "token",
            response.data.token);

            console.log("Token guardado");

        } catch (error) {

            console.error("Error:");

            if (error.response) {
                console.error(error.response.data);
            } else {
                console.error(error.message);
            }
        }
    };

    return (
        <div>
            <h2>Login Veltrix</h2>

            <form onSubmit={handleSubmit}>

                <div>
                    <label>Correo</label>
                    <br />
                    <input
                        type="correo"
                        value={correo}
                        onChange={(e) =>
                            setCorreo(e.target.value)}
                    />
                </div>

                <br />

                <div>
                    <label>Contraseña</label>
                    <br />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)}
                    />
                </div>

                <br />

                <button type="submit">
                    Iniciar sesión
                </button>

            </form>
        </div>
    );
}

export default Login;