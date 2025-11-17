// src/DataAnalysis.jsx
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
import { FaGraduationCap } from "react-icons/fa";

const PIE_COLORS = ["#059669", "#FACC15"]; // green, yellow
const BATCH_COLORS = ["#059669", "#FACC15", "#34D399", "#FBBF24", "#A7F3D0"];

const DataAnalysis = ({ batches = [] }) => {
  // flatten students with batch info
  const allStudents = useMemo(
    () =>
      batches.flatMap((batch) =>
        (batch.students || []).map((student) => ({
          ...student,
          batch: batch.name,
        }))
      ),
    [batches]
  );

  const totalStudents = allStudents.length;
  const eligibleStudents = allStudents.filter((s) => s.status === "Approved");
  const eligibleCount = eligibleStudents.length;

  const avgGPA =
    eligibleCount > 0
      ? (
          eligibleStudents.reduce(
            (sum, s) => sum + (parseFloat(s.gpa) || 0),
            0
          ) / eligibleCount
        ).toFixed(2)
      : "0.00";

  const avgIncome =
    eligibleCount > 0
      ? Math.round(
          eligibleStudents.reduce(
            (sum, s) => sum + (parseFloat(s.income) || 0),
            0
          ) / eligibleCount
        )
      : 0;

  const pieData = [
    { name: "Eligible", value: eligibleCount },
    { name: "Not Eligible", value: totalStudents - eligibleCount },
  ];

  // For GPA chart we keep data but will hide Y-axis ticks (names)
  const gpaData = eligibleStudents
    .slice()
    .sort((a, b) => (b.gpa || 0) - (a.gpa || 0))
    .map((s, i) => ({ id: i + 1, GPA: s.gpa || 0 }));

  const batchApprovalData = (batches || []).map((batch, idx) => {
    const approved = (batch.students || []).filter(
      (s) => s.status === "Approved"
    ).length;
    const total = (batch.students || []).length;
    return {
      batch: batch.name,
      approvedRate: total > 0 ? Math.round((approved / total) * 100) : 0,
      color: BATCH_COLORS[idx % BATCH_COLORS.length],
    };
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        fontFamily: "Poppins, sans-serif",
        backgroundColor: "#f5f5f5",
      }}
    >
      {/* Header (same as Dashboard) */}
      <header
        style={{
          height: 70,
          backgroundColor: "#0B4F36",
          color: "white",
          display: "flex",
          alignItems: "center",
          padding: "0 25px",
          fontWeight: "700",
          fontSize: 22,
          borderRadius: "0 0 20px 20px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
          position: "sticky",
          top: 0,
          zIndex: 1000,
        }}
      >
        <FaGraduationCap size={40} style={{ marginRight: 14 }} />
        Scholarship Eligibility Prediction System
      </header>

      {/* Main */}
      <main style={{ flex: 1, overflowY: "auto", padding: 25 }}>
        {/* Statistics Summary Title */}
        <h2
          style={{
            fontSize: 20,
            fontWeight: 700,
            color: "#1F2937",
            marginBottom: 12,
          }}
        >
          Statistics Summary
        </h2>

        {/* Statistics Cards (Dashboard/Batches style) */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 15,
            marginBottom: 22,
          }}
        >
          {[
            { key: "total", value: totalStudents },
            { key: "eligible", value: eligibleCount },
            { key: "gpa", value: avgGPA },
            { key: "income", value: `₱${avgIncome}` },
          ].map((card, i) => (
            <div
              key={card.key}
              style={{
                position: "relative",
                background: "white",
                borderRadius: 20,
                padding: 20,
                border: "2px solid #059669", // green border
                boxShadow: "0 3px 10px rgba(0,0,0,0.08)",
                textAlign: "center",
              }}
            >
              {/* thin yellow top accent (dashboard look) */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: 6,
                  backgroundColor: "#FACC15", // yellow
                  borderRadius: "20px 20px 0 0",
                }}
              />

              {/* label (small, yellow) */}
              <div style={{ marginTop: 10 }}>
                {/* label text kept but subtle; you previously asked sometimes to remove labels — this matches Dashboard style */}
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: "#FACC15",
                    marginBottom: 8,
                  }}
                >
                  {/* Small uppercase-ish label pulled from key */}
                  {card.key === "total"
                    ? "Total Students"
                    : card.key === "eligible"
                    ? "Eligible Students"
                    : card.key === "gpa"
                    ? "Average GPA"
                    : "Avg Family Income"}
                </div>

                {/* value */}
                <div
                  style={{
                    fontSize: 24,
                    fontWeight: 800,
                    color: "#0B4F36",
                    lineHeight: 1,
                  }}
                >
                  {card.value}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Charts area */}
        <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
          {/* Pie chart */}
          <div
            style={{
              flex: 1,
              minWidth: 300,
              background: "white",
              borderRadius: 15,
              padding: 20,
              border: "2px solid #059669",
              boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
            }}
          >
            <h3
              style={{
                textAlign: "center",
                color: "#065F46",
                marginBottom: 12,
              }}
            >
              Eligibility Status
            </h3>

            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  innerRadius={42}
                  paddingAngle={4}
                  cornerRadius={8}
                  label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                >
                  {pieData.map((entry, idx) => (
                    <Cell
                      key={idx}
                      fill={PIE_COLORS[idx % PIE_COLORS.length]}
                    />
                  ))}
                </Pie>
                <PieTooltip formatter={(v) => `${v} students`} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* GPA bar chart (names hidden) */}
          <div
            style={{
              flex: 1,
              minWidth: 300,
              background: "white",
              borderRadius: 15,
              padding: 20,
              border: "2px solid #059669",
              boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
            }}
          >
            <h3
              style={{
                textAlign: "center",
                color: "#065F46",
                marginBottom: 12,
              }}
            >
              GPA of Eligible Students
            </h3>

            <ResponsiveContainer width="100%" height={240}>
              <BarChart
                data={gpaData}
                layout="vertical"
                margin={{ top: 5, right: 10, left: 20, bottom: 5 }}
                barCategoryGap="18%"
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                {/* Hide Y axis labels (user requested no names shown) */}
                <YAxis
                  type="category"
                  dataKey="id"
                  tick={false}
                  axisLine={false}
                />
                <BarTooltip />
                <Legend />
                <Bar dataKey="GPA" radius={[10, 10, 10, 10]}>
                  {/* color gradient-like by picking green shades */}
                  {gpaData.map((entry, idx) => (
                    <Cell
                      key={idx}
                      fill={BATCH_COLORS[idx % BATCH_COLORS.length]}
                    />
                  ))}
                  <LabelList dataKey="GPA" position="right" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Batch approval rate */}
          <div
            style={{
              flex: 1,
              minWidth: 300,
              background: "white",
              borderRadius: 15,
              padding: 20,
              border: "2px solid #059669",
              boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
            }}
          >
            <h3
              style={{
                textAlign: "center",
                color: "#065F46",
                marginBottom: 12,
              }}
            >
              Batch Approval Rate (%)
            </h3>

            <ResponsiveContainer width="100%" height={240}>
              <BarChart
                data={batchApprovalData}
                margin={{ top: 5, right: 10, left: 0, bottom: 25 }}
                barCategoryGap="18%"
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="batch"
                  interval={0}
                  angle={-20}
                  textAnchor="end"
                  height={60}
                />
                <YAxis />
                <BarTooltip formatter={(v) => `${v}%`} />
                <Legend />
                <Bar dataKey="approvedRate" radius={[8, 8, 0, 0]}>
                  {batchApprovalData.map((entry, idx) => (
                    <Cell
                      key={idx}
                      fill={
                        entry.color || BATCH_COLORS[idx % BATCH_COLORS.length]
                      }
                    />
                  ))}
                  <LabelList
                    dataKey="approvedRate"
                    position="top"
                    formatter={(v) => `${v}%`}
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DataAnalysis;
