import keycloak from "../keycloak";
import React from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const toHomePage = () => {
    navigate("/");
  };
  return (
    <div>
      {keycloak.tokenParsed && (
        <div>
          <h4>Profile</h4>
          <p>Name: {keycloak.tokenParsed.name}</p>
          <p>Username: {keycloak.tokenParsed.preferred_username}</p>
          <p>Email: {keycloak.tokenParsed.email}</p>
          <button onClick={() => toHomePage()}>Home page</button>
        </div>
      )}
    </div>
  );
};

export default Profile;
