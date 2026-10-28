import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import bcrypt from "bcryptjs";
import { db } from "../firebase";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    alert("LOGIN BUTTON CLICKED");

    console.log("LOGIN BUTTON CLICKED");
    console.log("Email:", email);
    console.log("Password:", password);

    setError("");

    if (!email.trim() || !password) {
      console.log("Email or password is empty.");
      setError("Please enter your email and password.");
      return;
    }

    setLoading(true);

    const emailKey = email.trim().toLowerCase();

    console.log("Email key:", emailKey);
    console.log("Starting Firebase request...");

    try {
      const userRef = doc(db, "users", emailKey);

      console.log("Firebase document reference created.");
      console.log("Collection: users");
      console.log("Document ID:", emailKey);

      const userDoc = await getDoc(userRef);

      console.log("Firebase request finished.");
      console.log("Document exists:", userDoc.exists());

      if (!userDoc.exists()) {
        console.log("USER NOT FOUND");

        setError(
          "We couldn't find that account. Try again, or sign up for a free account."
        );

        return;
      }

      console.log("USER FOUND");

      const userData = userDoc.data();

      console.log("USER DATA:");
      console.log(userData);

      console.log("Checking password...");

      if (!userData.password) {
        console.log("Password field does not exist.");

        setError("This account does not have a valid password.");
        return;
      }

      const passwordMatches = bcrypt.compareSync(
        password,
        userData.password
      );

      console.log("Password matches:", passwordMatches);

      if (!passwordMatches) {
        console.log("WRONG PASSWORD");

        setError(
          "Incorrect email or password. Try again, or sign up for a free account."
        );

        return;
      }

      console.log("LOGIN SUCCESSFUL");

      navigate("/");
    } catch (err) {
      console.error("LOGIN ERROR:");
      console.error(err);

      setError("Something went wrong. Check the browser console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="auth-page">
      <form
        className="auth-form"
        onSubmit={handleSubmit}
      >
        <div className="auth-header">
          <h2 className="auth-title">
            Login
          </h2>

          <Link
            to="/signup"
            className="auth-signup-badge"
          >
            Sign up
          </Link>
        </div>

        <label>
          Your email
        </label>

        <input
          type="email"
          value={email}
          onChange={(e) => {
            console.log("Email changed:", e.target.value);
            setEmail(e.target.value);
          }}
          placeholder="Enter your email"
        />

        <label>
          Your password
        </label>

        <input
          type="password"
          value={password}
          onChange={(e) => {
            console.log("Password changed");
            setPassword(e.target.value);
          }}
          placeholder="Enter your password"
        />

        {error && (
          <p className="auth-error">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="auth-button"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

      </form>
    </section>
  );
}

export default Login;
