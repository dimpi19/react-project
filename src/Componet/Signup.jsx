import React, { useState } from "react";
import { getDatabase, ref, set } from "firebase/database";
import { useNavigate, Link } from "react-router-dom";
import { app } from "../Firebase";

const database = getDatabase(app);

function Signup() {
  const [state, setState] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();

  function handleChange(e) {
    setState({ ...state, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const emailKey = state.email.replace(/\./g, "_");

    set(ref(database, "users/" + emailKey), {
      username: state.username,
      email: state.email,
      password: state.password,
    })
      .then(() => {
        alert("Signup successful! Please login to continue.");
        navigate("/login");
      })
      .catch((err) => {
        console.error(err);
        alert("Signup failed! " + err.message);
      });
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
      color: "white",
      backgroundColor:"black",
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
        <h2 style={styles.title}>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            value={state.username}
            onChange={handleChange}
            placeholder="Username"
            required
            style={styles.input}
          />
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
            Sign Up
          </button>
        </form>

        <p style={styles.linkText}>
          Already have an account?{" "}
          <Link to="/login" style={styles.link}>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
