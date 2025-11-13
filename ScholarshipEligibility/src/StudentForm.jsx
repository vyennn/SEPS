import { useState } from "react";

const StudentForm = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    firstName: "Juan",
    lastName: "Dela Cruz",
    gpa: "1.75",
    parentIncome: "15000",
    siblings: "3",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        padding: "20px",
      }}
    >
      <div
        style={{
          background: "white",
          borderRadius: "10px",
          width: "100%",
          maxWidth: "500px",
          maxHeight: "90vh",
          overflow: "auto",
        }}
      >
        <div
          style={{
            background: "#059669",
            color: "white",
            padding: "15px 20px",
            borderRadius: "10px 10px 0 0",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h3 style={{ fontSize: "16px", fontWeight: "bold", margin: 0 }}>
            ADD NEW STUDENT
          </h3>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              color: "white",
              fontSize: "20px",
              cursor: "pointer",
            }}
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ padding: "20px" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "10px",
              marginBottom: "15px",
            }}
          >
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "12px",
                  fontWeight: "600",
                  marginBottom: "5px",
                  color: "#374151",
                }}
              >
                First Name *
              </label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
                style={{
                  width: "100%",
                  padding: "8px 10px",
                  border: "1px solid #d1d5db",
                  borderRadius: "5px",
                  outline: "none",
                  fontSize: "12px",
                }}
                required
              />
            </div>
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "12px",
                  fontWeight: "600",
                  marginBottom: "5px",
                  color: "#374151",
                }}
              >
                Last Name *
              </label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
                style={{
                  width: "100%",
                  padding: "8px 10px",
                  border: "1px solid #d1d5db",
                  borderRadius: "5px",
                  outline: "none",
                  fontSize: "12px",
                }}
                required
              />
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "10px",
              marginBottom: "20px",
            }}
          >
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "12px",
                  fontWeight: "600",
                  marginBottom: "5px",
                  color: "#374151",
                }}
              >
                GPA *
              </label>
              <input
                type="text"
                value={formData.gpa}
                onChange={(e) =>
                  setFormData({ ...formData, gpa: e.target.value })
                }
                style={{
                  width: "100%",
                  padding: "8px 10px",
                  border: "1px solid #d1d5db",
                  borderRadius: "5px",
                  outline: "none",
                  fontSize: "12px",
                }}
                required
              />
            </div>
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "12px",
                  fontWeight: "600",
                  marginBottom: "5px",
                  color: "#374151",
                }}
              >
                Parent Income *
              </label>
              <input
                type="text"
                value={formData.parentIncome}
                onChange={(e) =>
                  setFormData({ ...formData, parentIncome: e.target.value })
                }
                style={{
                  width: "100%",
                  padding: "8px 10px",
                  border: "1px solid #d1d5db",
                  borderRadius: "5px",
                  outline: "none",
                  fontSize: "12px",
                }}
                required
              />
            </div>
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "12px",
                  fontWeight: "600",
                  marginBottom: "5px",
                  color: "#374151",
                }}
              >
                Siblings *
              </label>
              <input
                type="text"
                value={formData.siblings}
                onChange={(e) =>
                  setFormData({ ...formData, siblings: e.target.value })
                }
                style={{
                  width: "100%",
                  padding: "8px 10px",
                  border: "1px solid #d1d5db",
                  borderRadius: "5px",
                  outline: "none",
                  fontSize: "12px",
                }}
                required
              />
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <button
              type="submit"
              style={{
                backgroundColor: "#059669",
                color: "white",
                padding: "10px 25px",
                borderRadius: "5px",
                border: "none",
                cursor: "pointer",
                fontWeight: "600",
                fontSize: "13px",
                display: "flex",
                alignItems: "center",
                gap: "5px",
              }}
            >
              <span style={{ fontSize: "14px" }}>✅</span>
              SUBMIT STUDENT
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentForm;
