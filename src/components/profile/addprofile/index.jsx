import React, { useState } from "react";

const AddProfile = ({ onProfileAdded }) => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    country: "",
    avatar: null,
  });

  const addProfile = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("age", formData.age);
    data.append("country", formData.country);
    data.append("avatar", formData.avatar);

    try {
      const response = await fetch("https://api-lilac.vercel.app/profile", {
        method: "POST",
        body: data,
      });

      const result = await response.json();
      alert(result.message);

      onProfileAdded();
      setFormData({ name: "", age: "", country: "", avatar: null });
      e.target.reset();
    } catch (error) {
      console.error("❌ Error adding profile:", error);
    }
  };

  return (
    <form onSubmit={addProfile} className="mb-5" encType="multipart/form-data">
      <h3 className="mb-3">Add Profile</h3>

      <input
        type="text"
        placeholder="Name"
        className="form-control mb-2"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
      />

      <input
        type="number"
        placeholder="Age"
        className="form-control mb-2"
        value={formData.age}
        onChange={(e) => setFormData({ ...formData, age: e.target.value })}
        required
      />

      <input
        type="text"
        placeholder="Country"
        className="form-control mb-2"
        value={formData.country}
        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
        required
      />

      <input
        type="file"
        accept="image/*"
        className="form-control mb-2"
        onChange={(e) => setFormData({ ...formData, avatar: e.target.files[0] })}
        required
      />

      <button className="btn btn-primary w-100">Add Profile</button>
    </form>
  );
};

export default AddProfile;
