import React, { useState } from "react";

const AddProfile = ({ onProfileAdded }) => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    country: "",
    avatar: ""
  });

  const addProfile = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://api-lilac.vercel.app/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      alert(data.message);

      // Refresh list
      onProfileAdded();

      // Reset form
      setFormData({ name: "", age: "", country: "", avatar: "" });
    } catch (error) {
      console.log("❌ Error adding profile:", error);
    }
  };

  return (
    <form onSubmit={addProfile} className="mb-5">
      <h3 className="mb-3">Add Profile</h3>
      <div className="mb-2">
        <input
          type="text"
          placeholder="Name"
          className="form-control"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>
      <div className="mb-2">
        <input
          type="text"
          placeholder="Age"
          className="form-control"
          value={formData.age}
          onChange={(e) => setFormData({ ...formData, age: e.target.value })}
          required
        />
      </div>
      <div className="mb-2">
        <input
          type="text"
          placeholder="Country"
          className="form-control"
          value={formData.country}
          onChange={(e) => setFormData({ ...formData, country: e.target.value })}
          required
        />
      </div>
      <div className="mb-2">
        <input
          type="text"
          placeholder="Avatar URL"
          className="form-control"
          value={formData.avatar}
          onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
          required
        />
      </div>
      <button className="btn btn-primary w-100">Add Profile</button>
    </form>
  );
};

export default AddProfile;
