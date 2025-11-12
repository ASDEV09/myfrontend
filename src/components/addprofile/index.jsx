import React, { useEffect, useState } from 'react'

function ProfileFetch() {
      const [profiles, setProfiles] = useState([]);
    useEffect(() => {
    getProfiles();
  }, []);

  const getProfiles = async () => {
    try {
      const response = await fetch("https://api-lilac.vercel.app/profile");
      const data = await response.json();
      if (Array.isArray(data.profiles)) {
        setProfiles(data.profiles);
      }
    } catch (error) {
      console.log("Error fetching profile:", error);
    }
  };
    return (
        <>
            <div className="row">
                {profiles.length > 0 ? (
                    profiles.map((profile, index) => (
                        <div key={index} className="col-md-3">
                            <div className="card">
                                <img src={profile.avatar} className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">{profile.name}</h5>
                                    <p>{profile.age} years old</p>
                                    <p>{profile.country}</p>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No profiles found</p>
                )}
            </div>
        </>
    )
}

export default ProfileFetch
