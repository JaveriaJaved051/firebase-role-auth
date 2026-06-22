import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
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
        background: "#1a1a2e",
        padding: "14px 2rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
        <h1 style={{ fontSize: "18px", fontWeight: "500", color: "#FFA000" }}>
          Admin Dashboard
        </h1>
        <button
          onClick={handleLogout}
          style={{
            padding: "8px 18px",
            background: "transparent",
            border: "1px solid rgba(255,255,255,0.3)",
            borderRadius: "8px",
            fontSize: "13px",
            cursor: "pointer",
            color: "white"
          }}
        >
          Log out
        </button>
      </div>

      {/* Main content */}
      <div style={{ padding: "2rem", maxWidth: "700px", margin: "0 auto" }}>
        {/* Admin info card */}
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
            background: "#fff3e0",
            color: "#e65100",
            fontSize: "11px",
            padding: "3px 10px",
            borderRadius: "20px",
            fontWeight: "500"
          }}>
            Role: Admin
          </span>
        </div>

        {/* Stats row */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "12px",
          marginBottom: "1rem"
        }}>
          {[
            { label: "Total users", value: "—" },
            { label: "Active today", value: "—" },
            { label: "New signups", value: "—" },
          ].map((stat) => (
            <div key={stat.label} style={{
              background: "white",
              borderRadius: "12px",
              padding: "1rem",
              border: "0.5px solid #e0e0e0",
              textAlign: "center"
            }}>
              <p style={{ fontSize: "22px", fontWeight: "500", marginBottom: "4px" }}>
                {stat.value}
              </p>
              <p style={{ fontSize: "11px", color: "#888" }}>{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Admin actions card */}
        <div style={{
          background: "white",
          borderRadius: "12px",
          padding: "1.5rem",
          border: "0.5px solid #e0e0e0"
        }}>
          <h3 style={{ fontSize: "15px", fontWeight: "500", marginBottom: "8px" }}>
            Admin controls
          </h3>
          <p style={{ fontSize: "13px", color: "#888", lineHeight: "1.6" }}>
            Yahan admin-only features add kar sakte ho — user management,
            analytics, content moderation, etc.
          </p>
        </div>
      </div>
    </div>
  );
}