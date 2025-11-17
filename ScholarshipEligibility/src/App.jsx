import { useState } from "react";
import LoginPage from "./LoginPage";
import Sidebar from "./Sidebar";
import Dashboard from "./Dashboard";
import FilterData from "./FilterData";
import EligibleStudents from "./EligibleStudents";
import DataAnalysis from "./DataAnalysis";
import StudentForm from "./StudentForm";
import BatchRecords from "./BatchRecords";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [showForm, setShowForm] = useState(false);

  const [students, setStudents] = useState([]);
  const [batches, setBatches] = useState([]);
  const [currentBatchName, setCurrentBatchName] = useState(""); // Track active batch

  // Login
  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage("dashboard");
  };

  // Save batch + date & time
  const addBatch = (batchName, fileName, studentList) => {
    const approved = studentList.filter((s) => s.status === "Approved").length;
    const rejected = studentList.filter((s) => s.status === "Rejected").length;

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

    setBatches((prev) => [...prev, newBatch]);
    setCurrentBatchName(batchName); // Update current batch
  };

  const handleStudentSubmit = (formData) => {
    // Use the current batch name from FilterData
    const batchName = currentBatchName || `Batch ${batches.length + 1}`;
    const gpa = parseFloat(formData.gpa);
    const income = parseInt(formData.parentIncome);

    const status =
      (gpa <= 1.25 && income <= 40000) || (gpa <= 3.0 && income <= 25000)
        ? "Approved"
        : "Rejected";

    const newStudent = {
      id: formData.schoolId,
      name: `${formData.firstName} ${formData.lastName}`,
      gpa,
      income,
      need: income <= 10000 ? "High" : income <= 25000 ? "Medium" : "Low",
      status,
      college: formData.college,
      program: formData.program,
      year: formData.yearLevel,
      batch: batchName,
    };

    // Add to students state
    setStudents((prev) => [...prev, newStudent]);

    // **Update existing batch if exists, else create new**
    setBatches((prev) => {
      const batchIndex = prev.findIndex((b) => b.name === batchName);
      if (batchIndex >= 0) {
        // Update existing batch
        const updatedBatch = { ...prev[batchIndex] };
        updatedBatch.students = [...updatedBatch.students, newStudent];
        updatedBatch.total = updatedBatch.students.length;
        updatedBatch.approved = updatedBatch.students.filter(
          (s) => s.status === "Approved"
        ).length;
        updatedBatch.rejected = updatedBatch.students.filter(
          (s) => s.status === "Rejected"
        ).length;
        updatedBatch.rate =
          updatedBatch.students.length > 0
            ? `${Math.round(
                (updatedBatch.approved / updatedBatch.students.length) * 100
              )}%`
            : "0%";
        updatedBatch.status =
          updatedBatch.approved > 0 ? "Completed" : "Processing";

        const newBatches = [...prev];
        newBatches[batchIndex] = updatedBatch;
        return newBatches;
      } else {
        // Create new batch if it doesn't exist
        const now = new Date();
        return [
          ...prev,
          {
            name: batchName,
            fileName: "Manual Entry",
            students: [newStudent],
            total: 1,
            approved: status === "Approved" ? 1 : 0,
            rejected: status === "Rejected" ? 1 : 0,
            rate: status === "Approved" ? "100%" : "0%",
            status: "Completed",
            date: now.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            }),
            time: now.toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            }),
          },
        ];
      }
    });

    setShowForm(false);
  };

  if (!isLoggedIn) return <LoginPage onLogin={handleLogin} />;

  return (
    <div style={{ 
      display: "flex", 
      height: "100vh", 
      backgroundColor: "#f8fafc", 
      overflow: "hidden" 
      }}
    >
    <Sidebar
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      onLogout={handleLogout}
    />
    <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, height: "100vh", overflow: "hidden" }}>
    <header style={{ background: "#63A361", color: "white", padding: "12px 20px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", position: "sticky",
        top: 0,
        zIndex: 10,
      }}
    >
    <div style={{ 
      display: "flex", 
      alignItems: "center", 
      gap: "4px" 
      }}
    >
    <img
      src="/assets/logo.png"
      alt="Logo"
      style={{
        width: "50px",
        height: "50px",
        objectFit: "contain",
        borderRadius: "5px",
        }}
        />
      <h1 style={{ 
        fontSize: "25px", 
        fontWeight: "bold", 
        margin: 0, 
        fontFamily: "sans-serif" 
      }}>
        Scholarship Eligibility Prediction System
      </h1>
    </div>
  </header>
  <main style={{ 
    flex: 1, 
    overflow: "auto" 
  }}>
  {currentPage === "dashboard" && (
    <Dashboard batches={batches} setBatches={setBatches} />
  )}
  {currentPage === "filter" && (
    <FilterData
      students={students}
      setStudents={setStudents}
      addBatch={addBatch}
      batchNumber={batches.length + 1}
      setBatches={setBatches}
      currentBatchName={currentBatchName}
      setCurrentBatchName={setCurrentBatchName}
      onStudentAdd={handleStudentSubmit}
    />          
  )}
  {currentPage === "eligible" && (
    <EligibleStudents batches={batches} />
  )}
  {currentPage === "records" && (
    <BatchRecords batches={batches} />
  )}
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
