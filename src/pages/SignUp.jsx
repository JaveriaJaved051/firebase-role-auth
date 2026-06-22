import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useNavigate, Link } from "react-router-dom";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSignUp(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      
      // Firestore mein user save karo with role "user"
      await setDoc(doc(db, "users", res.user.uid), {
        email: res.user.email,
        role: "user",
        createdAt: new Date(),
      });

      navigate("/user-dashboard");
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        setError("Yeh email already registered hai.");
      } else if (err.code === "auth/weak-password") {
        setError("Password kam az kam 6 characters ka hona chahiye.");
      } else {
        setError("Kuch error aaya, dobara try karo.");
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
        <h2 style={{ marginBottom: "6px", fontSize: "22px" }}>Create account</h2>
        <p style={{ color: "#888", fontSize: "14px", marginBottom: "1.5rem" }}>
          Sign up to get started
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

        <form onSubmit={handleSignUp}>
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
              placeholder="Min. 6 characters"
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
            {loading ? "Creating account..." : "Sign up"}
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: "1rem", fontSize: "13px", color: "#888" }}>
          Already have an account?{" "}
          <Link to="/login" style={{ color: "#1a73e8", textDecoration: "none" }}>
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}