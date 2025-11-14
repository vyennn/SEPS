import { useState, useRef } from "react";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";

const EligibleStudents = ({ batches }) => {
  const [selectedBatch, setSelectedBatch] = useState("All Batches");
  const [searchTerm, setSearchTerm] = useState("");
  const printRef = useRef();

  // Flatten all students from batches, adding batch info
  const allStudents = batches.flatMap(batch =>
    batch.students.map(student => ({ ...student, batch: batch.name }))
  );

  const uniqueBatches = ["All Batches", ...batches.map(b => b.name)];

  const batchFiltered =
    selectedBatch === "All Batches"
      ? allStudents
      : allStudents.filter(s => s.batch === selectedBatch);

  const eligibleStudents = batchFiltered.filter(s => s.status === "Approved");

  const searched = eligibleStudents.filter(s =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedStudents = [...searched].sort(
    (a, b) => (b.compositeScore || 0) - (a.compositeScore || 0)
  );

  // Export Excel
  const exportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(sortedStudents);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Eligible Students");
    XLSX.writeFile(workbook, "Eligible_Students.xlsx");
  };

  // Export PDF
  const exportPDF = () => {
    const doc = new jsPDF();
    const tableRows = sortedStudents.map((s, i) => [
      i + 1,
      s.name,
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
          "Name",
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

  // Print function using a new window
  const handlePrint = () => {
    const printContents = printRef.current.innerHTML;
    const newWindow = window.open("", "", "width=900,height=650");
    newWindow.document.write(`
      <html>
        <head>
          <title>Print Eligible Students</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            h1, h2 { text-align: center; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid black; padding: 8px; text-align: center; color: black;}
            th { background-color: white; }
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
    <div style={{ padding: 20, flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <h2 style={{ fontSize: 24, color: "#1f2937", marginBottom: 5 ,textAlign: "center",
          fontFamily: "sans-serif"}}>
        ELIGIBLE STUDENTS BY BATCH
      </h2>
      <p style={{ color: "#666", marginBottom: 20, fontSize: 13 }}>
        View, search, and export eligible students by batch
      </p>

      {/* FILTER & SEARCH CARD */}
<div
  style={{
    background: "white",
    borderRadius: 10,
    padding: 20,
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    marginBottom: 20,
    border: "2px solid #059669",
  }}
>
  {/* First row: Inputs */}
  <div style={{ display: "flex", gap: 20, flexWrap: "wrap", marginBottom: 15 }}>
    {/* Select Batch */}
    <div style={{ flex: 1, minWidth: 150 }}>
      <label
        style={{
          display: "block",
          fontWeight: "bold",
          color: "#374151",
          marginBottom: 8,
          fontSize: 13,
        }}
      >
        Select Batch
      </label>
      <select
        value={selectedBatch}
        onChange={(e) => setSelectedBatch(e.target.value)}
        style={{
          width: "100%",
          padding: 8,
          border: "1px solid #059669",
          borderRadius: 5,
          fontSize: 12,
        }}
      >
        {uniqueBatches.map((b, idx) => (
          <option key={idx}>{b}</option>
        ))}
      </select>
    </div>

    {/* Search Student */}
    <div style={{ flex: 1, minWidth: 150 }}>
      <label
        style={{
          display: "block",
          fontWeight: "bold",
          color: "#374151",
          marginBottom: 8,
          fontSize: 13,
        }}
      >
        Search Student
      </label>
      <input
        type="text"
        placeholder="Enter name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          width: "100%",
          padding: 8,
          border: "1px solid #059669",
          borderRadius: 5,
          fontSize: 12,
        }}
      />
    </div>
  </div>

  {/* Second row: Buttons aligned right */}
  <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, flexWrap: "wrap" }}>
    <button
      onClick={exportExcel}
      style={{
        background: "#059669",
        color: "white",
        border: "none",
        padding: "10px 15px",
        borderRadius: 6,
        cursor: "pointer",
        fontSize: 13,
        fontWeight: 600,
      }}
    >
      Export Excel
    </button>
    <button
      onClick={handlePrint}
      style={{
        background: "#059669",
        color: "white",
        border: "none",
        padding: "10px 15px",
        borderRadius: 6,
        cursor: "pointer",
        fontSize: 13,
        fontWeight: 600,
      }}
    >
      Print
    </button>
  </div>
</div>


      {/* STUDENT TABLE */}
      <div ref={printRef} style={{ background: "white", borderRadius: 10, padding: 20, boxShadow: "0 2px 5px rgba(0,0,0,0.1)"}}>
        <h2 style={{ color: "black" }}>Eligible Students - {selectedBatch}</h2>

        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
          <thead>
            <tr style={{ backgroundColor: "#059669", color: "white" }}>
              <th style={{ padding: 10 }}>Rank</th>
              <th style={{ padding: 10 }}>Student Name</th>
              <th style={{ padding: 10 }}>Program</th>
              <th style={{ padding: 10 }}>Year</th>
              <th style={{ padding: 10 }}>GPA</th>
              <th style={{ padding: 10 }}>Family Income</th>
              <th style={{ padding: 10 }}>Financial Need</th>
              <th style={{ padding: 10 }}>Score</th>
              <th style={{ padding: 10 }}>Status</th>
            </tr>
          </thead>
          
          <tbody>
            {sortedStudents.length === 0 ? (
              <tr>
                <td colSpan="9" style={{ textAlign: "center", padding: 40 }}>No eligible students found.</td>
              </tr>
            ) : (
              sortedStudents.map((s, i) => (
                <tr key={i}>
                  <td style={{ padding: 8 }}>{i + 1}</td>
                  <td style={{ padding: 8 }}>{s.name}</td>
                  <td style={{ padding: 8 }}>{s.program || "-"}</td>
                  <td style={{ padding: 8 }}>{s.year || "-"}</td>
                  <td style={{ padding: 8 }}>{s.gpa}</td>
                  <td style={{ padding: 8 }}>₱{s.income}</td>
                  <td style={{ padding: 8 }}>{s.need}</td>
                  <td style={{ padding: 8 }}>{s.compositeScore || "-"}</td>
                  <td style={{ padding: 8 }}>{s.status}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EligibleStudents;
