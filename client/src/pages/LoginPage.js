import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { setIsLoggedIn } = useAuth();
    const navigate = useNavigate();

    async function login(ev) {
        ev.preventDefault();

        try {
            const response = await fetch("http://localhost:4000/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                setIsLoggedIn(true); // Set logged-in state
                alert("Login successful!");
                navigate("/"); // Redirect to main page
            } else {
                const error = await response.json();
                alert(`Login failed: ${error.message}`);
            }
        } catch (err) {
            console.error("Login error:", err);
            alert("An error occurred. Please try again.");
        }
    }

    return (
        <form className="login" onSubmit={login}>
            <h1>Login</h1>
            <input
                type="text"
                placeholder="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Login</button>
        </form>
    );
}
