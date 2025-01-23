import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { Link } from "react-router-dom";

const LoginPage = ({ onLoginSuccess }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            if (onLoginSuccess) onLoginSuccess(); // Notify the parent component of a successful login
        } catch (err) {
            setError("Login failed. Please check your email and password.");
        }
    };

    return (
        <div style={{ maxWidth: "400px", margin: "auto", textAlign: "center", padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <div style={{ marginBottom: "10px" }}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{ width: "100%", padding: "10px", marginBottom: "10px", borderRadius: "4px", border: "1px solid #ccc" }}
                        required
                    />
                </div>
                <div style={{ marginBottom: "10px" }}>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc" }}
                        required
                    />
                    <p>
            Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
                </div>
                <button type="submit" style={{ width: "100%", padding: "10px", borderRadius: "4px", backgroundColor: "#007bff", color: "#fff", border: "none" }}>
                    Login
                </button>
                {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
            </form>
        </div>
    );
};

export default LoginPage;
