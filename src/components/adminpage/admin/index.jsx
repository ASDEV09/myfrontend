import React, { useEffect, useState } from "react";

function Admin() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const fetchUser = async () => {
      try {
        const res = await fetch("https://api-lilac.vercel.app/api/user/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.ok) {
          const data = await res.json();
          setUser(data);
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error("Error fetching admin profile:", err);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="container text-center mt-5">
      {user ? (
        <h1>
          Welcome, {user.name} 👑
        </h1>
      ) : (
        <h1>Loading Admin Info...</h1>
      )}
    </div>
  );
}

export default Admin;
