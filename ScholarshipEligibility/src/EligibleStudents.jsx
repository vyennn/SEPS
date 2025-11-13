import { useState } from "react";

const EligibleStudents = () => {
  const [selectedBatch, setSelectedBatch] = useState("All Batches");

  return (
    <div
      style={{
        padding: "20px", 
        backgroundColor: "#f8fafc", 
        flex: 1,                // <-- take remaining space
        display: "flex",        // <-- flex column layout
        flexDirection: "column",
        overflow: "hidden"      // <
      }}
    >
      <h2
        style={{
          fontSize: "24px",
          fontWeight: "bold",
          color: "#059669",
          marginBottom: "5px",
        }}
      >
        ELIGIBLE STUDENTS BY BATCH
      </h2>
      <p
        style={{
          color: "#666",
          marginBottom: "20px",
          fontSize: "13px",
        }}
      >
        View and export eligible students sorted by composite score
      </p>

      <div
        style={{
          background: "white",
          borderRadius: "10px",
          padding: "20px",
          boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
          marginBottom: "20px",
          border: "2px solid #059669",
        }}
      >
        <div style={{ marginBottom: "15px" }}>
          <label
            style={{
              display: "block",
              fontWeight: "bold",
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
              padding: "8px 10px",
              border: "1px solid #059669",
              borderRadius: "5px",
              outline: "none",
              background: "white",
              fontSize: "12px",
            }}
          >
            <option>All Batches</option>
            <option>Batch 1</option>
          </select>
        </div>
        
      </div>

      <div
        style={{
          background: "white",
          borderRadius: "10px",
          padding: "20px",
          boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: "12px",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#059669", color: "white" }}>
              <th
                style={{
                  padding: "10px",
                  textAlign: "left",
                  fontWeight: "600",
                }}
              >
                Rank
              </th>
              <th
                style={{
                  padding: "10px",
                  textAlign: "left",
                  fontWeight: "600",
                }}
              >
                Student Name
              </th>
              <th
                style={{
                  padding: "10px",
                  textAlign: "left",
                  fontWeight: "600",
                }}
              >
                Program
              </th>
              <th
                style={{
                  padding: "10px",
                  textAlign: "left",
                  fontWeight: "600",
                }}
              >
                Year Level
              </th>
              <th
                style={{
                  padding: "10px",
                  textAlign: "left",
                  fontWeight: "600",
                }}
              >
                GPA
              </th>
              <th
                style={{
                  padding: "10px",
                  textAlign: "left",
                  fontWeight: "600",
                }}
              >
                Family Income
              </th>
              <th
                style={{
                  padding: "10px",
                  textAlign: "left",
                  fontWeight: "600",
                }}
              >
                Financial Need
              </th>
              <th
                style={{
                  padding: "10px",
                  textAlign: "left",
                  fontWeight: "600",
                }}
              >
                Composite Score
              </th>
              <th
                style={{
                  padding: "10px",
                  textAlign: "left",
                  fontWeight: "600",
                }}
              >
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td
                colSpan="9"
                style={{ textAlign: "center", padding: "40px 10px" }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  
                  <p
                    style={{
                      color: "#374151",
                      fontWeight: "600",
                      fontSize: "14px",
                      margin: 0,
                    }}
                  >
                    No students in the system yet.
                  </p>
                  <p style={{ color: "#666", fontSize: "12px", margin: 0 }}>
                    Add student data to see eligible students.
                  </p>
                  <div
                    style={{
                      backgroundColor: "#fef3c7",
                      border: "1px solid #f59e0b",
                      borderRadius: "5px",
                      padding: "12px",
                      marginTop: "5px",
                      maxWidth: "350px",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "12px",
                        color: "#92400e",
                        fontWeight: "600",
                        margin: "0 0 5px 0",
                      }}
                    >
                      Eligibility Requirements:
                    </p>
                    <p
                      style={{
                        fontSize: "11px",
                        color: "#92400e",
                        margin: "0 0 2px 0",
                      }}
                    >
                      • GPA 1.00-1.25: Family income ≤ ₱40,000
                    </p>
                    <p
                      style={{ fontSize: "11px", color: "#92400e", margin: 0 }}
                    >
                      • GPA 1.26-3.00: Family income ≤ ₱25,000
                    </p>
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
