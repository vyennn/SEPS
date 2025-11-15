import { useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip as PieTooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as BarTooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
} from "recharts";

const COLORS = ["#059669", "#4caf50"]; // Green = eligible, gray = not eligible

const DataAnalysis = ({ batches = [] }) => {
  const allStudents = useMemo(
    () =>
      batches.flatMap((batch) =>
        batch.students.map((student) => ({ ...student, batch: batch.name }))
      ),
    [batches]
  );

  const totalStudents = allStudents.length;
  const eligibleStudents = allStudents.filter((s) => s.status === "Approved");
  const eligibleCount = eligibleStudents.length;

  const avgGPA =
    eligibleCount > 0
      ? (
          eligibleStudents.reduce((sum, s) => sum + (s.gpa || 0), 0) /
          eligibleCount
        ).toFixed(2)
      : "0.00";

  const avgIncome =
    eligibleCount > 0
      ? Math.round(
          eligibleStudents.reduce((sum, s) => sum + (s.income || 0), 0) /
            eligibleCount
        )
      : 0;

  // Pie chart data
  const pieData = [
    { name: "Eligible", value: eligibleCount },
    { name: "Not Eligible", value: totalStudents - eligibleCount },
  ];

  // GPA Bar chart data (horizontal)
  const gpaData = eligibleStudents.map((s) => ({ name: s.name, GPA: s.gpa || 0 }));

  // Batch approval chart data
  const batchApprovalData = batches.map((batch) => {
    const approved = batch.students.filter((s) => s.status === "Approved").length;
    const total = batch.students.length;
    return {
      batch: batch.name,
      approvedRate: total > 0 ? Math.round((approved / total) * 100) : 0,
    };
  });

  return (
    <div style={{ padding: 20, backgroundColor: "#f8fafc", flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <h2 style={{ fontSize: "24px",
          color: "#1f2937",
          marginBottom: "5px",
          textAlign: "center",
          fontFamily: "sans-serif",}}>
        DATA ANALYSIS
      </h2>
      <p style={{ color: "#666", marginBottom: 5, fontSize: 13 }}>
        Comprehensive analysis of scholarship eligibility data
      </p>

      {totalStudents === 0 ? (
        <div style={{ background: "linear-gradient(135deg, #fef3c7, #f59e0b)", border: "2px solid #f59e0b", borderRadius: 10, padding: 40, textAlign: "center", boxShadow: "0 5px 15px rgba(0,0,0,0.1)" }}>
          <span style={{ fontSize: 48, display: "block", marginBottom: 15 }}>📊</span>
          <h3 style={{ fontSize: 18, fontWeight: "bold", color: "#92400e", marginBottom: 8 }}>No Data Available</h3>
          <p style={{ color: "#92400e", fontSize: 13 }}>
            Add students to the system to view comprehensive data analysis and statistics.
          </p>
        </div>
      ) : (
        <>
          {/* Stats Cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 15, marginBottom: 20 }}>
            {[
              { label: "Total Students", value: totalStudents, color: "#1f2937" },
              {
                label: "Eligible Students",
                value: eligibleCount,
                color: "#059669",
                sub: `${eligibleCount > 0 ? Math.round((eligibleCount / totalStudents) * 100) : 0}% of total`,
              },
              { label: "Average GPA", value: avgGPA, color: "#1f2937", sub: "Eligible students" },
              { label: "Avg Family Income", value: `₱${avgIncome}`, color: "#1f2937", sub: "Monthly income" },
            ].map((stat, idx) => (
              <div key={idx} style={{ background: "white", borderRadius: 10, padding: 15, boxShadow: "0 2px 5px rgba(0,0,0,0.1)", border: "2px solid #059669" }}>
                <p style={{ color: "#666", fontSize: 12, fontWeight: 600, margin: "0 0 5px 0" }}>{stat.label}</p>
                <p style={{ fontSize: 20, fontWeight: "bold", color: stat.color, margin: "0 0 2px 0" }}>{stat.value}</p>
                {stat.sub && <p style={{ fontSize: 11, color: "#999", margin: 0 }}>{stat.sub}</p>}
              </div>
            ))}
          </div>

          {/* Charts */}
          <div style={{ display: "flex", gap: 20, flexWrap: "wrap", marginBottom: 20 }}>
            {/* Pie Chart */}
            <div style={{ flex: 1, minWidth: 300, background: "white", borderRadius: 10, padding: 20, border: "2px solid #059669", boxShadow: "0 2px 5px rgba(0,0,0,0.1)", textAlign: "center" }}>
              <h3 style={{ marginBottom: 15 }}>Eligibility Status</h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <PieTooltip formatter={(value) => `${value} students`} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* GPA Bar Chart (horizontal) */}
            <div style={{ flex: 1, minWidth: 300, background: "white", borderRadius: 10, padding: 20, border: "2px solid #059669", boxShadow: "0 2px 5px rgba(0,0,0,0.1)" }}>
              <h3 style={{ textAlign: "center", marginBottom: 15 }}>GPA of Eligible Students</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={gpaData} layout="vertical" margin={{ top: 5, right: 20, left: 60, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis type="category" dataKey="name" />
                  <BarTooltip />
                  <Legend />
                  <Bar dataKey="GPA" fill="#059669">
                    <LabelList dataKey="GPA" position="right" />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Batch Approval Rate Chart */}
            <div style={{ flex: 1, minWidth: 300, background: "white", borderRadius: 10, padding: 20, border: "2px solid #059669", boxShadow: "0 2px 5px rgba(0,0,0,0.1)" }}>
              <h3 style={{ textAlign: "center", marginBottom: 15 }}>Batch Approval Rate (%)</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={batchApprovalData} margin={{ top: 5, right: 20, left: 0, bottom: 25 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="batch" />
                  <YAxis />
                  <BarTooltip formatter={(value) => `${value}%`} />
                  <Legend />
                  <Bar dataKey="approvedRate" fill="#059669">
                    <LabelList dataKey="approvedRate" position="top" formatter={(val) => `${val}%`} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DataAnalysis;
