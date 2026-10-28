import { useState } from "react";

function Footer() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubscribe = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      setMessage(data.message);
    } catch (err) {
      setMessage("Something went wrong");
    }
  };

  return (
    <footer className="footer">
      <div className="newsletter">
        <p className="newsletter-text">SIGN UP FOR OUR DAILY INSIDER</p>
        <form className="newsletter-form" onSubmit={handleSubscribe}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Subscribe</button>
        </form>
      </div>
      {message && <p className="newsletter-message">{message}</p>}

      <div className="footer-columns">
        <div>
          <h4>Explore</h4>
          <a href="#home">Home</a>
          <a href="#questions">Questions</a>
          <a href="#articles">Articles</a>
          <a href="#tutorials">Tutorials</a>
        </div>
        <div>
          <h4>Support</h4>
          <a href="#faqs">FAQs</a>
          <a href="#help">Help</a>
          <a href="#contact">Contact Us</a>
        </div>
        <div>
          <h4>Stay connected</h4>
          <div className="social-icons">
            <span>📘</span>
            <span>🐦</span>
            <span>📷</span>
          </div>
        </div>
      </div>

      <p className="footer-copyright">DEV@Deakin 2026</p>
      <div className="footer-legal">
        <a href="#privacy">Privacy Policy</a>
        <a href="#terms">Terms</a>
        <a href="#conduct">Code of Conduct</a>
      </div>
    </footer>
  );
}

export default Footer;