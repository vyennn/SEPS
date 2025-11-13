import { useState } from "react";

const EligibleStudents = () => {
  const [selectedBatch, setSelectedBatch] = useState("All Batches");

  return (
    <div
      style={{
        padding: "40px 50px",
        backgroundColor: "#f8faf9",
        flex: 1,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <h2
        style={{
          fontSize: "26px",
          fontWeight: "600",
          color: "#2f5d3f",
          marginBottom: "5px",
        }}
      >
        ELIGIBLE STUDENTS BY BATCH
      </h2>
      <p
        style={{
          color: "#6b7280",
          marginBottom: "25px",
          fontSize: "13px",
        }}
      ></p>

      {/* === FILTER SECTION CARD === */}
      <div
        style={{
          background: "white",
          borderRadius: "16px",
          padding: "25px 30px",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
          border: "1px solid #d1e8d2",
          marginBottom: "25px",
        }}
      >
        <div style={{ marginBottom: "15px" }}>
          <label
            style={{
              display: "block",
              fontWeight: "600",
              color: "#374151",
              marginBottom: "8px",
              fontSize: "13px",
            }}
          >
            Select Batch to Filter:
          </label>
          <select
            value={selectedBatch}
            onChange={(e) => setSelectedBatch(e.target.value)}
            style={{
              width: "100%",
              maxWidth: "300px",
              padding: "8px 12px",
              border: "1px solid #d1e8d2",
              borderRadius: "10px",
              outline: "none",
              background: "#f9fdf9",
              fontSize: "13px",
              color: "#2f5d3f",
              transition: "all 0.3s ease",
            }}
          >
            <option>All Batches</option>
            <option>Batch 1</option>
            <option>Batch 2</option>
          </select>
        </div>
      </div>

      {/* === TABLE SECTION CARD === */}
      <div
        style={{
          background: "white",
          borderRadius: "16px",
          padding: "25px 30px",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
          border: "1px solid #e1efe2",
          flex: 1,
          overflowY: "auto",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: "13px",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#63A361", color: "white" }}>
              {[
                "Rank",
                "Student Name",
                "Program",
                "Year Level",
                "GPA",
                "Family Income",
                "Financial Need",
                "Composite Score",
                "Status",
              ].map((header, i) => (
                <th
                  key={i}
                  style={{
                    padding: "12px",
                    textAlign: "left",
                    fontWeight: "500",
                  }}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* Placeholder content */}
            <tr>
              <td
                colSpan="9"
                style={{
                  textAlign: "center",
                  padding: "50px 10px",
                  color: "#6b7280",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "12px",
                  }}
                >
                  <span style={{ fontSize: "32px" }}>📋</span>
                  <p
                    style={{
                      color: "#2f5d3f",
                      fontWeight: "600",
                      fontSize: "14px",
                      margin: 0,
                    }}
                  >
                    No students in the system yet.
                  </p>
                  <p
                    style={{
                      color: "#6b7280",
                      fontSize: "12px",
                      margin: 0,
                    }}
                  >
                    Add student data to see eligible students.
                  </p>

                  {/* Requirements box */}
                  <div
                    style={{
                      backgroundColor: "#fef9c3",
                      border: "1px solid #fcd34d",
                      borderRadius: "10px",
                      padding: "15px 18px",
                      marginTop: "5px",
                      maxWidth: "380px",
                      textAlign: "left",
                      boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "13px",
                        color: "#92400e",
                        fontWeight: "600",
                        margin: "0 0 6px 0",
                      }}
                    >
                      Eligibility Requirements:
                    </p>
                    <ul
                      style={{
                        margin: 0,
                        paddingLeft: "18px",
                        color: "#92400e",
                        fontSize: "12px",
                        lineHeight: "1.6",
                      }}
                    >
                      <li>GPA 1.00–1.25: Family income ≤ ₱40,000</li>
                      <li>GPA 1.26–3.00: Family income ≤ ₱25,000</li>
                    </ul>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EligibleStudents;
