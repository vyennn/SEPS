import { useState } from "react";
import bgImage from "./assets/PIC1.jpg";
import logo from "./assets/logo.png";

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
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",

        // STRONGER GREEN TINT
        backgroundImage: `linear-gradient(rgba(8, 80, 8, 0.35), rgba(8, 80, 8, 0.35)), url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",

        fontFamily: "Arial, sans-serif",
        padding: "40px",
      }}
    >
      {/* LEFT SIDE TEXT */}
      <div
        style={{
          flex: 1,
          color: "white",
          paddingLeft: "60px",
          transform: "translateY(-60px)",
        }}
      >
        <h1
          style={{
            fontSize: "42px",
            fontWeight: "800",
            color: "#0d7515ff",
            maxWidth: "500px",
            fontFamily: "Poppins, sans-serif",
            letterSpacing: "1px",
            lineHeight: "1.2",
            marginBottom: "18px",
          }}
        >
          SCHOLARSHIP ELIGIBILITY <br />
          PREDICTION SYSTEM
        </h1>

        <p
          style={{
            maxWidth: "430px",
            fontSize: "20px",
            lineHeight: "1.7",
            color: "white",
            fontFamily: "Poppins, sans-serif",
            marginTop: "10px",
            textShadow: "0px 0px 6px rgba(0,0,0,0.5)",
          }}
        >
          Log in and access the system that helps predict scholarship
          eligibility for students of Caraga State University- Main Campus.
        </p>
      </div>

      {/* RIGHT SIDE – GLASS BOX */}
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "450px", // WIDER BOX
            padding: "40px 35px",
            borderRadius: "20px",
            backdropFilter: "blur(22px)",
            background: "rgba(255, 255, 255, 0.20)",
            boxShadow: "0 8px 30px rgba(0,0,0,0.28)",
            border: "2px solid rgba(255, 255, 255, 0.4)",
            textAlign: "center",
            height: "auto", // Fit height to content
          }}
        >
          {/* LOGO */}
          <img
            src={logo}
            alt="logo"
            style={{
              width: "90px",
              marginBottom: "10px",
              display: "block",
              marginLeft: "auto",
              marginRight: "auto",
              filter: "brightness(1.3) contrast(1.3)",
            }}
          />

          <h2
            style={{
              color: "#66C06E",
              fontSize: "20px",
              fontWeight: "700",
              marginBottom: "4px",
              fontFamily: "Poppins, sans-serif",
            }}
          >
            WELCOME TO
          </h2>

          <h1
            style={{
              color: "white",
              fontSize: "30px",
              fontWeight: "900",
              marginBottom: "25px",
              letterSpacing: "1px",
              fontFamily: "Poppins, sans-serif",
            }}
          >
            SEPS
          </h1>

          {/* FORM */}
          <form onSubmit={handleLogin} style={{ textAlign: "left" }}>
            <label
              style={{
                color: "white",
                fontWeight: "600",
                fontSize: "14px",
                fontFamily: "Poppins, sans-serif",
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
                padding: "12px 15px",
                borderRadius: "10px",
                marginBottom: "18px",
                border: "1px solid rgba(255,255,255,0.5)",
                background: "rgba(255,255,255,0.8)",
                outline: "none",
                fontSize: "14px",
              }}
            />

            <label
              style={{
                color: "white",
                fontWeight: "600",
                fontSize: "14px",
                fontFamily: "Poppins, sans-serif",
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
                padding: "12px 15px",
                borderRadius: "10px",
                marginBottom: "22px",
                border: "1px solid rgba(255,255,255,0.5)",
                background: "rgba(255,255,255,0.8)",
                outline: "none",
                fontSize: "14px",
              }}
            />

            <button
              type="submit"
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "10px",
                backgroundColor: "#62A55B",
                color: "white",
                border: "none",
                fontSize: "15px",
                fontWeight: "600",
                cursor: "pointer",
                transition: "0.3s",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#4F874A")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#62A55B")}
            >
              Sign In
            </button>
          </form>

          <p
            style={{
              textAlign: "center",
              marginTop: "15px",
              fontSize: "12px",
              color: "white",
              opacity: 0.85,
            }}
          >
            Demo credentials: admin / admin123
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
