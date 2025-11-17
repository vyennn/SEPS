import { useState, useRef } from "react";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { FaGraduationCap } from "react-icons/fa";

const EligibleStudents = ({ batches = [] }) => {
  // Flatten all students from batches
  const allStudents = batches.flatMap((batch) =>
    batch.students.map((student) => ({ ...student, batch: batch.name }))
  );

  const uniqueBatches = ["All Batches", ...batches.map((b) => b.name)];
  const [selectedBatch, setSelectedBatch] = useState("All Batches");
  const [searchTerm, setSearchTerm] = useState("");
  const printRef = useRef();

  const batchFiltered =
    selectedBatch === "All Batches"
      ? allStudents
      : allStudents.filter((s) => s.batch === selectedBatch);

  const eligibleStudents = batchFiltered.filter((s) => s.status === "Approved");

  const searched = eligibleStudents.filter((s) => {
    const term = searchTerm.toLowerCase();
    return (
      (s.id && s.id.toLowerCase().includes(term)) ||
      (s.name && s.name.toLowerCase().includes(term))
    );
  });

  const sortedStudents = [...searched].sort(
    (a, b) => (b.compositeScore || 0) - (a.compositeScore || 0)
  );

  const exportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(sortedStudents);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Eligible Students");
    XLSX.writeFile(workbook, "Eligible_Students.xlsx");
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    const tableRows = sortedStudents.map((s, i) => [
      i + 1,
      s.id,
      s.college || "-",
      s.program || "-",
      s.year || "-",
      s.gpa || "-",
      s.income || "-",
      s.need || "-",
      s.compositeScore || "-",
      s.status,
    ]);
    doc.text(`Eligible Students - ${selectedBatch}`, 14, 15);
    doc.autoTable({
      head: [
        [
          "Rank",
          "Student ID",
          "College",
          "Program",
          "Year",
          "GPA",
          "Family Income",
          "Financial Need",
          "Score",
          "Status",
        ],
      ],
      body: tableRows,
      startY: 20,
      theme: "grid",
      headStyles: { fillColor: [5, 150, 105], textColor: 255 },
      styles: { fontSize: 10 },
    });
    doc.save("Eligible_Students.pdf");
  };

  const handlePrint = () => {
    const printContents = printRef.current.innerHTML;
    const newWindow = window.open("", "", "width=900,height=650");
    newWindow.document.write(`
      <html>
        <head>
          <title>Print Eligible Students</title>
          <style>
            body { font-family: Poppins, sans-serif; margin: 20px; }
            h1, h2 { text-align: center; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid black; padding: 8px; text-align: center; color: black;}
            th { background-color: #F0B400; color: white; }
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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      {/* HEADER WITH ICON */}
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

      {/* MAIN CONTENT */}
      <main
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "25px",
          backgroundColor: "#f5f5f5",
        }}
      >
        {/* WELCOME TEXT */}
        <h2
          style={{
            fontSize: "20px",
            fontWeight: "700",
            marginBottom: "20px",
            color: "#061511ff",
          }}
        >
          Eligible Students
        </h2>

        {/* FILTER & SEARCH CARDS */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "15px",
            marginBottom: "25px",
          }}
        >
          {/* Batch Selection */}
          <div
            style={{
              background: "white",
              borderRadius: "15px",
              padding: "20px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            }}
          >
            <label
              style={{
                display: "block",
                fontSize: "14px",
                fontWeight: "600",
                color: "#FACC15",
                marginBottom: "8px",
              }}
            >
              Select Batch
            </label>
            <select
              value={selectedBatch}
              onChange={(e) => setSelectedBatch(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #D1D5DB",
                borderRadius: "10px",
                fontSize: "14px",
                outline: "none",
              }}
            >
              {uniqueBatches.map((b, idx) => (
                <option key={idx}>{b}</option>
              ))}
            </select>
          </div>
          {/* Search */}
          <div
            style={{
              background: "white",
              borderRadius: "15px",
              padding: "20px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            }}
          >
            <label
              style={{
                display: "block",
                fontSize: "14px",
                fontWeight: "600",
                color: "#FACC15",
                marginBottom: "8px",
              }}
            >
              Search Student
            </label>
            <input
              type="text"
              placeholder="Enter School ID or Name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #D1D5DB",
                borderRadius: "10px",
                fontSize: "14px",
                outline: "none",
              }}
            />
          </div>
          {/* Export Buttons */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: "10px",
            }}
          >
            <button
              onClick={exportExcel}
              style={{
                backgroundColor: "#FACC15",
                color: "#0B4F36",
                border: "none",
                padding: "12px",
                borderRadius: "15px",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Export Excel
            </button>
            <button
              onClick={handlePrint}
              style={{
                backgroundColor: "#FACC15",
                color: "#0B4F36",
                border: "none",
                padding: "12px",
                borderRadius: "15px",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Print
            </button>
          </div>
        </div>

        {/* ELIGIBLE STUDENTS TABLE */}
        <div
          ref={printRef}
          style={{
            background: "white",
            borderRadius: "15px",
            padding: "20px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          }}
        >
          <h2
            style={{
              fontSize: "18px",
              fontWeight: 700,
              color: "#065F46",
              marginBottom: "15px",
            }}
          >
            Eligible Students - {selectedBatch}
          </h2>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "14px",
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
                  Rank
                </th>
                <th style={{ padding: "10px 0", textAlign: "center" }}>
                  Student ID
                </th>
                <th style={{ padding: "10px 0", textAlign: "center" }}>
                  College
                </th>
                <th style={{ padding: "10px 0", textAlign: "center" }}>
                  Program
                </th>
                <th style={{ padding: "10px 0", textAlign: "center" }}>Year</th>
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
              {sortedStudents.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    style={{ textAlign: "center", padding: "40px" }}
                  >
                    No eligible students found.
                  </td>
                </tr>
              ) : (
                sortedStudents.map((s, i) => (
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
                      {s.id}
                    </td>
                    <td style={{ padding: "8px 2px", textAlign: "center" }}>
                      {s.college}
                    </td>
                    <td style={{ padding: "8px 2px", textAlign: "center" }}>
                      {s.program}
                    </td>
                    <td style={{ padding: "8px 2px", textAlign: "center" }}>
                      {s.year}
                    </td>
                    <td
                      style={{
                        padding: "8px 2px",
                        textAlign: "center",
                        fontWeight: 600,
                        color: "#059669",
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

export default EligibleStudents;
