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
  const [batches, setBatches] = useState([]);

  // Login
  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage("dashboard");
  };

  // Save batch + date & time
  const addBatch = (batchName, fileName, studentList) => {
    const approved = studentList.filter(s => s.status === "Approved").length;
    const rejected = studentList.filter(s => s.status === "Rejected").length;

    const now = new Date();

    const newBatch = {
      name: batchName,
      fileName,
      students: studentList,
      total: studentList.length,
      approved,
      rejected,
      rate:
        studentList.length > 0
          ? `${Math.round((approved / studentList.length) * 100)}%`
          : "0%",
      status: approved > 0 ? "Completed" : "Processing",
      date: now.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      time: now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setBatches(prev => [...prev, newBatch]);
  };

  // Add student manually
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

    setStudents(prev => [...prev, newStudent]);
    setShowForm(false);
  };

  if (!isLoggedIn) return <LoginPage onLogin={handleLogin} />;

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#f8fafc" }}>
      <Sidebar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        onLogout={handleLogout}
      />

      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <header
          style={{
            background: "#63A361",
            color: "white",
            padding: "12px 20px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <img
              src="/assets/logo.png"git commit -"name sa changes"
              alt="Logo"
              style={{
                width: "50px",
                height: "50px",
                objectFit: "contain",
                borderRadius: "5px",
              }}
            />
            <h1 style={{ fontSize: "25px", fontWeight: "bold", margin: 0, fontFamily: "sans-serif" }}>
              Scholarship Eligibility Prediction System
            </h1>
          </div>
        </header>

        <main style={{ flex: 1, overflow: "auto" }}>
          {currentPage === "dashboard" && (
            <Dashboard batches={batches} setBatches={setBatches} />
          )}

          {currentPage === "filter" && (
            <FilterData
              students={students}
              setStudents={setStudents}
              setShowForm={setShowForm}
              addBatch={addBatch}
              batchNumber={batches.length + 1}
            />
          )}

          {/* ⭐ Pass batches to EligibleStudents */}
          {currentPage === "eligible" && <EligibleStudents batches={batches} />}

          {/* ⭐ Pass batches to DataAnalysis */}
          {currentPage === "analysis" && <DataAnalysis batches={batches} />}
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
