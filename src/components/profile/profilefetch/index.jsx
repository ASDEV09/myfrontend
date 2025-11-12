import React, { useEffect, useState } from "react";
import AddProfile from "../addprofile";
import ProfileList from "../profilelist";

const ApiFetch = () => {
  const [profiles, setProfiles] = useState([]);

  const getProfiles = async () => {
    try {
      const response = await fetch("https://api-lilac.vercel.app/profile");
      const data = await response.json();
      if (Array.isArray(data.profiles)) {
        setProfiles(data.profiles);
      }
    } catch (error) {
      console.log("❌ Error fetching profile:", error);
    }
  };

  useEffect(() => {
    getProfiles();
  }, []);

  return (
    <div className="container mt-4">
      {/* 🟢 Form yahan dikhna chahiye */}
      <AddProfile onProfileAdded={getProfiles} />

      {/* 🟢 Profiles list niche dikhni chahiye */}
      <ProfileList profiles={profiles} />
    </div>
  );
};

export default ApiFetch;
