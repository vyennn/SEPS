import { useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { FiHome, FiFilter, FiUserCheck, FiBarChart2 } from "react-icons/fi";

// Profile picture URLs from the public/assets folder
const profilePics = [
  "/assets/PIC2.jpg",
  "/assets/PIC3.jpg",
  "/assets/PIC4.jpg",
  "/assets/PIC5.jpg",
  "/assets/PIC6.jpg",
  "/assets/PIC7.jpg",
  "/assets/PIC8.jpg",
];

const Sidebar = ({ currentPage, setCurrentPage, onLogout }) => {
  const [selectedPic, setSelectedPic] = useState(profilePics[0]);
  const [showPicOptions, setShowPicOptions] = useState(false);

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: <FiHome /> },
    { id: "filter", label: "Filter Data", icon: <FiFilter /> },
    { id: "eligible", label: "Eligible Students", icon: <FiUserCheck /> },
    { id: "analysis", label: "Data Analysis", icon: <FiBarChart2 /> },
  ];

  return (
    <div
      style={{
        width: "260px",
        background: "linear-gradient(180deg, #e8f5e9 0%, #c8e6c9 100%)",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        borderRight: "1px solid #d0e6d0",
        boxShadow: "2px 0 6px rgba(0,0,0,0.05)",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      {/* === HEADER / PROFILE === */}
      <div
        style={{
          padding: "25px 15px",
          borderBottom: "1px solid rgba(0,0,0,0.05)",
          textAlign: "center",
        }}
      >
        {/* Profile Picture */}
        <div
          style={{
            width: "75px",
            height: "75px",
            borderRadius: "50%",
            overflow: "hidden",
            margin: "0 auto 10px auto",
            border: "2px solid #4caf50",
            cursor: "pointer",
            transition: "0.3s",
          }}
          onClick={() => setShowPicOptions(!showPicOptions)}
        >
          <img
            src={selectedPic}
            alt="Profile"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "0.3s",
            }}
          />
        </div>

        <p
          style={{
            color: "#2f5d3f",
            fontWeight: "600",
            fontSize: "14px",
            margin: "5px 0 0 0",
            letterSpacing: "0.5px",
          }}
        >
          ADMIN
        </p>

        {/* Picture Selection */}
        {showPicOptions && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: "8px",
              marginTop: "12px",
            }}
          >
            {profilePics.map((pic, idx) => (
              <div
                key={idx}
                onClick={() => {
                  setSelectedPic(pic);
                  setShowPicOptions(false);
                }}
                style={{
                  width: "38px",
                  height: "38px",
                  borderRadius: "50%",
                  overflow: "hidden",
                  border:
                    selectedPic === pic
                      ? "2px solid #4caf50"
                      : "1px solid #d1d5db",
                  cursor: "pointer",
                }}
              >
                <img
                  src={pic}
                  alt={`Profile ${idx}`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* === MENU === */}
      <nav style={{ flex: 1, padding: "20px 0" }}>
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setCurrentPage(item.id)}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "12px 22px",
              color: currentPage === item.id ? "#2f5d3f" : "#3b3b3b",
              background:
                currentPage === item.id ? "rgba(99,163,97,0.2)" : "transparent",
              border: "none",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: currentPage === item.id ? "600" : "500",
              transition: "0.3s",
              textAlign: "left",
            }}
          >
            <span style={{ fontSize: "17px" }}>{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      {/* === LOGOUT === */}
      <div
        style={{
          padding: "15px 20px",
          borderTop: "1px solid rgba(0,0,0,0.05)",
          backgroundColor: "rgba(255,255,255,0.4)",
        }}
      >
        <button
          onClick={onLogout}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "10px 15px",
            color: "#2f5d3f",
            border: "none",
            background: "transparent",
            cursor: "pointer",
            fontSize: "13px",
            fontWeight: "600",
            borderRadius: "8px",
            transition: "0.2s",
          }}
          onMouseEnter={(e) => (e.target.style.background = "#e6f3e7")}
          onMouseLeave={(e) => (e.target.style.background = "transparent")}
        >
          <FiArrowLeft />
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
