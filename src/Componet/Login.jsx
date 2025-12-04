import React, { useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import { useNavigate, Link } from "react-router-dom";
import { app } from "../Firebase";

const database = getDatabase(app);

function Login({ setLogin }) {
  const [state, setState] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  function handleChange(e) {
    setState({ ...state, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const emailKey = state.email.replace(/\./g, "_");
    const userRef = ref(database, "users/" + emailKey);

    onValue(
      userRef,
      (snapshot) => {
        const data = snapshot.val();
        if (data && data.password === state.password) {
          localStorage.setItem(
            "loggedInUser",
            JSON.stringify({ name: data.username, email: data.email })
          );
          setLogin(data.username);
          alert("Login successful!");
          navigate("/");
        } else {
          alert("Invalid email or password");
        }
      },
      { onlyOnce: true }
    );
  }

  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      padding: "20px",
    },
    card: {
      background: "white",
      padding: "35px 25px",
      borderRadius: "15px",
      boxShadow: "0 5px 20px rgba(0, 0, 0, 0.15)",
      width: "100%",
      maxWidth: "400px",
      textAlign: "center",
    },
    title: {
      marginBottom: "25px",
      fontWeight: 700,
      fontSize: "26px",
      letterSpacing: "1px",
    },
    input: {
      padding: "12px",
      border: "1px solid #ccc",
      borderRadius: "8px",
      fontSize: "16px",
      marginBottom: "15px",
      width: "100%",
      boxSizing: "border-box",
      outline: "none",
    },
    button: {
      padding: "12px",
      backgroundColor: "black",
      color: "white",
      border: "none",
      borderRadius: "8px",
      fontSize: "16px",
      cursor: "pointer",
      width: "100%",
      transition: "0.3s ease",
      fontWeight: 600,
    },
    linkText: {
      marginTop: "15px",
      fontSize: "14px",
      color: "#444",
    },
    link: {
      textDecoration: "none",
      fontWeight: 600,
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            value={state.email}
            onChange={handleChange}
            placeholder="Email"
            required
            style={styles.input}
          />
          <input
            type="password"
            name="password"
            value={state.password}
            onChange={handleChange}
            placeholder="Password"
            required
            style={styles.input}
          />
          <button
            type="submit"
            style={styles.button}
          >
            Login
          </button>
        </form>

        <p style={styles.linkText}>
          Don’t have an account?{" "}
          <Link to="/signup" style={styles.link}>
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;