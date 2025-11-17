import { useState, useRef } from "react";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import {
  FaGraduationCap,
  FaSearch,
  FaFileExcel,
  FaPrint,
} from "react-icons/fa";

const BatchRecords = ({ batches = [] }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [selectedBatch, setSelectedBatch] = useState("All Batches");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [searchTerm, setSearchTerm] = useState("");
  const printRef = useRef();

  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError("");
    if (username === "admin" && password === "admin123") {
      setIsAuthenticated(true);
    } else {
      setLoginError("Invalid username or password. Please try again.");
      setPassword("");
    }
  };

  if (!isAuthenticated) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          fontFamily: "Poppins, sans-serif",
        }}
      >
        <header
          style={{
            height: "70px",
            backgroundColor: "#0B4F36",
            color: "white",
            display: "flex",
            alignItems: "center",
            padding: "0 25px",
            fontWeight: "bold",
            fontSize: "22px",
            borderRadius: "0 0 20px 20px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
          }}
        >
          <FaGraduationCap size={40} style={{ marginRight: "15px" }} />
          Scholarship Eligibility Prediction System
        </header>

        <div
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#f5f5f5",
            padding: 20,
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              borderRadius: 15,
              padding: 30,
              boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
              maxWidth: 450,
              width: "100%",
            }}
          >
            <div style={{ textAlign: "center", marginBottom: 20 }}>
              <div
                style={{
                  width: 60,
                  height: 60,
                  backgroundColor: "#059669",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 15px",
                  fontSize: 30,
                  color: "white",
                }}
              >
                🔒
              </div>
              <h2 style={{ fontSize: 20, color: "#1f2937", marginBottom: 5 }}>
                Authentication Required
              </h2>
              <p style={{ fontSize: 13, color: "#374151" }}>
                Enter your credentials to access batch records
              </p>
            </div>
            <div style={{ marginBottom: 20 }}>
              <label
                style={{
                  fontWeight: 600,
                  color: "#374151",
                  marginBottom: 5,
                  display: "block",
                }}
              >
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLogin(e)}
                placeholder="Enter username"
                style={{
                  width: "100%",
                  padding: 12,
                  border: "1px solid #D1D5DB",
                  borderRadius: 10,
                  fontSize: 14,
                  boxSizing: "border-box",
                }}
              />
            </div>
            <div style={{ marginBottom: 20 }}>
              <label
                style={{
                  fontWeight: 600,
                  color: "#374151",
                  marginBottom: 5,
                  display: "block",
                }}
              >
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLogin(e)}
                placeholder="Enter password"
                style={{
                  width: "100%",
                  padding: 12,
                  border: "1px solid #D1D5DB",
                  borderRadius: 10,
                  fontSize: 14,
                  boxSizing: "border-box",
                }}
              />
            </div>
            {loginError && (
              <div
                style={{
                  backgroundColor: "#fee2e2",
                  border: "1px solid #ef4444",
                  borderRadius: 8,
                  padding: 10,
                  marginBottom: 15,
                  textAlign: "center",
                }}
              >
                <p style={{ color: "#991b1b", fontSize: 12, margin: 0 }}>
                  ❌ {loginError}
                </p>
              </div>
            )}
            <button
              onClick={handleLogin}
              style={{
                width: "100%",
                backgroundColor: "#F0B400",
                color: "white",
                border: "none",
                padding: 12,
                borderRadius: 10,
                fontSize: 15,
                fontWeight: "700",
                fontFamily: "Poppins, sans-serif",
                letterSpacing: "1px",
                cursor: "pointer",
                marginTop: 3,
                transition: "all 0.2s",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#d7a700")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#F0B400")}
            >
              Login
            </button>
            <div
              style={{
                marginTop: 15,
                textAlign: "center",
                fontSize: 12,
                color: "#6b7280",
              }}
            >
              <strong>Demo:</strong> admin / admin123
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Prepare filter options
  const batchOptions = ["All Batches", ...batches.map((b) => b.name)];

  // Prepare student records
  const allStudents = batches
    .filter(
      (batch) => selectedBatch === "All Batches" || batch.name === selectedBatch
    )
    .flatMap((batch) =>
      batch.students.map((student) => ({ ...student, batch: batch.name }))
    );

  // Status Filter
  const statusFiltered =
    selectedStatus === "All Status"
      ? allStudents
      : allStudents.filter((s) => s.status === selectedStatus);

  // Search Term
  const searched = statusFiltered.filter((s) => {
    const term = searchTerm.toLowerCase();
    return (
      (s.id && s.id.toLowerCase().includes(term)) ||
      (s.name && s.name.toLowerCase().includes(term)) ||
      (s.college && s.college.toLowerCase().includes(term)) ||
      (s.program && s.program.toLowerCase().includes(term))
    );
  });

  // Excel Export
  const exportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(searched);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Batch Records");
    XLSX.writeFile(workbook, "Batch_Records.xlsx");
  };

  // Print
  const handlePrint = () => {
    const printContents = printRef.current.innerHTML;
    const newWindow = window.open("", "", "width=900,height=650");
    newWindow.document.write(`
      <html>
        <head>
          <title>Print Batch Records</title>
          <style>
            body { font-family: Poppins, sans-serif; margin: 20px; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid black; padding: 8px; text-align: center; color: black; }
            th { background-color: #F0B400; color: white; }
          </style>
        </head>
        <body>${printContents}</body>
      </html>
    `);
    newWindow.document.close();
    newWindow.focus();
    newWindow.print();
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      {/* HEADER */}
      <header
        style={{
          height: "70px",
          backgroundColor: "#0B4F36",
          color: "white",
          display: "flex",
          alignItems: "center",
          padding: "0 25px",
          fontWeight: "bold",
          fontSize: "22px",
          borderRadius: "0 0 20px 20px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
          position: "sticky",
          top: 0,
          zIndex: 1000,
        }}
      >
        <FaGraduationCap size={40} style={{ marginRight: "15px" }} />
        Scholarship Eligibility Prediction System
      </header>

      <main
        style={{
          flex: 1,
          overflowY: "auto",
          padding: 22,
          backgroundColor: "#f5f5f5",
        }}
      >
        <h2
          style={{
            fontSize: 20,
            fontWeight: 700,
            marginBottom: 16,
            color: "#065F46",
          }}
        >
          Eligible Students - {selectedBatch}
        </h2>

        {/* FILTER ROW */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 22,
            flexWrap: "wrap",
          }}
        >
          <select
            value={selectedBatch}
            onChange={(e) => setSelectedBatch(e.target.value)}
            style={{
              padding: "10px 18px",
              borderRadius: 12,
              border: "1px solid #D1D5DB",
              fontWeight: 600,
              fontSize: 15,
              background: "#fff",
              color: "#065F46",
              minWidth: 135,
              boxShadow: "0 1px 2px rgba(0,0,0,0.07)",
            }}
          >
            {batchOptions.map((b, i) => (
              <option key={i} value={b}>
                {b}
              </option>
            ))}
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            style={{
              padding: "10px 18px",
              borderRadius: 12,
              border: "1px solid #D1D5DB",
              fontWeight: 600,
              fontSize: 15,
              background: "#fff",
              color: "#065F46",
              minWidth: 135,
              boxShadow: "0 1px 2px rgba(0,0,0,0.07)",
            }}
          >
            <option>All Status</option>
            <option>Approved</option>
            <option>Rejected</option>
          </select>

          <div style={{ position: "relative", flexBasis: 220 }}>
            <input
              type="text"
              placeholder="Enter School ID or Name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: "100%",
                padding: "10px 36px 10px 14px",
                borderRadius: 12,
                border: "1px solid #D1D5DB",
                fontSize: 15,
                background: "#fff",
              }}
            />
            <FaSearch
              style={{
                position: "absolute",
                right: 13,
                top: "50%",
                transform: "translateY(-50%)",
                color: "#FACC15",
              }}
            />
          </div>

          <button
            onClick={exportExcel}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 5,
              padding: "10px 18px",
              backgroundColor: "#FACC15",
              color: "#0B4F36",
              borderRadius: 12,
              fontWeight: 600,
              border: "none",
              cursor: "pointer",
              minWidth: 130,
              fontSize: 15,
            }}
          >
            <FaFileExcel /> Export Excel
          </button>
          <button
            onClick={handlePrint}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 5,
              padding: "10px 18px",
              backgroundColor: "#FACC15",
              color: "#0B4F36",
              borderRadius: 12,
              fontWeight: 600,
              border: "none",
              cursor: "pointer",
              minWidth: 130,
              fontSize: 15,
            }}
          >
            <FaPrint /> Print
          </button>
        </div>

        {/* TABLE */}
        <div
          ref={printRef}
          style={{
            background: "white",
            borderRadius: "15px",
            padding: 20,
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            marginBottom: 20,
          }}
        >
          <h2
            style={{
              fontSize: 18,
              fontWeight: 700,
              color: "#065F46",
              marginBottom: 15,
            }}
          >
            Student Records
          </h2>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "13px",
              fontFamily: "Poppins, sans-serif",
              background: "#fff",
              borderRadius: "8px 8px 0 0",
              boxShadow: "0 2px 7px rgba(34,85,69,0.11)",
              overflow: "hidden",
            }}
          >
            <thead>
              <tr
                style={{
                  backgroundColor: "#F0B400",
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: "15px",
                  height: "34px",
                }}
              >
                <th
                  style={{
                    padding: "10px 0",
                    textAlign: "center",
                    borderTopLeftRadius: "8px",
                  }}
                >
                  No.
                </th>
                <th style={{ padding: "10px 0", textAlign: "center" }}>
                  Batch
                </th>
                <th style={{ padding: "10px 0", textAlign: "center" }}>
                  Student ID
                </th>
                <th style={{ padding: "10px 0", textAlign: "center" }}>Name</th>
                <th style={{ padding: "10px 0", textAlign: "center" }}>
                  College
                </th>
                <th style={{ padding: "10px 0", textAlign: "center" }}>
                  Program
                </th>
                <th style={{ padding: "10px 0", textAlign: "center" }}>Year</th>
                <th style={{ padding: "10px 0", textAlign: "center" }}>GPA</th>
                <th style={{ padding: "10px 0", textAlign: "center" }}>
                  Income
                </th>
                <th style={{ padding: "10px 0", textAlign: "center" }}>
                  Financial Need
                </th>
                <th
                  style={{
                    padding: "10px 0",
                    textAlign: "center",
                    borderTopRightRadius: "8px",
                  }}
                >
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {searched.length === 0 ? (
                <tr>
                  <td
                    colSpan="11"
                    style={{
                      textAlign: "center",
                      padding: "32px",
                      fontSize: "15px",
                      color: "#888",
                    }}
                  >
                    No records found. Try adjusting your filters.
                  </td>
                </tr>
              ) : (
                searched.map((s, i) => (
                  <tr
                    key={i}
                    style={{
                      borderBottom: "1px solid #E5E7EB",
                      background: i % 2 === 0 ? "#fcfcfc" : "#fff",
                    }}
                  >
                    <td style={{ padding: "8px 2px", textAlign: "center" }}>
                      {i + 1}
                    </td>
                    <td style={{ padding: "8px 2px", textAlign: "center" }}>
                      {s.batch}
                    </td>
                    <td style={{ padding: "8px 2px", textAlign: "center" }}>
                      {s.id}
                    </td>
                    <td style={{ padding: "8px 2px", textAlign: "center" }}>
                      {s.name || "-"}
                    </td>
                    <td style={{ padding: "8px 2px", textAlign: "center" }}>
                      {s.college || "-"}
                    </td>
                    <td style={{ padding: "8px 2px", textAlign: "center" }}>
                      {s.program || "-"}
                    </td>
                    <td style={{ padding: "8px 2px", textAlign: "center" }}>
                      {s.year || "-"}
                    </td>
                    <td style={{ padding: "8px 2px", textAlign: "center" }}>
                      {s.gpa || "-"}
                    </td>
                    <td style={{ padding: "8px 2px", textAlign: "center" }}>
                      ₱{s.income || "-"}
                    </td>
                    <td style={{ padding: "8px 2px", textAlign: "center" }}>
                      {s.need || "-"}
                    </td>
                    <td
                      style={{
                        padding: "8px 2px",
                        textAlign: "center",
                        fontWeight: 600,
                        color:
                          s.status === "Approved"
                            ? "#059669"
                            : s.status === "Rejected"
                            ? "#ef4444"
                            : "#374151",
                      }}
                    >
                      {s.status}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default BatchRecords;
