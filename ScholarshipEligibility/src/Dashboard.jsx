import { useMemo } from "react";
import { FaGraduationCap } from "react-icons/fa"; // Graduation hat icon

const Dashboard = ({ batches, setBatches }) => {
  const {
    totalApproved,
    totalRejected,
    totalStudents,
    processedBatches,
    overallRate,
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
      overallRate,
    };
  }, [batches]);

  const handleRemoveBatch = (index) => {
    const updated = [...batches];
    updated.splice(index, 1);
    setBatches(updated);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      {/* HEADER WITH ICON */}
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
          borderRadius: "0 0 20px 20px", // smooth bottom edge
          boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
          position: "sticky",
          top: 0,
          zIndex: 1000,
        }}
      >
        <FaGraduationCap size={40} style={{ marginRight: "15px" }} />
        Scholarship Eligibility Prediction
      </header>

      {/* MAIN CONTENT */}
      <main
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "25px",
          backgroundColor: "#f5f5f5",
        }}
      >
        {/* BATCH STATISTICS SUMMARY TITLE */}
        <h2
          style={{
            fontSize: "20px",
            fontWeight: "700",
            marginBottom: "15px",
            color: "#1F2937",
          }}
        >
          Batch Statistics Summary
        </h2>

        {/* STATISTICS CARDS */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: "15px",
            marginBottom: "25px",
          }}
        >
          {[
            { title: "Total Batches", value: batches.length },
            { title: "Total Students", value: totalStudents },
            { title: "Approved", value: totalApproved },
            { title: "Rejected", value: totalRejected },
            { title: "Approval Rate", value: overallRate },
          ].map((item, index) => (
            <div
              key={index}
              style={{
                background:
                  index === 2
                    ? "#D4F7D0"
                    : index === 3
                    ? "#FFD5D5"
                    : index === 4
                    ? "#FCECB2"
                    : "white",
                borderRadius: "20px",
                padding: "20px",
                textAlign: "center",
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
              }}
            >
              <p
                style={{
                  fontSize: "12px",
                  color: "#4B5563",
                  marginBottom: "5px",
                  fontWeight: "600",
                }}
              >
                {item.title}
              </p>
              <p
                style={{
                  fontSize: "22px",
                  fontWeight: "700",
                  color: "#1F2937",
                  margin: 0,
                }}
              >
                {item.value}
              </p>
            </div>
          ))}
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
