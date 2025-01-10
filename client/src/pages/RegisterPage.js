import { useState } from "react";

export default function RegisterPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    async function register(ev) {
        ev.preventDefault(); // Prevent the form from refreshing the page

        try {
            const response = await fetch("http://localhost:4000/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                // Success response
                alert("Registration successful");
            } else {
                // Handle errors returned by the backend
                const errorData = await response.json();
                alert(`Registration failed: ${errorData.error || "Unknown error"}`);
            }
        } catch (err) {
            // Handle network or other fetch errors
            console.error("Error:", err);
            alert("Registration failed: Unable to connect to the server");
        }
    }

    return (
        <form className="register" onSubmit={register}>
            <h1>Register</h1>
            <input
                type="text"
                placeholder="username"
                value={username}
                onChange={(ev) => setUsername(ev.target.value)}
                required
            />
            <input
                type="password"
                placeholder="password"
                value={password}
                onChange={(ev) => setPassword(ev.target.value)}
                required
            />
            <button type="submit">Register</button>
        </form>
    );
}
