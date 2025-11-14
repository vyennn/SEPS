const Dashboard = ({ batches, setBatches }) => {
  // Total approved/rejected across all batches
  const totalApproved = batches.reduce((sum, b) => sum + b.approved, 0);
  const totalRejected = batches.reduce((sum, b) => sum + b.rejected, 0);
  const totalStudents = batches.reduce((sum, b) => sum + b.total, 0);

  // Overall approval rate
  const overallRate =
    totalStudents === 0 ? "0%" : ((totalApproved / totalStudents) * 100).toFixed(1) + "%";

  // Compute batch approval rate inside the loop
  const processedBatches = batches.map((b) => {
    const rate = b.total === 0 ? "0%" : ((b.approved / b.total) * 100).toFixed(1) + "%";
    return { ...b, rate };
  });

  // Handle removing a batch
  const handleRemoveBatch = (index) => {
    const updated = [...batches];
    updated.splice(index, 1);
    setBatches(updated);
  };

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#f8fafc",
        flex: 1,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
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

      {/* STATISTICS PANEL */}
      <div
        style={{
          backgroundColor: "#dbeafe",
          borderRadius: "5px",
          padding: "15px",
          marginBottom: "20px",
        }}
      >
        <h4 style={{ 
          fontWeight: "bold", 
          color: "#1e40af", 
          marginBottom: "10px", 
          fontSize: "13px" }}>
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
            }}
          >
            <p style={{ 
              color: "#666", 
              fontSize: "11px", 
              margin: 0 
              }}
            >Total Batches</p>
            <p style={{ fontSize: "18px", fontWeight: "bold", color: "#3b82f6" }}>{batches.length}</p>
          </div>
          <div style={{ textAlign: "center" }}>
            <p style={{ color: "#666", fontSize: "11px", margin: 0 }}>Total Students</p>
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

      {/* BATCH TABLE */}
      <div
        style={{
          background: "white",
          borderRadius: "10px",
          padding: "20px",
          boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
        }}
      >
        <h3
          style={{
            fontSize: "18px",
            fontWeight: "bold",
            color: "#1f2937",
            marginBottom: "15px",
          }}
        >
          BATCH SUMMARY TABLE
        </h3>

        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "12px" }}>
          <thead>
            <tr style={{ backgroundColor: "#63A361", color: "white" }}>
              <th style={{ padding: "10px", textAlign: "left" }}>Batch</th>
              <th style={{ padding: "10px", textAlign: "left" }}>Total Students</th>
              <th style={{ padding: "10px", textAlign: "left" }}>Approved</th>
              <th style={{ padding: "10px", textAlign: "left" }}>Rejected</th>
              <th style={{ padding: "10px", textAlign: "left" }}>Approval Rate</th>
              <th style={{ padding: "10px", textAlign: "left" }}>Status</th>
              <th style={{ padding: "10px", textAlign: "left" }}>Date Created</th>
              <th style={{ padding: "10px", textAlign: "left" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {processedBatches.length === 0 ? (
              <tr>
                <td colSpan="8" style={{ textAlign: "center", padding: "20px" }}>
                  No batches yet. Filter students to create a batch.
                </td>
              </tr>
            ) : (
              processedBatches.map((batch, idx) => (
                <tr key={idx} style={{ borderBottom: "1px solid #e5e7eb" }}>
                  <td style={{ padding: "10px", fontWeight: "600" }}>{batch.name}</td>
                  <td style={{ padding: "10px" }}>{batch.total}</td>
                  <td style={{ padding: "10px", color: "#059669" }}>{batch.approved}</td>
                  <td style={{ padding: "10px", color: "#ef4444" }}>{batch.rejected}</td>
                  <td style={{ padding: "10px", color: "#d97706" }}>{batch.rate}</td>
                  <td style={{ padding: "10px" }}>{batch.status}</td>
                  <td style={{ padding: "10px", color: "#666" }}>
                    {batch.date} {batch.time || ""}
                  </td>
                  <td style={{ padding: "10px" }}>
                    <button
                      onClick={() => handleRemoveBatch(idx)}
                      style={{
                        backgroundColor: "#ef4444",
                        color: "white",
                        border: "none",
                        padding: "5px 10px",
                        borderRadius: "5px",
                        cursor: "pointer",
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
    </div>
  );
};

export default Dashboard;
