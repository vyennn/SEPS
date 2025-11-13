import { useState } from "react";
import { FiArrowLeft } from "react-icons/fi";

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
    { id: "dashboard", label: "Dashboard" },
    { id: "filter", label: "Filter Data" },
    { id: "eligible", label: "Eligible Students by batch" },
    { id: "analysis", label: "Data Analysis Part" },
  ];

  return (
    <div
      style={{
        width: "270px",
        background: "#63A361",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        boxShadow: "2px 0 10px rgba(0,0,0,0.1)",
      }}
    >
      {/* Profile Section */}
      <div
        style={{
          padding: "20px",
          borderBottom: "1px solid rgba(255,255,255,0.2)",
          textAlign: "center",
          fontFamily: "Arial, sans-serif",
        }}
      >
        {/* Profile Picture */}
        <div
          style={{
            width: "70px",
            height: "70px",
            borderRadius: "50%",
            overflow: "hidden",
            margin: "0 auto 10px auto",
            border: "2px solid white",
            cursor: "pointer",
          }}
          onClick={() => setShowPicOptions(!showPicOptions)}
        >
          <img
            src={selectedPic}
            alt="Profile"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>

        <p style={{ color: "white", fontWeight: "bold", fontSize: "14px", margin: 0 }}>
          ADMIN
        </p>

        {/* Profile Picture Choices */}
        {showPicOptions && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "10px",
              marginTop: "10px",
              flexWrap: "wrap",
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
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  overflow: "hidden",
                  border: selectedPic === pic ? "2px solid white" : "none",
                  cursor: "pointer",
                }}
              >
                <img
                  src={pic}
                  alt={`Profile ${idx}`}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Menu */}
      <nav style={{ flex: 1, padding: "20px 0" }}>
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setCurrentPage(item.id)}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: "15px",
              padding: "13px 20px",
              color: "white",
              border: "none",
              background:
                currentPage === item.id ? "rgba(255,255,255,0.2)" : "transparent",
              cursor: "pointer",
              fontSize: "15px",
              borderLeft: currentPage === item.id ? "4px solid white" : "none",
              fontFamily: "sans-serif",
            }}
          >
            <span style={{ fontSize: "16px" }}>{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Logout */}
      <div
        style={{
          padding: "15px",
          borderTop: "1px solid rgba(255,255,255,0.2)",
        }}
      >
        <button
          onClick={onLogout}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "12px 20px",
            color: "white",
            border: "none",
            background: "transparent",
            cursor: "pointer",
            fontSize: "13px",
            fontWeight: "100",
            fontFamily: "sans-serif"
          }}
        >
          <FiArrowLeft style={{ marginRight: "1px" }} />
          <span style={{ fontSize: "16px" }}>Log Out</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
