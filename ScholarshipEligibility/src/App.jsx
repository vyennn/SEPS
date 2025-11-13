import { useState } from "react";
import LoginPage from "./LoginPage";
import Sidebar from "./Sidebar";
import Dashboard from "./Dashboard";
import FilterData from "./FilterData";
import EligibleStudents from "./EligibleStudents";
import DataAnalysis from "./DataAnalysis";
import StudentForm from "./StudentForm";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [showForm, setShowForm] = useState(false);
  const [students, setStudents] = useState([]);
  const [batches, setBatches] = useState([
    {
      name: "Batch 1",
      total: 0,
      approved: 0,
      rejected: 0,
      rate: "0%",
      status: "Processing",
      date: "Nov 12, 2025",
    },
  ]);

  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage("dashboard");
  };

  const handleStudentSubmit = (formData) => {
    const newStudent = {
      name: `${formData.firstName} ${formData.lastName}`,
      gpa: parseFloat(formData.gpa),
      income: parseInt(formData.parentIncome),
      need: "High",
      status:
        (parseFloat(formData.gpa) <= 1.25 &&
          parseInt(formData.parentIncome) <= 40000) ||
        (parseFloat(formData.gpa) <= 3.0 &&
          parseInt(formData.parentIncome) <= 25000)
          ? "Approved"
          : "Rejected",
    };
    setStudents([...students, newStudent]);
    setShowForm(false);
  };

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "#f8fafc",
      }}
    >
      <Sidebar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        onLogout={handleLogout}
      />

      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {/* ✅ NEW HEADER DESIGN (no dark green bar) */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "25px 30px 10px 30px",
            borderBottom: "1px solid #e5e7eb",
            background: "transparent",
          }}
        >
          <img
            src="/assets/logo.png"
            alt="Logo"
            style={{
              width: "55px",
              height: "55px",
              objectFit: "contain",
            }}
          />
          <h1
            style={{
              fontSize: "26px",
              fontWeight: "bold",
              color: "#2e7d32", // nice green text
              fontFamily: "'Poppins', sans-serif",
              margin: 0,
            }}
          >
            Scholarship Eligibility Prediction System
          </h1>
        </div>

        <main style={{ flex: 1, overflow: "auto" }}>
          {currentPage === "dashboard" && (
            <Dashboard batches={batches} students={students} />
          )}
          {currentPage === "filter" && (
            <FilterData
              students={students}
              setStudents={setStudents}
              setShowForm={setShowForm}
            />
          )}
          {currentPage === "eligible" && <EligibleStudents />}
          {currentPage === "analysis" && <DataAnalysis />}
        </main>
      </div>

      {showForm && (
        <StudentForm
          onClose={() => setShowForm(false)}
          onSubmit={handleStudentSubmit}
        />
      )}
    </div>
  );
};

export default App;
