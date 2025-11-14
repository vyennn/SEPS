import { useState } from "react";

const StudentForm = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    nameSuffix: "",
    schoolId: "",
    college: "",
    program: "",
    yearLevel: "",
    birthdate: "",
    age: "",
    sex: "",
    maritalStatus: "",
    email: "",
    contactNumber: "",
    purokStreet: "",
    barangay: "",
    city: "",
    province: "",
    fatherFirstName: "",
    fatherMiddleName: "",
    fatherLastName: "",
    fatherSuffix: "",
    fatherOccupation: "",
    motherFirstName: "",
    motherMiddleName: "",
    motherLastName: "",
    motherSuffix: "",
    motherOccupation: "",
  });

  // College and corresponding programs
  const programOptions = {
    CCIS: ["BSIT", "BSIS", "BSCS"],
    CHASS: ["BS-PSYCH", "BSSW", "BSS"],
    CED: ["BEED", "BS Major in Math", "BS Major in English", "BS Major in Science", "BS Major in Filipino"],
    CAA: ["BSA", "BSIS", "BSCS"],
    COFES: ["BSAF", "BSF", "BSES"],
    CMNS: ["BSCHEM", "BSBIO", "BSAM"],
    CEGS: ["BSABE", "BSCE", "BSEM", "BSGE", "BSEE"
    ],
    
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Reset program if college changes
    if (name === "college") {
      setFormData({ ...formData, college: value, program: "" });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "8px 10px",
    border: "1px solid #d1d5db",
    borderRadius: "5px",
    outline: "none",
    fontSize: "12px",
  };

  const labelStyle = {
    display: "block",
    fontSize: "12px",
    fontWeight: "600",
    marginBottom: "5px",
    color: "#374151",
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
          fontFamily: "sans-serif",
          width: "100%",
          maxWidth: "1000px",
          maxHeight: "90vh",
          overflow: "auto",
        }}
      >
        {/* Header */}
        <div
          style={{
            background: "#63A361",
            color: "white",
            padding: "15px 20px",

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
        <h4
            style={{
              backgroundColor: "#63A361",
              color: "white",
              padding: "10px 15px",
              borderRadius: "5px",
              fontWeight: "bold",
              fontSize: "14px",
              marginBottom: "15px",
            }}
          >
            STUDENT INFORMATION
          </h4>

          {/* First Layer */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px", marginBottom: "15px" }}>
            <div>
              <label style={labelStyle}>First Name *</label>
              <input name="firstName"placeholder="Juan" value={formData.firstName} onChange={handleChange} style={inputStyle} required />
            </div>
            <div>
              <label style={labelStyle}>Middle Name</label>
              <input name="middleName" placeholder="Santos" value={formData.middleName} onChange={handleChange} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Last Name *</label>
              <input name="lastName" placeholder="Dela Cruz"value={formData.lastName} onChange={handleChange} style={inputStyle} required />
            </div>
            <div>
              <label style={labelStyle}>Name Suffix</label>
              <input name="nameSuffix" placeholder="Jr/Sr/I/II"value={formData.nameSuffix} onChange={handleChange} style={inputStyle} />
            </div>
          </div>

          {/* Second Layer */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px", marginBottom: "15px" }}>
            <div>
              <label style={labelStyle}>School ID Number *</label>
              <input name="schoolId" placeholder="221-02399" value={formData.schoolId} onChange={handleChange} style={inputStyle} required />
            </div>
            <div>
              <label style={labelStyle}>College *</label>
              <select name="college" value={formData.college} onChange={handleChange} style={inputStyle} required>
                <option value="">Select College</option>
                <option value="CCIS">CCIS</option>
                <option value="CHASS">CHASS</option>
                <option value="CED">CED</option>
                <option value="CAA">CAA</option>
                <option value="COFES">COFES</option>
                <option value="CMNS">CMNS</option>
                <option value="CEGS">CEGS</option>
              </select>
            </div>
            <div>
              <label style={labelStyle}>Program *</label>
              <select
                name="program"
                value={formData.program}
                onChange={handleChange}
                style={inputStyle}
                required
                disabled={!formData.college}
              >
                <option value="">Select Program</option>
                {formData.college &&
                  programOptions[formData.college].map((prog) => (
                    <option key={prog} value={prog}>
                      {prog}
                    </option>
                  ))}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Year Level *</label>
              <input name="yearLevel" placeholder="1" value={formData.yearLevel} onChange={handleChange} style={inputStyle} required />
            </div>
          </div>

          {/* Third Layer */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px", marginBottom: "15px" }}>
            <div>
              <label style={labelStyle}>Birthdate *</label>
              <input type="date" name="birthdate" value={formData.birthdate} onChange={handleChange} style={inputStyle} required />
            </div>
            <div>
              <label style={labelStyle}>Age *</label>
              <input type="number" placeholder="19" name="age" value={formData.age} onChange={handleChange} style={inputStyle} required />
            </div>
            <div>
              <label style={labelStyle}>Sex *</label>
              <select name="sex" value={formData.sex} onChange={handleChange} style={inputStyle} required>
                <option value="">Select Sex</option>
                <option value="Female">Female</option>
                <option value="Male">Male</option>
              </select>
            </div>
            <div>
              <label style={labelStyle}>Marital Status *</label>
              <select name="maritalStatus" value={formData.maritalStatus} onChange={handleChange} style={inputStyle} required>
                <option value="">Select Status</option>
                <option value="Single">Single</option>
                <option value="Married">Married</option>
                <option value="Widowed">Widowed</option>
              </select>
            </div>
          </div>

          {/* Fourth Layer */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "20px" }}>
            <div>
              <label style={labelStyle}>Email Address *</label> 
              <input type="email" placeholder="juandelacruz@gmail.com"name="email" value={formData.email} onChange={handleChange} style={inputStyle} required />
            </div>
            <div>
              <label style={labelStyle}>Contact Number *</label>
              <input name="contactNumber" placeholder="09123456789" value={formData.contactNumber} onChange={handleChange} style={inputStyle} required />
            </div>
          </div>

          {/* HOME ADDRESS */}
          <h4
            style={{
              backgroundColor: "#63A361",
              color: "white",
              padding: "10px 15px",
              borderRadius: "5px",
              fontWeight: "bold",
              fontSize: "14px",
              marginBottom: "15px",
            }}
          >
          HOME ADDRESS
          </h4>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px", marginBottom: "20px" }}>
            <div>
              <label style={labelStyle}>Purok/Street *</label>
              <input name="purokStreet" placeholder="P-19"value={formData.purokStreet} onChange={handleChange} style={inputStyle} required />
            </div>
            <div>
              <label style={labelStyle}>Barangay *</label>
              <input name="barangay" placeholder="San Vicente"value={formData.barangay} onChange={handleChange} style={inputStyle} required />
            </div>
            <div>
              <label style={labelStyle}>City *</label>
              <input name="city" placeholder="Butuan City"value={formData.city} onChange={handleChange} style={inputStyle} required />
            </div>
            <div>
              <label style={labelStyle}>Province *</label>
              <input name="province" placeholder="Agusan Del Norte"value={formData.province} onChange={handleChange} style={inputStyle} required />
            </div>
          </div>

          {/* FATHER’S INFO */}
          <h4
            style={{
              backgroundColor: "#63A361",
              color: "white",
              padding: "10px 15px",
              borderRadius: "5px",
              fontWeight: "bold",
              fontSize: "14px",
              marginBottom: "15px",
            }}
          >
            FATHER'S INFORMATION
          </h4>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px", marginBottom: "10px" }}>
            <div>
              <label style={labelStyle}>First Name *</label>
              <input name="fatherFirstName" value={formData.fatherFirstName} onChange={handleChange} style={inputStyle} required />
            </div>
            <div>
              <label style={labelStyle}>Middle Name</label>
              <input name="fatherMiddleName" value={formData.fatherMiddleName} onChange={handleChange} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Last Name *</label>
              <input name="fatherLastName" value={formData.fatherLastName} onChange={handleChange} style={inputStyle} required />
            </div>
            <div>
              <label style={labelStyle}>Suffix</label>
              <input name="fatherSuffix" value={formData.fatherSuffix} onChange={handleChange} style={inputStyle} />
            </div>
          </div>
          <div style={{ marginBottom: "20px" }}>
            <label style={labelStyle}>Father’s Occupation *</label>
            <input name="fatherOccupation" value={formData.fatherOccupation} onChange={handleChange} style={inputStyle} required />
          </div>

          <h4
            style={{
              backgroundColor: "#63A361",
              color: "white",
              padding: "10px 15px",
              borderRadius: "5px",
              fontWeight: "bold",
              fontSize: "14px",
              marginBottom: "15px",
            }}
          >
            MOTHER'S INFORMATION
          </h4>
        
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px", marginBottom: "10px" }}>
            <div>
              <label style={labelStyle}>First Name *</label>
              <input name="motherFirstName" value={formData.motherFirstName} onChange={handleChange} style={inputStyle} required />
            </div>
            <div>
              <label style={labelStyle}>Middle Name</label>
              <input name="motherMiddleName" value={formData.motherMiddleName} onChange={handleChange} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Last Name *</label>
              <input name="motherLastName" value={formData.motherLastName} onChange={handleChange} style={inputStyle} required />
            </div>
            <div>
              <label style={labelStyle}>Suffix</label>
              <input name="motherSuffix" value={formData.motherSuffix} onChange={handleChange} style={inputStyle} />
            </div>
          </div>
          <div style={{ marginBottom: "20px" }}>
            <label style={labelStyle}>Mother’s Occupation *</label>
            <input name="motherOccupation" value={formData.motherOccupation} onChange={handleChange} style={inputStyle} required />
          </div>

          {/* Submit Button */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button
              type="submit"
              style={{
                backgroundColor: "#63A361",
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
              <span style={{ fontSize: "14px" }}></span>
              SUBMIT STUDENT
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentForm;
