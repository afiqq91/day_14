import { useState } from "react";
import { useNavigate } from "react-router-dom";

function InstructorForm({ initialData, onSubmit, buttonText }) {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    email: initialData?.email || "",
    specialization: initialData?.specialization || "",
    yearsExperience: initialData?.yearsExperience || "",
    active: initialData?.active || false,
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  }

  function validate() {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!formData.email.includes("@")) {
      newErrors.email = "Email must contain @";
    }

    if (!formData.specialization.trim()) {
      newErrors.specialization = "Specialization is required";
    }

    if (formData.yearsExperience === "") {
      newErrors.yearsExperience = "Years experience is required";
    } else if (formData.yearsExperience < 0) {
      newErrors.yearsExperience =
        "Years experience cannot be negative";
    }

    return newErrors;
  }

  function handleSubmit(e) {
    e.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    onSubmit(formData);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && <p>{errors.name}</p>}
      </div>

      <div>
        <label>Email:</label>
        <input
          type="text"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <p>{errors.email}</p>}
      </div>

      <div>
        <label>Specialization:</label>
        <input
          type="text"
          name="specialization"
          value={formData.specialization}
          onChange={handleChange}
        />
        {errors.specialization && (
          <p>{errors.specialization}</p>
        )}
      </div>

      <div>
        <label>Years Experience:</label>
        <input
          type="number"
          name="yearsExperience"
          value={formData.yearsExperience}
          onChange={handleChange}
        />
        {errors.yearsExperience && (
          <p>{errors.yearsExperience}</p>
        )}
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            name="active"
            checked={formData.active}
            onChange={handleChange}
          />
          Active
        </label>
      </div>

      <button type="submit">
        {buttonText}
      </button>

      <button
        type="button"
        onClick={() => navigate("/instructors")}
      >
        Cancel
      </button>

    </form>


  );
}

export default InstructorForm;