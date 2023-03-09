import keycloak from "../../keycloak";
import React from "react";
import { useNavigate } from "react-router-dom";

const Protected = () => {
  const navigate = useNavigate();

  const toAdmin = () => {
    navigate("/admin");
  };
  const toProfile = () => {
    navigate("/profile");
  };

  return (
    <div>
      <h3>Protected</h3>
      <button onClick={() => keycloak.logout()}>Logout</button>
      <button onClick={() => toAdmin()}>Admin</button>
      <button onClick={() => toProfile()}>Profile</button>
    </div>
  );
};

export default Protected;
