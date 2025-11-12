import React, { useEffect, useState } from "react";

const editProfile = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    contactNumber: "",
    gender: "",
    avatar: null,
    avatarPreview: "",
  });

  const [message, setMessage] = useState("");

  // ✅ Fetch current user profile
  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("https://api-lilac.vercel.app/api/user/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();

      if (res.ok) {
        setFormData({
          name: data.name,
          email: data.email,
          password: "",
          contactNumber: data.contactNumber || "",
          gender: data.gender || "",
          avatar: null,
          avatarPreview: data.avatar || "",
        });
      } else {
        setMessage(data.error || "Failed to load profile");
      }
    } catch (error) {
      console.error(error);
      setMessage("Error fetching profile");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // ✅ Handle change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Handle file input
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        avatar: file,
        avatarPreview: URL.createObjectURL(file),
      }));
    }
  };

  // ✅ Submit updated data
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const token = localStorage.getItem("token");
      const form = new FormData();
      form.append("name", formData.name);
      form.append("contactNumber", formData.contactNumber);
      form.append("gender", formData.gender);
      if (formData.password) form.append("password", formData.password);
      if (formData.avatar) form.append("avatar", formData.avatar);

      const res = await fetch("https://api-lilac.vercel.app/api/user/edit-profile", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: form,
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("Profile updated successfully!");
        if (data.user.avatar) {
          setFormData((prev) => ({
            ...prev,
            avatarPreview: data.user.avatar,
          }));
        }
      } else {
        setMessage(data.error || "Failed to update profile");
      }
    } catch (err) {
      console.error(err);
      setMessage("Error updating profile");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "550px" }}>
      <h3 className="text-center mb-4">Edit Profile</h3>

      {message && (
        <div className="alert alert-info text-center p-2">{message}</div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Name */}
        <div className="mb-3">
          <label className="form-label">Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        {/* Email (read-only) */}
        <div className="mb-3">
          <label className="form-label">Email (Not Editable)</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            disabled
            className="form-control bg-light"
          />
        </div>

        {/* Contact Number */}
        <div className="mb-3">
          <label className="form-label">Contact Number</label>
          <input
            type="text"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter contact number"
          />
        </div>

        {/* Gender */}
        <div className="mb-3">
          <label className="form-label">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="form-select"
          >
            <option value="">Select Gender</option>
            <option value="male">Male ♂️</option>
            <option value="female">Female ♀️</option>
            <option value="other">Other ⚧️</option>
          </select>
        </div>

        {/* Password */}
        <div className="mb-3">
          <label className="form-label">New Password (optional)</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter new password"
          />
        </div>

        {/* Avatar */}
        <div className="mb-3 text-center">
          <label className="form-label">Profile Picture (optional)</label>
          <input
            type="file"
            name="avatar"
            accept="image/*"
            onChange={handleFileChange}
            className="form-control"
          />
          {formData.avatarPreview && (
            <img
              src={formData.avatarPreview}
              alt="Avatar Preview"
              className="rounded-circle mt-3 shadow"
              width="120"
              height="120"
            />
          )}
        </div>

        <div className="text-center">
          <button type="submit" className="btn btn-success px-4">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default editProfile;
