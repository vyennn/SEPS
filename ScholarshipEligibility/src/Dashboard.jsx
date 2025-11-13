const Dashboard = ({ batches, students }) => {
  const approvedCount = students.filter((s) => s.status === "Approved").length;
  const rejectedCount = students.filter((s) => s.status === "Rejected").length;

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
          color: "#1f2937",
          marginBottom: "5px",
          textAlign: "center",
          fontFamily: "sans-serif",
        }}
      >
        DASHBOARD
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px",
          marginBottom: "20px",
        }}
      >
        <div
          style={{
            background: "white",
            borderRadius: "10px",
            padding: "20px",
            border: "2px solid #63A361",
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
            <div
              style={{
                width: "40px",
                height: "40px",
                backgroundColor: "#059669",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span style={{ fontSize: "18px", color: "white" }}>✅</span>
            </div>
            <div>
              <p
                style={{ color: "#666", fontSize: "12px", margin: "0 0 2px 0" }}
              >
                Total Approved Students
              </p>
              <p
                style={{
                  fontSize: "24px",
                  fontWeight: "bold",
                  color: "#1f2937",
                  margin: 0,
                }}
              >
                {approvedCount}
              </p>
            </div>
          </div>
        </div>

        <div
          style={{
            background: "white",
            borderRadius: "10px",
            padding: "20px",
            border: "2px solid #63A361",
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
            <div
              style={{
                width: "40px",
                height: "40px",
                backgroundColor: "#059669",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span style={{ fontSize: "18px", color: "white" }}>❌</span>
            </div>
            <div>
              <p
                style={{ color: "#666", fontSize: "12px", margin: "0 0 2px 0" }}
              >
                Total Rejected Students
              </p>
              <p
                style={{
                  fontSize: "24px",
                  fontWeight: "bold",
                  color: "#1f2937",
                  margin: 0,
                }}
              >
                {rejectedCount}
              </p>
            </div>
          </div>
        </div>

        <div
          style={{
            background: "white",
            borderRadius: "10px",
            padding: "20px",
            border: "2px solid #63A361",
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
            <div
              style={{
                width: "40px",
                height: "40px",
                backgroundColor: "#059669",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span style={{ fontSize: "18px", color: "white" }}>👥</span>
            </div>
            <div>
              <p
                style={{ color: "#666", fontSize: "12px", margin: "0 0 2px 0" }}
              >
                Total Students
              </p>
              <p
                style={{
                  fontSize: "24px",
                  fontWeight: "bold",
                  color: "#1f2937",
                  margin: 0,
                }}
              >
                {students.length}
              </p>
            </div>
          </div>
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
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "15px",
          }}
        >
          <h3
            style={{
              fontSize: "18px",
              fontWeight: "bold",
              color: "#1f2937",
              margin: 0,
              
            }}
          >
            BATCH SUMMARY TABLE
          </h3>
          <button
            style={{
              backgroundColor: "#63A361",
              color: "white",
              padding: "8px 15px",
              borderRadius: "5px",
              border: "none",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "12px",
              display: "flex",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <span style={{ fontSize: "16px" }}>+</span>
            Create New Batch
          </button>
        </div>

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: "12px",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#63A361", color: "white" }}>
              <th
                style={{
                  padding: "10px",
                  textAlign: "left",
                  fontWeight: "600",
                }}
              >
                Batch
              </th>
              <th
                style={{
                  padding: "10px",
                  textAlign: "left",
                  fontWeight: "600",
                }}
              >
                Total Students
              </th>
              <th
                style={{
                  padding: "10px",
                  textAlign: "left",
                  fontWeight: "600",
                }}
              >
                Approved
              </th>
              <th
                style={{
                  padding: "10px",
                  textAlign: "left",
                  fontWeight: "600",
                }}
              >
                Rejected
              </th>
              <th
                style={{
                  padding: "10px",
                  textAlign: "left",
                  fontWeight: "600",
                }}
              >
                Approval Rate
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
              <th
                style={{
                  padding: "10px",
                  textAlign: "left",
                  fontWeight: "600",
                }}
              >
                Date Created
              </th>
            </tr>
          </thead>
          <tbody>
            {batches.map((batch, idx) => (
              <tr key={idx} style={{ borderBottom: "1px solid #e5e7eb" }}>
                <td
                  style={{
                    padding: "10px",
                    color: "#1f2937",
                    fontWeight: "600",
                  }}
                >
                  {batch.name}
                </td>
                <td style={{ padding: "10px" }}>{batch.total}</td>
                <td
                  style={{
                    padding: "10px",
                    color: "#059669",
                    fontWeight: "600",
                  }}
                >
                  {batch.approved}
                </td>
                <td
                  style={{
                    padding: "10px",
                    color: "#ef4444",
                    fontWeight: "600",
                  }}
                >
                  {batch.rejected}
                </td>
                <td
                  style={{
                    padding: "10px",
                    color: "#d97706",
                    fontWeight: "600",
                  }}
                >
                  {batch.rate}
                </td>
                <td style={{ padding: "10px" }}>
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                      color: "#3b82f6",
                    }}
                  >
                    <span
                      style={{
                        width: "6px",
                        height: "6px",
                        backgroundColor: "#3b82f6",
                        borderRadius: "50%",
                      }}
                    ></span>
                    {batch.status}
                  </span>
                </td>
                <td style={{ padding: "10px", color: "#666" }}>{batch.date}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div
          style={{
            backgroundColor: "#dbeafe",
            borderRadius: "5px",
            padding: "15px",
            marginTop: "15px",
          }}
        >
          <h4
            style={{
              fontWeight: "bold",
              color: "#1e40af",
              marginBottom: "10px",
              fontSize: "13px",
            }}
          >
            Batch Statistics Summary
          </h4>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "10px",
            }}
          >
            <div style={{ textAlign: "center" }}>
              <p
                style={{ color: "#666", fontSize: "11px", margin: "0 0 2px 0" }}
              >
                Total Batches
              </p>
              <p
                style={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  color: "#3b82f6",
                  margin: 0,
                }}
              >
                {batches.length}
              </p>
            </div>
            <div style={{ textAlign: "center" }}>
              <p
                style={{ color: "#666", fontSize: "11px", margin: "0 0 2px 0" }}
              >
                Total Approved
              </p>
              <p
                style={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  color: "#059669",
                  margin: 0,
                }}
              >
                {batches.reduce((sum, b) => sum + b.approved, 0)}
              </p>
            </div>
            <div style={{ textAlign: "center" }}>
              <p
                style={{ color: "#666", fontSize: "11px", margin: "0 0 2px 0" }}
              >
                Total Rejected
              </p>
              <p
                style={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  color: "#ef4444",
                  margin: 0,
                }}
              >
                {batches.reduce((sum, b) => sum + b.rejected, 0)}
              </p>
            </div>
            <div style={{ textAlign: "center" }}>
              <p
                style={{ color: "#666", fontSize: "11px", margin: "0 0 2px 0" }}
              >
                Overall Approval Rate
              </p>
              <p
                style={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  color: "#059669",
                  margin: 0,
                }}
              >
                0%
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
