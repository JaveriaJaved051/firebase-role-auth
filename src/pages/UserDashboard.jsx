import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function UserDashboard() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await signOut(auth);
    navigate("/login");
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "#f5f5f5"
    }}>
      {/* Top navbar */}
      <div style={{
        background: "white",
        padding: "14px 2rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: "0.5px solid #e0e0e0"
      }}>
        <h1 style={{ fontSize: "18px", fontWeight: "500" }}>User Dashboard</h1>
        <button
          onClick={handleLogout}
          style={{
            padding: "8px 18px",
            background: "transparent",
            border: "1px solid #ddd",
            borderRadius: "8px",
            fontSize: "13px",
            cursor: "pointer",
            color: "#555"
          }}
        >
          Log out
        </button>
      </div>

      {/* Main content */}
      <div style={{ padding: "2rem", maxWidth: "700px", margin: "0 auto" }}>
        {/* Welcome card */}
        <div style={{
          background: "white",
          borderRadius: "12px",
          padding: "1.5rem",
          border: "0.5px solid #e0e0e0",
          marginBottom: "1rem"
        }}>
          <p style={{ fontSize: "13px", color: "#888", marginBottom: "4px" }}>
            Logged in as
          </p>
          <p style={{ fontSize: "16px", fontWeight: "500" }}>
            {currentUser?.email}
          </p>
          <span style={{
            display: "inline-block",
            marginTop: "8px",
            background: "#e8f5e9",
            color: "#2e7d32",
            fontSize: "11px",
            padding: "3px 10px",
            borderRadius: "20px",
            fontWeight: "500"
          }}>
            Role: User
          </span>
        </div>

        {/* Info card */}
        <div style={{
          background: "white",
          borderRadius: "12px",
          padding: "1.5rem",
          border: "0.5px solid #e0e0e0"
        }}>
          <h3 style={{ fontSize: "15px", fontWeight: "500", marginBottom: "8px" }}>
            Welcome!
          </h3>
          <p style={{ fontSize: "13px", color: "#888", lineHeight: "1.6" }}>
            Yeh tumhara personal dashboard hai. Yahan apni app ki
            user-specific features add kar sakte ho.
          </p>
        </div>
      </div>
    </div>
  );
}