import { useState } from "react";

const FilterData = ({ students, setStudents, setShowForm }) => {
  const [batchFilter, setBatchFilter] = useState("");

  return (
    <div
      style={{
        padding: "20px", 
        backgroundColor: "#f8fafc", 
        flex: 1,                // <-- take remaining space
        display: "flex",        // <-- flex column layout
        flexDirection: "column",
        overflow: "hidden"      // <-- prevent inner scroll
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
        FILTER DATA
      </h2>

      <div
        style={{
          background: "white",
          borderRadius: "10px",
          padding: "20px",
          boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
          marginBottom: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            flexWrap: "wrap",
            marginBottom: "15px",
          }}
        >
          <label
            style={{
              fontWeight: "600",
              color: "#374151",
              fontSize: "13px",
            }}
          >
            Input # of Batch:
          </label>
          <input
            type="text"
            placeholder="Enter batch num"
            value={batchFilter}
            onChange={(e) => setBatchFilter(e.target.value)}
            style={{
              padding: "6px 10px",
              border: "1px solid #d1d5db",
              borderRadius: "5px",
              outline: "none",
              fontSize: "12px",
              width: "150px",
            }}
          />
          <button
            style={{
              backgroundColor: "#059669",
              color: "white",
              padding: "6px 15px",
              borderRadius: "5px",
              border: "none",
              cursor: "pointer",
              fontSize: "12px",
              fontWeight: "600",
            }}
          >
            Filter
          </button>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
              marginLeft: "auto",
            }}
          >
            
            <button
              style={{
                border: "1px solid #d1d5db",
                padding: "6px 12px",
                borderRadius: "5px",
                background: "white",
                cursor: "pointer",
                fontSize: "12px",
              }}
            >
              <span style={{ fontSize: "16px", color: "#666" }}>📁</span>
              Add File to filter
            </button>
          </div>

          <button
            onClick={() => setShowForm(true)}
            style={{
              background: "white",
              border: "1px solid #059669",
              color: "#059669",
              padding: "6px 12px",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "12px",
              fontWeight: "600",
              display: "flex",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <span style={{ fontSize: "14px" }}>👤</span>
            Add New Student
          </button>
        </div>
      </div>

      <div
        style={{
          background: "white",
          borderRadius: "11px",
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
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {students.length === 0 ? (
              <tr>
                <td
                  colSpan="6"
                  style={{
                    textAlign: "center",
                    padding: "40px 10px",
                    color: "#666",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <span style={{ fontSize: "32px" }}>🔍</span>
                    <p
                      style={{ fontSize: "14px", fontWeight: "600", margin: 0 }}
                    >
                      Enter a batch number and click Filter to see results
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              students.map((student, idx) => (
                <tr key={idx} style={{ borderBottom: "1px solid #e5e7eb" }}>
                  <td
                    style={{
                      padding: "10px",
                      fontWeight: "600",
                      color: "#1f2937",
                    }}
                  >
                    {idx + 1}
                  </td>
                  <td
                    style={{
                      padding: "10px",
                      fontWeight: "600",
                      color: "#1f2937",
                    }}
                  >
                    {student.name}
                  </td>
                  <td style={{ padding: "10px" }}>{student.gpa}</td>
                  <td style={{ padding: "10px" }}>
                    ₱{student.income.toLocaleString()}
                  </td>
                  <td style={{ padding: "10px" }}>
                    <span
                      style={{
                        padding: "3px 8px",
                        borderRadius: "15px",
                        fontSize: "11px",
                        fontWeight: "600",
                        backgroundColor: "#fef3c7",
                        color: "#d97706",
                      }}
                    >
                      {student.need}
                    </span>
                  </td>
                  <td style={{ padding: "10px" }}>
                    <span
                      style={{
                        padding: "3px 8px",
                        borderRadius: "15px",
                        fontSize: "11px",
                        fontWeight: "600",
                        backgroundColor:
                          student.status === "Approved" ? "#d1fae5" : "#fee2e2",
                        color:
                          student.status === "Approved" ? "#059669" : "#ef4444",
                      }}
                    >
                      {student.status}
                    </span>
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
