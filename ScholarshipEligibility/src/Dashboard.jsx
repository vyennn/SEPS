import React from "react";

const Dashboard = ({ batches, students }) => {
  const approvedCount = students.filter((s) => s.status === "Approved").length;
  const rejectedCount = students.filter((s) => s.status === "Rejected").length;

  return (
    <div
      style={{
        padding: "40px 60px",
        backgroundColor: "#f9fdf9",
        flex: 1,
        display: "flex",
        flexDirection: "column",
        fontFamily: "'Poppins', sans-serif",
        minHeight: "100vh",
      }}
    >
      {/* Header */}
      <h2
        style={{
          fontSize: "26px",
          color: "#2f5d3f",
          marginBottom: "25px",
          textAlign: "left",
          fontWeight: "600",
        }}
      >
        📊 Dashboard
      </h2>

      {/* Summary Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "25px",
          marginBottom: "30px",
        }}
      >
        {[
          {
            label: "Total Approved Students",
            value: approvedCount,
            icon: "✅",
          },
          {
            label: "Total Rejected Students",
            value: rejectedCount,
            icon: "❌",
          },
          {
            label: "Total Students",
            value: students.length,
            icon: "👥",
          },
        ].map((card, i) => (
          <div
            key={i}
            style={{
              background: "white",
              borderRadius: "16px",
              padding: "25px 30px",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
              border: "1px solid #d1e8d2",
              display: "flex",
              alignItems: "center",
              gap: "20px",
              transition: "all 0.3s ease",
            }}
          >
            <div
              style={{
                width: "50px",
                height: "50px",
                backgroundColor: "#6abf69",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "22px",
                color: "white",
              }}
            >
              {card.icon}
            </div>
            <div>
              <p
                style={{
                  color: "#6b7280",
                  fontSize: "13px",
                  margin: "0 0 4px 0",
                }}
              >
                {card.label}
              </p>
              <p
                style={{
                  fontSize: "26px",
                  fontWeight: "600",
                  color: "#1a1a1a",
                  margin: 0,
                }}
              >
                {card.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Table Section */}
      <div
        style={{
          background: "white",
          borderRadius: "16px",
          padding: "30px",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
          border: "1px solid #e1efe2",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <h3
            style={{
              fontSize: "18px",
              fontWeight: "600",
              color: "#2f5d3f",
              margin: 0,
            }}
          >
            Batch Summary Table
          </h3>
          <button
            style={{
              backgroundColor: "#63A361",
              color: "white",
              padding: "10px 18px",
              borderRadius: "25px",
              border: "none",
              cursor: "pointer",
              fontWeight: "500",
              fontSize: "13px",
              transition: "all 0.3s ease",
            }}
          >
            + Create New Batch
          </button>
        </div>

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: "13px",
            borderRadius: "12px",
            overflow: "hidden",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#63A361", color: "white" }}>
              {[
                "Batch",
                "Total Students",
                "Approved",
                "Rejected",
                "Approval Rate",
                "Status",
                "Date Created",
              ].map((h, i) => (
                <th
                  key={i}
                  style={{
                    padding: "12px 10px",
                    textAlign: "left",
                    fontWeight: "500",
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {batches.map((batch, idx) => (
              <tr
                key={idx}
                style={{
                  borderBottom: "1px solid #e5e7eb",
                  backgroundColor: idx % 2 === 0 ? "#f9fdf9" : "white",
                }}
              >
                <td style={{ padding: "10px", fontWeight: "500" }}>
                  {batch.name}
                </td>
                <td style={{ padding: "10px" }}>{batch.total}</td>
                <td style={{ padding: "10px", color: "#059669" }}>
                  {batch.approved}
                </td>
                <td style={{ padding: "10px", color: "#ef4444" }}>
                  {batch.rejected}
                </td>
                <td style={{ padding: "10px", color: "#d97706" }}>
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
                <td style={{ padding: "10px", color: "#6b7280" }}>
                  {batch.date}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Summary */}
        <div
          style={{
            backgroundColor: "#eef9ee",
            borderRadius: "10px",
            padding: "20px",
            marginTop: "25px",
          }}
        >
          <h4
            style={{
              fontWeight: "600",
              color: "#2f5d3f",
              marginBottom: "10px",
              fontSize: "14px",
            }}
          >
            Batch Statistics Summary
          </h4>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "15px",
            }}
          >
            {[
              {
                label: "Total Batches",
                value: batches.length,
                color: "#3b82f6",
              },
              {
                label: "Total Approved",
                value: batches.reduce((sum, b) => sum + b.approved, 0),
                color: "#059669",
              },
              {
                label: "Total Rejected",
                value: batches.reduce((sum, b) => sum + b.rejected, 0),
                color: "#ef4444",
              },
              {
                label: "Overall Approval Rate",
                value: "0%",
                color: "#059669",
              },
            ].map((item, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <p
                  style={{
                    color: "#666",
                    fontSize: "12px",
                    marginBottom: "5px",
                  }}
                >
                  {item.label}
                </p>
                <p
                  style={{
                    fontSize: "18px",
                    fontWeight: "600",
                    color: item.color,
                    margin: 0,
                  }}
                >
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
