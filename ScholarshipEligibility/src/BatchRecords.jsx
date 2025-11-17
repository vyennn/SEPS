import { useState, useRef } from "react";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";

const BatchRecords = ({ batches = [] }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  
  const [selectedBatch, setSelectedBatch] = useState("All Batches");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [searchTerm, setSearchTerm] = useState("");
  const printRef = useRef();

  // Handle login
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

  // If not authenticated, show login screen
  if (!isAuthenticated) {
    return (
      <div style={{ 
        padding: 20, 
        flex: 1, 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center",
        backgroundColor: "#f3f4f6"
      }}>
        <div style={{
          backgroundColor: "white",
          borderRadius: 12,
          padding: 30,
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          maxWidth: 450,
          width: "100%",
          border: "2px solid #63A361"
        }}>
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: 20 }}>
            <div style={{
              width: 60,
              height: 60,
              backgroundColor: "#63A361",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 15px",
              fontSize: 30
            }}>
              🔒
            </div>
            <h2 style={{ 
              fontSize: 20, 
              color: "#1f2937", 
              marginBottom: 1,
              fontFamily: "sans-serif"
            }}>
              Authentication Required
            </h2>
          </div>

          {/* Security Notice */}
          <div style={{
            backgroundColor: "#fef3c7",
            border: "1px solid #fbbf24",
            borderRadius: 8,
            padding: 12,
            marginBottom: 20
          }}>
            <p style={{
              color: "#92400e",
              fontSize: 11,
              lineHeight: 1.5,
              margin: 0,
              textAlign: "center"
            }}>
              <strong>⚠️ Security Notice:</strong> Need to log in again because this section contains sensitive personal information. Access is restricted to authorized personnel only.
            </p>
          </div>

          {/* Login Form */}
          <div>
            <div style={{ marginBottom: 15 }}>
              <label style={{
                display: "block",
                fontWeight: "600",
                color: "#374151",
                marginBottom: 6,
                fontSize: 13
              }}>
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleLogin(e)}
                placeholder="Enter username"
                style={{
                  width: "100%",
                  padding: 10,
                  border: "1px solid #d1d5db",
                  borderRadius: 6,
                  fontSize: 13,
                  boxSizing: "border-box"
                }}
              />
            </div>

            <div style={{ marginBottom: 20 }}>
              <label style={{
                display: "block",
                fontWeight: "600",
                color: "#374151",
                marginBottom: 6,
                fontSize: 13
              }}>
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleLogin(e)}
                placeholder="Enter password"
                style={{
                  width: "100%",
                  padding: 10,
                  border: "1px solid #d1d5db",
                  borderRadius: 6,
                  fontSize: 13,
                  boxSizing: "border-box"
                }}
              />
            </div>

            {loginError && (
              <div style={{
                backgroundColor: "#fee2e2",
                border: "1px solid #ef4444",
                borderRadius: 6,
                padding: 10,
                marginBottom: 15,
                textAlign: "center"
              }}>
                <p style={{
                  color: "#991b1b",
                  fontSize: 12,
                  margin: 0
                }}>
                  ❌ {loginError}
                </p>
              </div>
            )}

            <button
              onClick={handleLogin}
              style={{
                width: "100%",
                backgroundColor: "#63A361",
                color: "white",
                border: "none",
                padding: 10,
                borderRadius: 6,
                fontSize: 14,
                fontWeight: "600",
                cursor: "pointer",
                transition: "background-color 0.2s"
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = "#527f51"}
              onMouseOut={(e) => e.target.style.backgroundColor = "#63A361"}
            >
              Login to Access Records
            </button>
          </div>

          {/* Demo Credentials Info */}
          <div style={{
            marginTop: 15,
            padding: 10,
            backgroundColor: "#f3f4f6",
            borderRadius: 6,
            textAlign: "center"
          }}>
            <p style={{
              color: "#6b7280",
              fontSize: 11,
              margin: 0,
              lineHeight: 1.4
            }}>
              <strong>Demo:</strong> admin / admin123
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Original BatchRecords component logic (after authentication)
  const uniqueBatches = ["All Batches", ...batches.map(b => b.name)];
  const allStudents = batches.flatMap(batch =>
    batch.students.map(student => ({ ...student, batch: batch.name }))
  );

  const batchFiltered =
    selectedBatch === "All Batches"
      ? allStudents
      : allStudents.filter(s => s.batch === selectedBatch);

  const statusFiltered =
    selectedStatus === "All Status"
      ? batchFiltered
      : batchFiltered.filter(s => s.status === selectedStatus);

  const searched = statusFiltered.filter(s => {
    const term = searchTerm.toLowerCase();
    return (
      (s.id && s.id.toLowerCase().includes(term)) ||
      (s.name && s.name.toLowerCase().includes(term)) ||
      (s.college && s.college.toLowerCase().includes(term)) ||
      (s.program && s.program.toLowerCase().includes(term))
    );
  });

  const totalStudents = searched.length;
  const approvedCount = searched.filter(s => s.status === "Approved").length;
  const rejectedCount = searched.filter(s => s.status === "Rejected").length;

  const exportExcel = () => {
    const exportData = searched.map(s => ({
      "Batch": s.batch,
      "Student ID": s.id,
      "First Name": s.firstName || "-",
      "Middle Name": s.middleName || "-",
      "Last Name": s.lastName || "-",
      "Name Suffix": s.nameSuffix || "-",
      "College": s.college || "-",
      "Program": s.program || "-",
      "Year Level": s.year || "-",
      "Birthdate": s.birthdate || "-",
      "Age": s.age || "-",
      "Sex": s.sex || "-",
      "Marital Status": s.maritalStatus || "-",
      "Email": s.email || "-",
      "Contact Number": s.contactNumber || "-",
      "Purok/Street": s.purokStreet || "-",
      "Barangay": s.barangay || "-",
      "City": s.city || "-",
      "Province": s.province || "-",
      "Father First Name": s.fatherFirstName || "-",
      "Father Middle Name": s.fatherMiddleName || "-",
      "Father Last Name": s.fatherLastName || "-",
      "Father Name Suffix": s.fatherNameSuffix || "-",
      "Father Occupation": s.fatherOccupation || "-",
      "Mother First Name": s.motherFirstName || "-",
      "Mother Middle Name": s.motherMiddleName || "-",
      "Mother Last Name": s.motherLastName || "-",
      "Mother Name Suffix": s.motherNameSuffix || "-",
      "Mother Occupation": s.motherOccupation || "-",
      "GPA": s.gpa || "-",
      "Parent Income": s.income || "-",
      "Status": s.status,
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Batch Records");
    XLSX.writeFile(workbook, `Batch_Records_${selectedBatch}.xlsx`);
  };

  const exportPDF = () => {
    const doc = new jsPDF("landscape");
    const tableRows = searched.map((s, i) => [
      i + 1,
      s.batch,
      s.id,
      s.name || "-",
      s.college || "-",
      s.program || "-",
      s.year || "-",
      s.gpa || "-",
      s.income || "-",
      s.status,
    ]);

    doc.text(`Batch Records - ${selectedBatch}`, 14, 15);
    doc.autoTable({
      head: [["#", "Batch", "Student ID", "Name", "College", "Program", "Year", "GPA", "Income", "Status"]],
      body: tableRows,
      startY: 20,
      theme: "grid",
      headStyles: { fillColor: [99, 163, 97], textColor: 255 },
      styles: { fontSize: 8 },
    });
    doc.save(`Batch_Records_${selectedBatch}.pdf`);
  };

  const handlePrint = () => {
    const printContents = printRef.current.innerHTML;
    const newWindow = window.open("", "", "width=1200,height=800");
    newWindow.document.write(`
      <html>
        <head>
          <title>Print Batch Records</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            h1, h2 { text-align: center; color: black; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; font-size: 10px; }
            th, td { border: 1px solid black; padding: 6px; text-align: center; color: black; }
            th { background-color: #63A361; color: white; }
          </style>
        </head>
        <body>
          ${printContents}
        </body>
      </html>
    `);
    newWindow.document.close();
    newWindow.focus();
    newWindow.print();
  };

  return (
    <div style={{ 
      padding: 20, 
      flex: 1,
      display: "flex", 
      flexDirection: "column", 
      overflow: "hidden",
      maxWidth: "100%" 
      }}
    >
    <div style={{ 
      display: "flex", 
      justifyContent: "space-between", 
      alignItems: "center", 
      marginBottom: 5 
      }}
    >
    <h2 style={{ 
      fontSize: 24, 
      color: "#1f2937", 
      textAlign: "center", 
      fontFamily: "sans-serif", 
      flex: 1 
      }}
    >
    BATCH RECORDS
    </h2>
    </div>
      <p style={{ 
        color: "#666", 
        marginBottom: 10,
        fontSize: 13 
      }}>
      View, search, and export complete student records by batch
      </p>
      
      <div style={{ 
        background: "white", 
        borderRadius: 10, 
        padding: 20, 
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)", 
        marginBottom: 15, 
        border: "2px solid #63A361", 
        minWidth: 0 
      }}
      >
      <div style={{
        display: "flex", 
        gap: 15, 
        flexWrap: "wrap", 
        marginBottom: 15 
      }}
      >
      <div style={{ 
        flex: 1, minWidth: 180 }}>
            <label style={{ display: "block", fontWeight: "bold", color: "#374151", marginBottom: 8, fontSize: 13 }}>
              Select Batch
            </label>
            <select value={selectedBatch} onChange={(e) => setSelectedBatch(e.target.value)} style={{ width: "100%", padding: 8, border: "1px solid #63A361", borderRadius: 5, fontSize: 12 }}>
              {uniqueBatches.map((b, idx) => <option key={idx}>{b}</option>)}
            </select>
          </div>

          <div style={{ flex: 1, minWidth: 180 }}>
            <label style={{ display: "block", fontWeight: "bold", color: "#374151", marginBottom: 8, fontSize: 13 }}>
              Filter by Status
            </label>
            <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)} style={{ width: "100%", padding: 8, border: "1px solid #63A361", borderRadius: 5, fontSize: 12 }}>
              <option>All Status</option>
              <option>Approved</option>
              <option>Rejected</option>
            </select>
          </div>

          <div style={{ flex: 1, minWidth: 180 }}>
            <label style={{ display: "block", fontWeight: "bold", color: "#374151", marginBottom: 8, fontSize: 13 }}>
              Search Records
            </label>
            <input
              type="text"
              placeholder="Search by ID, Name, College..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: "100%", padding: 8, border: "1px solid #63A361", borderRadius: 5, fontSize: 12 }}
            />
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, flexWrap: "wrap" }}>
          <button onClick={exportExcel} style={{ background: "#059669", color: "white", border: "none", padding: "8px 15px", borderRadius: 6, cursor: "pointer", fontSize: 12, fontWeight: 600 }}>
            Export Excel
          </button>
          
          <button onClick={handlePrint} style={{ background: "#3b82f6", color: "white", border: "none", padding: "8px 15px", borderRadius: 6, cursor: "pointer", fontSize: 12, fontWeight: 600 }}>
           Print
          </button>
        </div>
      </div>

      <div style={{ background: "white", borderRadius: 10, padding: 20, boxShadow: "0 2px 5px rgba(0,0,0,0.1)", flex: 1, overflow: "hidden", display: "flex", flexDirection: "column", minWidth: 0 }}>
        <h3 style={{ color: "black", marginBottom: 15, flexShrink: 0 }}>Student Records - {selectedBatch}</h3>
        <div ref={printRef} style={{ flex: 1, overflow: "auto", minWidth: 0 }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11, minWidth: "1000px" }}>
            <thead style={{ position: "sticky", top: 0, zIndex: 1 }}>
              <tr style={{ backgroundColor: "#63A361", color: "white" }}>
                <th style={{ padding: 8, minWidth: 40 }}>#</th>
                <th style={{ padding: 8, minWidth: 100 }}>Batch</th>
                <th style={{ padding: 8, minWidth: 120 }}>Student ID</th>
                <th style={{ padding: 8, minWidth: 150 }}>Name</th>
                <th style={{ padding: 8, minWidth: 120 }}>College</th>
                <th style={{ padding: 8, minWidth: 150 }}>Program</th>
                <th style={{ padding: 8, minWidth: 80 }}>Year</th>
                <th style={{ padding: 8, minWidth: 80 }}>GPA</th>
                <th style={{ padding: 8, minWidth: 100 }}>Income</th>
                <th style={{ padding: 8, minWidth: 100 }}>Financial Need</th>
                <th style={{ padding: 8, minWidth: 100 }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {searched.length === 0 ? (
                <tr>
                  <td colSpan="11" style={{ textAlign: "center", padding: 40, color: "#666" }}>
                    No records found. Try adjusting your filters.
                  </td>
                </tr>
              ) : (
                searched.map((s, i) => (
                  <tr key={i} style={{ borderBottom: "1px solid #e5e7eb" }}>
                    <td style={{ padding: 8, textAlign: "center" }}>{i + 1}</td>
                    <td style={{ padding: 8, textAlign: "center" }}>{s.batch}</td>
                    <td style={{ padding: 8, textAlign: "center" }}>{s.id}</td>
                    <td style={{ padding: 8, textAlign: "center" }}>{s.name || "-"}</td>
                    <td style={{ padding: 8, textAlign: "center" }}>{s.college || "-"}</td>
                    <td style={{ padding: 8, textAlign: "center" }}>{s.program || "-"}</td>
                    <td style={{ padding: 8, textAlign: "center" }}>{s.year || "-"}</td>
                    <td style={{ padding: 8, textAlign: "center" }}>{s.gpa || "-"}</td>
                    <td style={{ padding: 8, textAlign: "center" }}>₱{s.income || "-"}</td>
                    <td style={{ padding: 8, textAlign: "center" }}>{s.need || "-"}</td>
                    <td style={{ 
                      padding: 8, 
                      textAlign: "center",
                      color: s.status === "Approved" ? "#059669" : "#ef4444",
                      fontWeight: "600"
                    }}>
                      {s.status}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BatchRecords;