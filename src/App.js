import "./css/App.css"; // Ensure this is correctly imported
import React, { useState, useEffect } from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase/firebase";
import { db } from "./firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import AdminPage from "./pages/AdminPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";
import AddItemPage from "./pages/AddItemPage";
import EditItemPage from "./pages/EditItemPage";
import CountPage from "./pages/CountPage";
import CountHistory from "./pages/CountHistory";
import ChangeOrderPage from "./pages/ChangeOrderPage";
import Notification from "./components/Notification";
import { InventoryProvider } from "./context/InventoryContext";
import { NotificationProvider } from "./context/NotificationContext";

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isApproved, setIsApproved] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true); // Add loading state

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setLoading(true); // Start loading when auth state changes
            if (user) {
                try {
                    // Fetch user data from Firestore
                    const userDoc = await getDoc(doc(db, "users", user.uid));
                    if (userDoc.exists()) {
                        const userData = userDoc.data();
                        console.log("User Data:", userData); // Debugging
                        setIsApproved(userData.approved);
                        setIsAdmin(userData.role === "admin"); // Check if the user is an admin
                        setIsAuthenticated(true);
                    } else {
                        alert("User data not found.");
                        setIsAuthenticated(false);
                        setIsApproved(false);
                    }
                } catch (error) {
                    console.error("Error fetching user data:", error);
                }
            } else {
                setIsAuthenticated(false);
                setIsAdmin(false);
            }
            setLoading(false); // Finish loading
        });

        return () => unsubscribe();
    }, []);

    const handleSignOut = async () => {
        try {
            await signOut(auth); // Sign out the user
            setIsAuthenticated(false); // Reset authentication state
            setIsAdmin(false);
        } catch (error) {
            console.error("Error signing out:", error.message);
        }
    };

    console.log("isAuthenticated:", isAuthenticated);
    console.log("isAdmin:", isAdmin);
    console.log("isApproved:", isApproved);

    if (loading) {
        // Render a loading message while user data is being fetched
        return <div>Loading...</div>;
    }

    return (
        <InventoryProvider>
            <NotificationProvider>
                <Notification />
                <header className="navbar">
  <h1 style={{ color: "white" }}>Inventory Management</h1>
  
  <nav className="nav-links">
    <Link to="/">Home</Link>
    <Link to="/add-item">Add Item</Link>
    <Link to="/count">Count Inventory</Link>
    <Link to="/count-history">Count History</Link>
    {isAdmin && <Link to="/admin">Admin</Link>}
  </nav>

  {/* Move Sign Out Button to the Right */}
  {isAuthenticated && (
    <button onClick={handleSignOut} className="sign-out-btn">
      Sign Out
    </button>
  )}
</header>

                <Routes>
                    <Route path="/admin" element={isAuthenticated && isAdmin ? <AdminPage /> : <Navigate to="/login" />} />
                    <Route path="/login" element={<LoginPage onLoginSuccess={() => setIsAuthenticated(true)} />} />
                    <Route path="/signup" element={<SignupPage onSignupSuccess={() => setIsAuthenticated(true)} />} />
                    <Route path="/" element={isAuthenticated && isApproved ?  <HomePage /> : <Navigate to="/login" />} />
                    <Route path="/add-item" element={isAuthenticated && isApproved ? <AddItemPage /> : <Navigate to="/login" />} />
                    <Route path="/edit-item/:id" element={isAuthenticated && isApproved ? <EditItemPage /> : <Navigate to="/login" />} />
                    <Route path="/count" element={isAuthenticated && isApproved ? <CountPage /> : <Navigate to="/login" />} />
                    <Route path="/count-history" element={isAuthenticated && isApproved ? <CountHistory /> : <Navigate to="/login" />} />
                    <Route path="/change-order" element={isAuthenticated && isApproved ? <ChangeOrderPage /> : <Navigate to="/login" />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </NotificationProvider>
        </InventoryProvider>
    );
}

export default App;









