import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await signInWithEmailAndPassword(auth, email, password);

      const snap = await getDoc(doc(db, "users", res.user.uid));
      const role = snap.exists() ? snap.data().role : "user";

      if (role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/user-dashboard");
      }
    } catch (err) {
      if (err.code === "auth/user-not-found") {
        setError("Yeh email registered nahi hai.");
      } else if (err.code === "auth/wrong-password") {
        setError("Password galat hai.");
      } else {
        setError("Login fail hua, dobara try karo.");
      }
    }
    setLoading(false);
  }

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#f5f5f5"
    }}>
      <div style={{
        background: "white",
        padding: "2rem",
        borderRadius: "12px",
        width: "100%",
        maxWidth: "400px",
        border: "0.5px solid #e0e0e0"
      }}>
        <h2 style={{ marginBottom: "6px", fontSize: "22px" }}>Welcome back</h2>
        <p style={{ color: "#888", fontSize: "14px", marginBottom: "1.5rem" }}>
          Log in to your account
        </p>

        {error && (
          <div style={{
            background: "#fff0f0",
            color: "#c0392b",
            padding: "10px 14px",
            borderRadius: "8px",
            fontSize: "13px",
            marginBottom: "1rem"
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: "14px" }}>
            <label style={{ fontSize: "13px", color: "#555", display: "block", marginBottom: "5px" }}>
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "10px 12px",
                borderRadius: "8px",
                border: "1px solid #ddd",
                fontSize: "14px",
                outline: "none"
              }}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label style={{ fontSize: "13px", color: "#555", display: "block", marginBottom: "5px" }}>
              Password
            </label>
            <input
              type="password"
              placeholder="Your password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "10px 12px",
                borderRadius: "8px",
                border: "1px solid #ddd",
                fontSize: "14px",
                outline: "none"
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "11px",
              background: loading ? "#aaa" : "#1a73e8",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "14px",
              fontWeight: "500",
              cursor: loading ? "not-allowed" : "pointer"
            }}
          >
            {loading ? "Logging in..." : "Log in"}
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: "1rem", fontSize: "13px", color: "#888" }}>
          No account?{" "}
          <Link to="/signup" style={{ color: "#1a73e8", textDecoration: "none" }}>
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}