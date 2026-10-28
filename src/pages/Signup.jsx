import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { doc, getDoc, setDoc } from "firebase/firestore";
import bcrypt from "bcryptjs";
import { db } from "../firebase";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!name.trim() || !email.trim() || !password || !confirmPassword) {
      setError("Please fill in every field.");
      return;
    }
    if (!emailPattern.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    const emailKey = email.trim().toLowerCase();

    try {
      const existing = await getDoc(doc(db, "users", emailKey));
      if (existing.exists()) {
        setError("An account with this email already exists.");
        setLoading(false);
        return;
      }

      const nameParts = name.trim().split(" ");
      const firstName = nameParts[0];
      const lastName = nameParts.slice(1).join(" ");
      const hashedPassword = bcrypt.hashSync(password, 10);

      await setDoc(doc(db, "users", emailKey), {
        firstName,
        lastName,
        email: emailKey,
        password: hashedPassword,
        createdAt: new Date().toISOString()
      });

      navigate("/login");
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="auth-page">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2 className="auth-title">Create a DEV@Deakin Account</h2>

        <label>Name*</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />

        <label>Email*</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

        <label>Password*</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

        <label>Confirm password*</label>
        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />

        {error && <p className="auth-error">{error}</p>}

        <button type="submit" className="auth-button" disabled={loading}>
          {loading ? "Creating..." : "Create"}
        </button>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </section>
  );
}

export default Signup;