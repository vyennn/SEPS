import { useState } from "react";
import bgImage from "./assets/PIC1.jpg";

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === "admin" && password === "admin123") {
      onLogin();
    } else {
      alert("Invalid credentials. Use admin/admin123");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ECFAE8",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Main container */}
      <div
        style={{
          display: "flex",
          width: "900px",
          height: "550px",
          borderRadius: "4px",
          overflow: "hidden",
          boxShadow: "0 10px 40px rgba(0, 0, 0, 0.1)",
          backgroundColor: "white",
        }}
      >
        {/* Left side - Login form */}
        <div
          style={{
            flex: 1,
            padding: "60px 50px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <h2
            style={{
              color: "#63A361",
              fontSize: "20px",
              fontWeight: "bold",
              textAlign: "center",
              marginBottom: "10px",
            }}
          >
            WELCOME TO
          </h2>
          <h1
            style={{
              color: "#111827",
              fontSize: "28px",
              fontWeight: "bold",
              textAlign: "center",
              marginBottom: "30px",
            }}
          >
            Scholarship Eligibility Prediction System
          </h1>

          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: "20px" }}>
              <label
                style={{
                  display: "block",
                  color: "#333",
                  fontWeight: "600",
                  marginBottom: "8px",
                  fontSize: "14px",
                }}
              >
                Username
              </label>
              <input
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  borderRadius: "8px",
                  border: "1px solid #d1d5db",
                  outline: "none",
                  fontSize: "14px",
                }}
              />
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label
                style={{
                  display: "block",
                  color: "#333",
                  fontWeight: "600",
                  marginBottom: "8px",
                  fontSize: "14px",
                }}
              >
                Password
              </label>
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  borderRadius: "8px",
                  border: "1px solid #d1d5db",
                  outline: "none",
                  fontSize: "14px",
                }}
              />
            </div>

            <button
              type="submit"
              style={{
                width: "100%",
                backgroundColor: "#63A361",
                color: "white",
                fontWeight: "600",
                padding: "12px",
                borderRadius: "8px",
                border: "none",
                fontSize: "14px",
                cursor: "pointer",
                marginTop: "10px",
                transition: "0.3s",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#658C58")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#63A361")}
            >
              Sign In
            </button>
          </form>

          <p
            style={{
              textAlign: "center",
              color: "#666",
              fontSize: "13px",
              marginTop: "20px",
            }}
          >
            Demo credentials: admin / admin123
          </p>
        </div>

        {/* Right side - Image overlay */}
        <div
          style={{
            flex: 1,
            backgroundImage: `linear-gradient(rgba(62, 177, 105, 0.8), rgba(44, 89, 59, 0.8)), url(${bgImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
            padding: "40px",
            textAlign: "center",
          }}
        >
          {/* Logo */}
          <img
            src="/assets/logo.png"
            alt="SEPS Logo"
            style={{
              width: "150px",
              height: "150px",
              marginBottom: "0px",
              borderRadius: "10px",
            }}
          />

          <h1
            style={{
              fontSize: "36px",
              fontWeight: "bold",
              marginBottom: "10px",
            }}
          >
            SEPS
          </h1>
          <p style={{ fontSize: "15px", lineHeight: "1.6", maxWidth: "300px" }}>
            Log in and be part of the system that makes scholarship prediction
            easier for students of Caraga State University.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
