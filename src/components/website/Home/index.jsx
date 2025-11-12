import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import { Link } from "react-router-dom";

function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token)
    if (!token) return;

    const fetchUser = async () => {
      try {
        const res = await fetch("https://api-lilac.vercel.app/api/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.ok) {
          const data = await res.json();
          setUser(data);
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setUser(null);
  };

  return (
    <>
      <div className="container mt-5 text-center">
        <h1>
          {user ? `Welcome ${user.name} 👋` : "Welcome to Our Website 👋"}
        </h1>
              <Link className="nav-link" to="/myprofile">myprofile</Link>

      </div>
    </>
  );
}

export default Dashboard;
