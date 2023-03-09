import keycloak from "../keycloak";
import React from "react";

const Profile = () => {
  return (
    <div>
      {keycloak.tokenParsed && (
        <div>
          <h4>Profile</h4>
          <p>Name: {keycloak.tokenParsed.name}</p>
          <p>Username: {keycloak.tokenParsed.preferred_username}</p>
          <p>Email: {keycloak.tokenParsed.email}</p>
        </div>
      )}
    </div>
  );
};

export default Profile;
