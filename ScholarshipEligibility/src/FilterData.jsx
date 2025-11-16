import { useState } from "react";
import * as XLSX from "xlsx";
import StudentForm from "./StudentForm";

const FilterData = ({ students, setStudents, addBatch, batchNumber, currentBatchName, setCurrentBatchName, onStudentAdd }) => {
  const [batchFilter, setBatchFilter] = useState(currentBatchName || `Batch ${batchNumber}`);
  const [excelData, setExcelData] = useState([]);
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [batchCount, setBatchCount] = useState(batchNumber);
  const [showForm, setShowForm] = useState(false);

  // Upload Excel file
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadedFileName(file.name);
    const newBatchName = `Batch ${batchCount}`;
    setBatchFilter(newBatchName);
    setCurrentBatchName(newBatchName); // Update the current batch in App

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

  // Filter students from Excel
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

      // Create full name from Excel columns
      const firstName = student["First Name"] || "";
      const middleName = student["Middle Name"] || "";
      const lastName = student["Last Name"] || "";
      const fullName = `${firstName} ${middleName} ${lastName}`.trim().replace(/\s+/g, ' ');

      return {
        id: student["School ID"],
        name: fullName, // Add this line
        firstName: student["First Name"] || "-",
        middleName: student["Middle Name"] || "-",
        lastName: student["Last Name"] || "-",
        nameSuffix: student["Name Suffix"] || "-",
        gpa,
        income,
        need: income <= 10000 ? "High" : income <= 25000 ? "Medium" : "Low",
        status,
        college: student.College || "-",
        program: student.Program || "-",
        year: student["Year Level"] || "-",
        birthdate: student.Birthdate || "-",
        age: student.Age || "-",
        sex: student.Sex || "-",
        maritalStatus: student["Marital Status"] || "-",
        email: student.Email || "-",
        contactNumber: student["Contact Number"] || "-",
        purokStreet: student["Purok/Street"] || "-",
        barangay: student.Barangay || "-",
        city: student.City || "-",
        province: student.Province || "-",
        fatherFirstName: student["Father First Name"] || "-",
        fatherMiddleName: student["Father Middle Name"] || "-",
        fatherLastName: student["Father Last Name"] || "-",
        fatherNameSuffix: student["Father Name Suffix"] || "-",
        fatherOccupation: student["Father Occupation"] || "-",
        motherFirstName: student["Mother First Name"] || "-",
        motherMiddleName: student["Mother Middle Name"] || "-",
        motherLastName: student["Mother Last Name"] || "-",
        motherNameSuffix: student["Mother Name Suffix"] || "-",
        motherOccupation: student["Mother Occupation"] || "-",
      };
    });

    setStudents(formatted);

    if (addBatch) {
      const batchName = batchFilter || `Batch ${batchCount}`;
      addBatch(batchName, uploadedFileName, formatted);
      setCurrentBatchName(batchName); // Update current batch
    }
    
    setBatchCount(batchCount + 1);
    setBatchFilter(`Batch ${batchCount + 1}`);
  };
  
  const handleClear = () => {
    setStudents([]);
    setExcelData([]);
    setBatchFilter("");
    setUploadedFileName("");
    setCurrentBatchName(""); // Clear current batch
  };

  return (
    <div style={{ padding: "20px", backgroundColor: "#f8fafc", flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <h2 style={{ fontSize: "24px", color: "#1f2937", marginBottom: 5 ,textAlign: "center", fontFamily: "sans-serif" }}>
        FILTER DATA
      </h2>
      <p style={{ color: "#666", marginBottom: 5, fontSize: 13 }}>
        Upload, organize, and filter student records by batch
      </p>

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
            onChange={(e) => {
              setBatchFilter(e.target.value);
              setCurrentBatchName(e.target.value); // Update current batch when manually changed
            }}
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

        {/* STUDENT TABLE */}
        {students.length > 0 && (
          <div style={{ overflowX: "auto", marginTop: "15px" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "12px" }}>
              <thead>
                <tr style={{ backgroundColor: "#059669", color: "white" }}>
                  <th style={{ padding: 8 , textAlign: "center"}}>Student ID</th>
                  <th style={{ padding: 8 , textAlign: "center"}}>College</th>
                  <th style={{ padding: 8 , textAlign: "center"}}>Program</th>
                  <th style={{ padding: 8 , textAlign: "center"}}>Year Level</th>
                  <th style={{ padding: 8, textAlign: "center" }}>GPA</th>
                  <th style={{ padding: 8, textAlign: "center" }}>Family Income</th>
                  <th style={{ padding: 8, textAlign: "center" }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {students.map((s, i) => (
                  <tr key={i}>
                    <td style={{ padding: 6, textAlign: "center" }}>{s.id}</td>
                    <td style={{ padding: 6, textAlign: "center" }}>{s.college}</td>
                    <td style={{ padding: 6, textAlign: "center" }}>{s.program}</td>
                    <td style={{ padding: 6, textAlign: "center" }}>{s.year}</td>
                    <td style={{ padding: 6, textAlign: "center" }}>{s.gpa}</td>
                    <td style={{ padding: 6, textAlign: "center" }}>₱{s.income}</td>
                    <td style={{ padding: 6, textAlign: "center" }}>{s.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* STUDENT FORM MODAL */}
      {showForm && (
        <StudentForm
          onClose={() => setShowForm(false)}
          onSubmit={(data) => {
            onStudentAdd(data); // Use App.jsx's handleStudentSubmit
            setShowForm(false);
          }}
        />
      )}
    </div>
  );
};

export default FilterData;