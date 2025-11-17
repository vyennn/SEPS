import { useMemo } from "react";
import { FaGraduationCap } from "react-icons/fa"; // Graduation hat icon

  const Dashboard = ({ batches, setBatches }) => {
    // Automatically compute totals whenever batches change
    const { 
      totalApproved, 
      totalRejected, 
      totalStudents, 
      processedBatches, 
      overallRate 
    } = useMemo(() => {
      const totalApproved = batches.reduce((sum, b) => sum + b.approved, 0);
      const totalRejected = batches.reduce((sum, b) => sum + b.rejected, 0);
      const totalStudents = batches.reduce((sum, b) => sum + b.total, 0);

    const overallRate =
      totalStudents === 0
        ? "0%"
        : ((totalApproved / totalStudents) * 100).toFixed(1) + "%";

    const processedBatches = batches.map((b) => {
      const rate =
        b.total === 0 ? "0%" : ((b.approved / b.total) * 100).toFixed(1) + "%";
      return { ...b, rate };
    });

      return { 
        totalApproved, 
        totalRejected, 
        totalStudents, 
        processedBatches, 
        overallRate 
      };
    }, [batches]);

    const handleRemoveBatch = (index) => {
      const updated = [...batches];
      updated.splice(index, 1);
      setBatches(updated);
    };
  }, [batches]);

    return (
      <div style={{ 
        padding: "20px", 
        backgroundColor: "#f8fafc", 
        flex: 1, 
        display: "flex", 
        flexDirection: "column", 
        overflow: "hidden" 
      }}>
        <h2 style={{ 
          fontSize: "24px", 
          color: "#1f2937", 
          marginBottom: "5px", 
          textAlign: "center", 
          fontFamily: "sans-serif" 
        }}>
          DASHBOARD
        </h2>
        {/* STATISTICS PANEL */}
        <div style={{ 
          backgroundColor: "#dbeafe", 
          borderRadius: "5px", 
          padding: "15px", 
          marginBottom: "20px" 
        }}>
          <h4 style={{ 
            fontWeight: "bold", 
            color: "#1e40af", 
            marginBottom: "10px", 
            fontSize: "13px" 
          }}>
            Batch Statistics Summary
          </h4>

          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(5, 1fr)", 
            gap: "10px" 
          }}
          >
          <div style={{ 
            textAlign: "center" 
            }}>
            <p style={{ 
              color: "#666", 
              fontSize: "11px", 
              margin: 0 
              }}>
                Total Batches
                </p>
              <p style={{ 
                fontSize: "18px", 
                fontWeight: "bold", 
                color: "#3b82f6" 
                }}
              >{batches.length}</p>
          </div>
            <div style={{ 
              textAlign: "center" 
              }}>
              <p style={{ 
                color: "#666", 
                fontSize: "11px", 
                margin: 0 
                }}>
                Total Students
                </p>
              <p style={{ fontSize: "18px", fontWeight: "bold", color: "#3b82f6" }}>{totalStudents}</p>
            </div>
            <div style={{ textAlign: "center" }}>
              <p style={{ color: "#666", fontSize: "11px", margin: 0 }}>Total Approved</p>
              <p style={{ fontSize: "18px", fontWeight: "bold", color: "#059669" }}>{totalApproved}</p>
            </div>
            <div style={{ textAlign: "center" }}>
              <p style={{ color: "#666", fontSize: "11px", margin: 0 }}>Total Rejected</p>
              <p style={{ fontSize: "18px", fontWeight: "bold", color: "#ef4444" }}>{totalRejected}</p>
            </div>
            <div style={{ textAlign: "center" }}>
              <p style={{ color: "#666", fontSize: "11px", margin: 0 }}>Overall Approval Rate</p>
              <p style={{ fontSize: "18px", fontWeight: "bold", color: "#059669" }}>{overallRate}</p>
            </div>
          </div>
        </div>

        {/* BATCH TABLE CARD */}
        <div
          style={{
            background: "white",
            padding: "25px",
            borderRadius: "20px",
            boxShadow: "0 3px 10px rgba(0,0,0,0.15)",
          }}
        >
          <h2
            style={{
              fontSize: "20px",
              fontWeight: "700",
              marginBottom: "15px",
              color: "#1F2937",
            }}
          >
            Batch Summary Table
          </h2>

          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "13px",
            }}
          >
            <thead>
              <tr style={{ backgroundColor: "#F0B400", color: "white" }}>
                <th style={{ padding: "12px", textAlign: "left" }}>Batch</th>
                <th style={{ padding: "12px", textAlign: "left" }}>
                  Total Students
                </th>
                <th style={{ padding: "12px", textAlign: "left" }}>Approved</th>
                <th style={{ padding: "12px", textAlign: "left" }}>Rejected</th>
                <th style={{ padding: "12px", textAlign: "left" }}>
                  Approval Rate
                </th>
                <th style={{ padding: "12px", textAlign: "left" }}>Status</th>
                <th style={{ padding: "12px", textAlign: "left" }}>
                  Date Created
                </th>
                <th style={{ padding: "12px", textAlign: "left" }}>Action</th>
              </tr>
            </thead>

            <tbody>
              {processedBatches.length === 0 ? (
                <tr>
                  <td
                    colSpan="8"
                    style={{ padding: "20px", textAlign: "center" }}
                  >
                    No batches yet. Filter students to create a batch.
                  </td>
                </tr>
              ) : (
                processedBatches.map((batch, idx) => (
                  <tr
                    key={idx}
                    style={{
                      borderBottom: "1px solid #E5E7EB",
                    }}
                  >
                    <td style={{ padding: "12px", fontWeight: "600" }}>
                      {batch.name}
                    </td>
                    <td style={{ padding: "12px" }}>{batch.total}</td>
                    <td style={{ padding: "12px", color: "#0B7D2A" }}>
                      {batch.approved}
                    </td>
                    <td style={{ padding: "12px", color: "#E63946" }}>
                      {batch.rejected}
                    </td>
                    <td style={{ padding: "12px", color: "#D97706" }}>
                      {batch.rate}
                    </td>
                    <td style={{ padding: "12px" }}>{batch.status}</td>
                    <td style={{ padding: "12px", color: "#6B7280" }}>
                      {batch.date} {batch.time || ""}
                    </td>
                    <td style={{ padding: "12px" }}>
                      <button
                        onClick={() => handleRemoveBatch(idx)}
                        style={{
                          backgroundColor: "#E63946",
                          color: "white",
                          border: "none",
                          padding: "6px 12px",
                          borderRadius: "10px",
                          cursor: "pointer",
                          fontWeight: "600",
                        }}
                      >
                        Remove
                      </button>
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

export default Dashboard;
