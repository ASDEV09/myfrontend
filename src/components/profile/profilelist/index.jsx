import React from "react";

const ProfileList = ({ profiles }) => {
  return (
    <div className="row">
      {profiles.length > 0 ? (
        profiles.map((profile, index) => (
          <div key={index} className="col-md-3 mb-4">
            <div className="card h-100 shadow-sm">
              <img
                src={profile.avatar}
                className="card-img-top"
                alt={profile.name}
                style={{ height: "200px", objectFit: "cover" }}
              />
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
  );
};

export default ProfileList;
