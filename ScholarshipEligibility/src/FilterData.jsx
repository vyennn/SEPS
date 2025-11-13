import { useState } from "react";

const FilterData = ({ students, setStudents, setShowForm }) => {
  const [batchFilter, setBatchFilter] = useState("");

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
          marginBottom: "25px",
        }}
      >
        FILTER DATA
      </h2>

      {/* === FILTER BAR CARD === */}
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
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            flexWrap: "wrap",
            marginBottom: "10px",
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
              padding: "8px 12px",
              border: "1px solid #d1e8d2",
              borderRadius: "10px",
              outline: "none",
              fontSize: "13px",
              width: "160px",
              transition: "all 0.3s ease",
            }}
          />
          <button
            style={{
              backgroundColor: "#63A361",
              color: "white",
              padding: "8px 18px",
              borderRadius: "10px",
              border: "none",
              cursor: "pointer",
              fontSize: "13px",
              fontWeight: "600",
              boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
              transition: "all 0.3s ease",
            }}
          >
            Filter
          </button>

          {/* Right side controls */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginLeft: "auto",
              flexWrap: "wrap",
            }}
          >
            <button
              style={{
                border: "1px solid #d1e8d2",
                padding: "8px 15px",
                borderRadius: "10px",
                background: "#f9fdf9",
                cursor: "pointer",
                fontSize: "13px",
                fontWeight: "500",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                transition: "all 0.3s ease",
              }}
            >
              <span style={{ fontSize: "16px", color: "#63A361" }}>📁</span>
              Add File to Filter
            </button>

            <button
              onClick={() => setShowForm(true)}
              style={{
                background: "white",
                border: "1px solid #63A361",
                color: "#2f5d3f",
                padding: "8px 15px",
                borderRadius: "10px",
                cursor: "pointer",
                fontSize: "13px",
                fontWeight: "600",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#e8f5e9")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "white")
              }
            >
              <span style={{ fontSize: "15px" }}>👤</span>
              Add New Student
            </button>
          </div>
        </div>
      </div>

      {/* === TABLE CARD === */}
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
                "GPA",
                "Family Income",
                "Financial Need",
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
            {students.length === 0 ? (
              <tr>
                <td
                  colSpan="6"
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
                      gap: "10px",
                    }}
                  >
                    <span style={{ fontSize: "32px" }}>🔍</span>
                    <p
                      style={{
                        fontSize: "14px",
                        fontWeight: "600",
                        margin: 0,
                        color: "#374151",
                      }}
                    >
                      Enter a batch number and click Filter to see results
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              students.map((student, idx) => (
                <tr
                  key={idx}
                  style={{
                    borderBottom: "1px solid #e5e7eb",
                    backgroundColor: idx % 2 === 0 ? "#f9fdf9" : "white",
                    transition: "background 0.3s ease",
                  }}
                >
                  <td
                    style={{
                      padding: "12px",
                      fontWeight: "600",
                      color: "#1f2937",
                    }}
                  >
                    {idx + 1}
                  </td>
                  <td
                    style={{
                      padding: "12px",
                      fontWeight: "600",
                      color: "#1f2937",
                    }}
                  >
                    {student.name}
                  </td>
                  <td style={{ padding: "12px", color: "#374151" }}>
                    {student.gpa}
                  </td>
                  <td style={{ padding: "12px", color: "#374151" }}>
                    ₱{student.income.toLocaleString()}
                  </td>
                  <td style={{ padding: "12px" }}>
                    <span
                      style={{
                        padding: "4px 10px",
                        borderRadius: "20px",
                        fontSize: "12px",
                        fontWeight: "600",
                        backgroundColor: "#fef3c7",
                        color: "#d97706",
                      }}
                    >
                      {student.need}
                    </span>
                  </td>
                  <td style={{ padding: "12px" }}>
                    <span
                      style={{
                        padding: "4px 10px",
                        borderRadius: "20px",
                        fontSize: "12px",
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
