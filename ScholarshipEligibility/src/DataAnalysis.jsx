const DataAnalysis = () => {
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
        DATA ANALYSIS
      </h2>
      <p
        style={{
          color: "#666",
          marginBottom: "20px",
          fontSize: "13px",
        }}
      >
        Comprehensive analysis of scholarship eligibility data
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "15px",
          marginBottom: "20px",
        }}
      >
        {[
          { label: "Total Students", value: "0", color: "#1f2937" },
          {
            label: "Eligible Students",
            value: "0",
            color: "#059669",
            sub: "0% of total",
          },
          {
            label: "Average GPA",
            value: "0.00",
            color: "#1f2937",
            sub: "Eligible students",
          },
          {
            label: "Avg Family Income",
            value: "₱0",
            color: "#1f2937",
            sub: "Monthly income",
          },
        ].map((stat, idx) => (
          <div
            key={idx}
            style={{
              background: "white",
              borderRadius: "10px",
              padding: "15px",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
              border: "2px solid #059669",
            }}
          >
            <p
              style={{
                color: "#666",
                fontSize: "12px",
                fontWeight: "600",
                margin: "0 0 5px 0",
              }}
            >
              {stat.label}
            </p>
            <p
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                color: stat.color,
                margin: "0 0 2px 0",
              }}
            >
              {stat.value}
            </p>
            {stat.sub && (
              <p style={{ fontSize: "11px", color: "#999", margin: 0 }}>
                {stat.sub}
              </p>
            )}
          </div>
        ))}
      </div>

      <div
        style={{
          background: "linear-gradient(135deg, #fef3c7, #f59e0b)",
          border: "2px solid #f59e0b",
          borderRadius: "10px",
          padding: "40px 20px",
          textAlign: "center",
          boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
        }}
      >
        <span
          style={{ fontSize: "48px", display: "block", marginBottom: "15px" }}
        >
          📊
        </span>
        <h3
          style={{
            fontSize: "18px",
            fontWeight: "bold",
            color: "#92400e",
            margin: "0 0 8px 0",
          }}
        >
          No Data Available
        </h3>
        <p style={{ color: "#92400e", fontSize: "13px", margin: 0 }}>
          Add students to the system to view comprehensive data analysis and
          statistics.
        </p>
      </div>
    </div>
  );
};

export default DataAnalysis;
