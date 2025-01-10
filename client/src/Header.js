import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext"; // Import the AuthContext to check login status

export default function Header() {
    const { isLoggedIn } = useAuth(); // Access the logged-in state

    return (
        <header>
            <Link to="/" className="logo">My Blog</Link>
            <nav>
                {!isLoggedIn && (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                )}
                {isLoggedIn && (
                    <>
                        <Link to="/create">Create New Post</Link>
                        <Link to="/logout">Logout</Link>
                    </>
                )}
            </nav>
        </header>
    );
}
