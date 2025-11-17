import { useState } from "react";
import * as XLSX from "xlsx";
import StudentForm from "./StudentForm";
import { FaGraduationCap } from "react-icons/fa";

const FilterData = ({
  students,
  setStudents,
  addBatch,
  batchNumber,
  currentBatchName,
  setCurrentBatchName,
  onStudentAdd,
}) => {
  const [batchFilter, setBatchFilter] = useState(
    currentBatchName || `Batch ${batchNumber}`
  );
  const [excelData, setExcelData] = useState([]);
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [batchCount, setBatchCount] = useState(batchNumber);
  const [showForm, setShowForm] = useState(false);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadedFileName(file.name);
    const newBatchName = `Batch ${batchCount}`;
    setBatchFilter(newBatchName);
    setCurrentBatchName(newBatchName);

    const reader = new FileReader();
    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const json = XLSX.utils.sheet_to_json(sheet);
      setExcelData(json);

      alert("✅ File uploaded successfully!");
    };
    reader.readAsArrayBuffer(file);
  };

  const handleFilter = () => {
    if (excelData.length === 0) {
      alert("⚠️ Please upload an Excel file first.");
      return;
    }
    const formatted = excelData.map((student) => {
      const gpa = parseFloat(student.GPA);
      const income = parseFloat(student["Parent Income"]);
      const status =
        (gpa >= 1.0 && gpa <= 1.25 && income <= 40000) ||
        (gpa > 1.25 && gpa <= 3.0 && income <= 25000)
          ? "Approved"
          : "Rejected";

      const firstName = student["First Name"] || "-";
      const middleName = student["Middle Name"] || "-";
      const lastName = student["Last Name"] || "-";
      const fullName = `${firstName} ${middleName} ${lastName}`
        .trim()
        .replace(/\s+/g, " ");

      return {
        id: student["School ID"] || "-",
        name: fullName,
        firstName,
        middleName,
        lastName,
        nameSuffix: student["Name Suffix"] || "-",
        gpa,
        income,
        status,
        college: student.College || "-",
        program: student.Program || "-",
        year: student["Year Level"] || "-",
      };
    });

    setStudents(formatted);

    if (addBatch) {
      const batchName = batchFilter || `Batch ${batchCount}`;
      addBatch(batchName, uploadedFileName, formatted);
      setCurrentBatchName(batchName);
    }
    setBatchCount(batchCount + 1);
    setBatchFilter(`Batch ${batchCount + 1}`);
  };

  const handleClear = () => {
    setStudents([]);
    setExcelData([]);
    setBatchFilter("");
    setUploadedFileName("");
    setCurrentBatchName("");
  };

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
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
          fontFamily: "Poppins, sans-serif",
        }}
      >
        <FaGraduationCap size={40} style={{ marginRight: "15px" }} />
        Scholarship Eligibility Prediction System
      </header>

      <div
        style={{
          padding: "22px",
          backgroundColor: "#f5f5f5",
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          fontFamily: "Poppins, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "15px",
          }}
        >
          <div>
            <h2
              style={{
                fontSize: "22px",
                fontWeight: "700",
                color: "#1f2937",
                marginBottom: 3,
              }}
            >
              Filter Data
            </h2>
          </div>
        </div>

        <div
          style={{
            background: "#fff",
            borderRadius: "20px",
            padding: "20px",
            boxShadow: "0 3px 10px rgba(0,0,0,0.10)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {uploadedFileName && (
            <div
              style={{
                background: "#e0fce5",
                padding: "10px 15px",
                borderRadius: "8px",
                marginBottom: "15px",
                borderLeft: "5px solid #059669",
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontSize: "13px",
                  fontWeight: "600",
                  color: "#065f46",
                }}
              >
                📄 Uploaded File:{" "}
                <span style={{ fontWeight: "700" }}>{uploadedFileName}</span>
              </p>
              <p style={{ margin: 0, fontSize: "12px", color: "#065f46" }}>
                🔢 Batch: <b>{batchFilter}</b>
              </p>
            </div>
          )}

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: "10px",
              marginBottom: "15px",
            }}
          >
            <label
              style={{ fontWeight: "600", color: "#374151", fontSize: "13px" }}
            >
              Input # of Batch:
            </label>
            <input
              type="text"
              placeholder="Enter batch num"
              value={batchFilter}
              onChange={(e) => {
                setBatchFilter(e.target.value);
                setCurrentBatchName(e.target.value);
              }}
              style={{
                padding: "7px 10px",
                border: "1px solid #d1d5db",
                borderRadius: "6px",
                outline: "none",
                fontSize: "13px",
                width: "142px",
              }}
            />
            <button
              onClick={handleFilter}
              style={{
                backgroundColor: "#059669",
                color: "white",
                padding: "7px 18px",
                borderRadius: "6px",
                border: "none",
                cursor: "pointer",
                fontSize: "13px",
                fontWeight: "600",
              }}
            >
              Filter
            </button>
            <button
              onClick={handleClear}
              style={{
                backgroundColor: "#ef4444",
                color: "white",
                padding: "7px 18px",
                borderRadius: "6px",
                border: "none",
                cursor: "pointer",
                fontSize: "13px",
                fontWeight: "600",
              }}
            >
              Clear List
            </button>

            <div style={{ marginLeft: "auto" }}>
              <input
                type="file"
                accept=".xlsx, .xls"
                onChange={handleFileUpload}
                style={{ display: "none" }}
                id="fileUpload"
              />
              <label
                htmlFor="fileUpload"
                style={{
                  border: "1px solid #d1d5db",
                  padding: "7px 16px",
                  borderRadius: "6px",
                  background: "#fff",
                  cursor: "pointer",
                  fontSize: "13px",
                  fontWeight: "600",
                }}
              >
                📁 Upload Excel File
              </label>
            </div>

            <button
              onClick={() => setShowForm(true)}
              style={{
                background: "#fff",
                border: "1px solid #059669",
                color: "#059669",
                padding: "7px 16px",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "13px",
                fontWeight: "600",
                display: "flex",
                alignItems: "center",
                gap: "7px",
              }}
            >
              <span style={{ fontSize: "14px" }}>👤</span> Add New Student
            </button>
          </div>

          {/* DASHBOARD STYLE TABLE */}
          <div style={{ overflowX: "auto", marginTop: "12px" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontFamily: "Poppins, sans-serif",
                fontSize: "13px",
                background: "#fff",
                borderRadius: "8px 8px 0 0",
                boxShadow: "0 2px 7px rgba(34,85,69,0.10)",
                overflow: "hidden",
              }}
            >
              <thead>
                <tr
                  style={{
                    backgroundColor: "#F0B400", // yellow dashboard style
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
                    Student ID
                  </th>
                  <th style={{ padding: "10px 0", textAlign: "center" }}>
                    College
                  </th>
                  <th style={{ padding: "10px 0", textAlign: "center" }}>
                    Program
                  </th>
                  <th style={{ padding: "10px 0", textAlign: "center" }}>
                    Year Level
                  </th>
                  <th style={{ padding: "10px 0", textAlign: "center" }}>
                    GPA
                  </th>
                  <th style={{ padding: "10px 0", textAlign: "center" }}>
                    Family Income
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
                {students.length === 0 ? (
                  <tr>
                    <td
                      colSpan="7"
                      style={{
                        padding: "16px",
                        textAlign: "center",
                        color: "#6b7280",
                        fontSize: "14px",
                      }}
                    >
                      ⚠️ No file added
                    </td>
                  </tr>
                ) : (
                  students.map((s, i) => (
                    <tr
                      key={i}
                      style={{
                        borderBottom: "1px solid #E5E7EB",
                        background: i % 2 === 0 ? "#fcfcfc" : "#fff",
                      }}
                    >
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
                      <td style={{ padding: "8px 2px", textAlign: "center" }}>
                        {s.gpa}
                      </td>
                      <td style={{ padding: "8px 2px", textAlign: "center" }}>
                        ₱{s.income}
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
                              : "#065F46",
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
        </div>

        {showForm && (
          <StudentForm
            onClose={() => setShowForm(false)}
            onSubmit={(data) => {
              onStudentAdd(data);
              setShowForm(false);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default FilterData;
