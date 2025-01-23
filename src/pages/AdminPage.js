import React, { useEffect, useState } from "react";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase/firebase";

const AdminPage = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true); // Add loading state
    const [error, setError] = useState(""); // Add error state

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true); // Start loading
            setError(""); // Clear previous errors
            try {
                const querySnapshot = await getDocs(collection(db, "users"));
                const usersList = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setUsers(usersList);
            } catch (err) {
                console.error("Error fetching users:", err);
                setError("Failed to fetch user data. Please try again later.");
            } finally {
                setLoading(false); // Stop loading
            }
        };

        fetchUsers();
    }, []);

    const handleApprove = async (userId) => {
        try {
            await updateDoc(doc(db, "users", userId), { approved: true });
            alert("User approved!");
            setUsers((prev) =>
                prev.map((user) =>
                    user.id === userId ? { ...user, approved: true } : user
                )
            );
        } catch (err) {
            console.error("Error approving user:", err);
            alert("Failed to approve user. Please try again.");
        }
    };

    return (
        <div style={{ maxWidth: "600px", margin: "auto", textAlign: "center", padding: "20px" }}>
            <h1>Admin Dashboard</h1>
            {loading && <p>Loading users...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            {!loading && !error && (
                <ul style={{ listStyle: "none", padding: "0" }}>
                    {users.map((user) => (
                        <li
                            key={user.id}
                            style={{
                                marginBottom: "10px",
                                padding: "10px",
                                border: "1px solid #ccc",
                                borderRadius: "5px",
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            <span>
                                {user.email} -{" "}
                                <strong style={{ color: user.approved ? "green" : "red" }}>
                                    {user.approved ? "Approved" : "Pending"}
                                </strong>
                            </span>
                            {!user.approved && (
                                <button
                                    onClick={() => handleApprove(user.id)}
                                    style={{
                                        padding: "5px 10px",
                                        backgroundColor: "#007bff",
                                        color: "#fff",
                                        border: "none",
                                        borderRadius: "4px",
                                        cursor: "pointer",
                                    }}
                                >
                                    Approve
                                </button>
                            )}
                        </li>
                    ))}
                </ul>
            )}
            {!loading && users.length === 0 && <p>No users found.</p>}
        </div>
    );
};

export default AdminPage;

