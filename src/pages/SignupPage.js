import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase/firebase"; // Import Firebase auth and Firestore
import { doc, setDoc } from "firebase/firestore";

const SignupPage = ({ onSignupSuccess }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const handleSignup = async (e) => {
        e.preventDefault();
        setError("");
        setMessage("");

        try {
            // Create a user with Firebase Authentication
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Store user information in Firestore with default approval set to false
            await setDoc(doc(db, "users", user.uid), {
                email: user.email,
                approved: false, // Default to not approved
                role: "user", // Default role
            });

            setMessage("Account created successfully. Please wait for admin approval.");
        } catch (err) {
            setError("Sign-up failed. Please check your inputs and try again.");
            console.error("Error during sign-up:", err.message);
        }
    };

    return (
        <div style={{ maxWidth: "400px", margin: "auto", textAlign: "center", padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
            <h1>Sign Up</h1>
            <form onSubmit={handleSignup}>
                <div style={{ marginBottom: "10px" }}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{
                            width: "100%",
                            padding: "10px",
                            marginBottom: "10px",
                            borderRadius: "4px",
                            border: "1px solid #ccc",
                        }}
                        required
                    />
                </div>
                <div style={{ marginBottom: "10px" }}>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{
                            width: "100%",
                            padding: "10px",
                            borderRadius: "4px",
                            border: "1px solid #ccc",
                        }}
                        required
                    />
                </div>
                <button
                    type="submit"
                    style={{
                        width: "100%",
                        padding: "10px",
                        borderRadius: "4px",
                        backgroundColor: "#007bff",
                        color: "#fff",
                        border: "none",
                        cursor: "pointer",
                    }}
                >
                    Sign Up
                </button>
                {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
                {message && <p style={{ color: "green", marginTop: "10px" }}>{message}</p>}
            </form>
        </div>
    );
};

export default SignupPage;


