const DataAnalysis = () => {
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
        DATA ANALYSIS
      </h2>
      <p
        style={{
          color: "#6b7280",
          marginBottom: "25px",
          fontSize: "13px",
        }}
      ></p>

      {/* === SUMMARY CARDS === */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px",
          marginBottom: "25px",
        }}
      >
        {[
          { label: "Total Students", value: "0", color: "#2f5d3f" },
          {
            label: "Eligible Students",
            value: "0",
            color: "#63A361",
            sub: "0% of total",
          },
          {
            label: "Average GPA",
            value: "0.00",
            color: "#2f5d3f",
            sub: "Eligible students",
          },
          {
            label: "Avg Family Income",
            value: "₱0",
            color: "#2f5d3f",
            sub: "Monthly income",
          },
        ].map((stat, idx) => (
          <div
            key={idx}
            style={{
              background: "white",
              borderRadius: "16px",
              padding: "20px 25px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
              border: "1px solid #d1e8d2",
              transition: "all 0.3s ease",
            }}
          >
            <p
              style={{
                color: "#6b7280",
                fontSize: "13px",
                fontWeight: "600",
                margin: "0 0 8px 0",
              }}
            >
              {stat.label}
            </p>
            <p
              style={{
                fontSize: "22px",
                fontWeight: "700",
                color: stat.color,
                margin: "0 0 4px 0",
              }}
            >
              {stat.value}
            </p>
            {stat.sub && (
              <p style={{ fontSize: "12px", color: "#9ca3af", margin: 0 }}>
                {stat.sub}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* === PLACEHOLDER CHART / EMPTY STATE === */}
      <div
        style={{
          background: "white",
          borderRadius: "16px",
          padding: "50px 20px",
          textAlign: "center",
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
          border: "1px solid #e1efe2",
        }}
      >
        <span
          style={{
            fontSize: "48px",
            display: "block",
            marginBottom: "12px",
          }}
        >
          📊
        </span>
        <h3
          style={{
            fontSize: "18px",
            fontWeight: "600",
            color: "#2f5d3f",
            margin: "0 0 10px 0",
          }}
        >
          No Data Available
        </h3>
        <p style={{ color: "#6b7280", fontSize: "13px", margin: 0 }}>
          Add students to the system to view comprehensive data analysis and
          statistics.
        </p>
      </div>
    </div>
  );
};

export default DataAnalysis;
