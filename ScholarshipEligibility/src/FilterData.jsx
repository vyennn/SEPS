import { useState } from "react";
import * as XLSX from "xlsx";

const FilterData = ({ students, setStudents, setShowForm, addBatch, batchNumber }) => {
  const [batchFilter, setBatchFilter] = useState(`Batch ${batchNumber}`);
  const [excelData, setExcelData] = useState([]);
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [batchCount, setBatchCount] = useState(batchNumber);

  // Upload Excel file
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadedFileName(file.name);
    setBatchFilter(`Batch ${batchCount}`);

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

  // Filter students based on eligibility and save batch
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

      const need = income <= 10000 ? "High" : income <= 25000 ? "Medium" : "Low";

      return {
        name: `${student["First Name"]} ${student["Last Name"]}`,
        gpa,
        income,
        need,
        status,
      };
    });

    setStudents(formatted);

    // Save batch in App
    if (addBatch) {
      addBatch(batchFilter || `Batch ${batchCount}`, uploadedFileName, formatted);
    }

    // Increment batch count
    setBatchCount(batchCount + 1);
    setBatchFilter(`Batch ${batchCount + 1}`);
  };

  // Clear list for new batch
  const handleClear = () => {
    setStudents([]);
    setExcelData([]);
    setBatchFilter("");
    setUploadedFileName("");
  };

  return (
    <div style={{ padding: "20px", backgroundColor: "#f8fafc", flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <h2 style={{ fontSize: "24px", color: "#1f2937", marginBottom: 5 ,textAlign: "center",
          fontFamily: "sans-serif" }}>
        FILTER DATA
      </h2>

      <div style={{ background: "white", borderRadius: "10px", padding: "20px", boxShadow: "0 2px 5px rgba(0,0,0,0.1)", marginBottom: "20px" }}>
        {uploadedFileName && (
          <div style={{ background: "#e0fce5", padding: "10px 15px", borderRadius: "8px", marginBottom: "12px", borderLeft: "5px solid #059669" }}>
            <p style={{ margin: 0, fontSize: "13px", fontWeight: "600", color: "#065f46" }}>
              📄 Uploaded File: <span style={{ fontWeight: "700" }}>{uploadedFileName}</span>
            </p>
            <p style={{ margin: 0, fontSize: "12px", color: "#065f46" }}>
              🔢 Batch: <b>{batchFilter}</b>
            </p>
          </div>
        )}

        <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap", marginBottom: "15px" }}>
          <label style={{ fontWeight: "600", color: "#374151", fontSize: "13px" }}>Input # of Batch:</label>
          <input
            type="text"
            placeholder="Enter batch num"
            value={batchFilter}
            onChange={(e) => setBatchFilter(e.target.value)}
            style={{ padding: "6px 10px", border: "1px solid #d1d5db", borderRadius: "5px", outline: "none", fontSize: "12px", width: "150px" }}
          />

          <button onClick={handleFilter} style={{ backgroundColor: "#059669", color: "white", padding: "6px 15px", borderRadius: "5px", border: "none", cursor: "pointer", fontSize: "12px", fontWeight: "600" }}>
            Filter
          </button>

          <button onClick={handleClear} style={{ backgroundColor: "#ef4444", color: "white", padding: "6px 15px", borderRadius: "5px", border: "none", cursor: "pointer", fontSize: "12px", fontWeight: "600" }}>
            Clear List
          </button>

          <div style={{ marginLeft: "auto" }}>
            <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} style={{ display: "none" }} id="fileUpload" />
            <label htmlFor="fileUpload" style={{ border: "1px solid #d1d5db", padding: "6px 12px", borderRadius: "5px", background: "white", cursor: "pointer", fontSize: "12px", fontWeight: "600" }}>
              📁 Upload Excel File
            </label>
          </div>

          <button onClick={() => setShowForm(true)} style={{ background: "white", border: "1px solid #059669", color: "#059669", padding: "6px 12px", borderRadius: "5px", cursor: "pointer", fontSize: "12px", fontWeight: "600", display: "flex", alignItems: "center", gap: "5px" }}>
            <span style={{ fontSize: "14px" }}>👤</span>
            Add New Student
          </button>
        </div>
      </div>

      <div style={{ background: "white", borderRadius: "11px", padding: "20px", boxShadow: "0 2px 5px rgba(0,0,0,0.1)", overflowY: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "12px" }}>
          <thead>
            <tr style={{ backgroundColor: "#059669", color: "white" }}>
              <th style={{ padding: "10px", textAlign: "left" }}>Student Name</th>
              <th style={{ padding: "10px", textAlign: "left" }}>GPA</th>
              <th style={{ padding: "10px", textAlign: "left" }}>Family Income</th>
              <th style={{ padding: "10px", textAlign: "left" }}>Financial Need</th>
              <th style={{ padding: "10px", textAlign: "left" }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {students.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ textAlign: "center", padding: "40px 10px" }}>
                  <p style={{ fontSize: "14px", fontWeight: "600", color: "#666" }}>
                    Upload a file and click Filter to see students' eligibility
                  </p>
                </td>
              </tr>
            ) : (
              students.map((student, idx) => (
                <tr key={idx}>
                  <td style={{ padding: "10px" }}>{student.name}</td>
                  <td style={{ padding: "10px" }}>{student.gpa}</td>
                  <td style={{ padding: "10px" }}>₱{student.income}</td>
                  <td style={{ padding: "10px" }}>{student.need}</td>
                  <td style={{ padding: "10px", color: student.status === "Approved" ? "#059669" : "#ef4444", fontWeight: "600" }}>
                    {student.status}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FilterData;
