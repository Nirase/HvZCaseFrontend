import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import keycloak from "../keycloak";
import { ROLES } from "../roles/roles";

const HeaderButtons = () => {
  const navigate = useNavigate();
  const toAdmin = () => {
    navigate("/admin");
  };

  return (
    <>
      {keycloak.hasRealmRole(ROLES.Admin) && (
        <Button color="inherit" onClick={() => toAdmin()}>
          Admin
        </Button>
      )}
      {keycloak.hasRealmRole(ROLES.User) && (
        <Button color="inherit">{keycloak.tokenParsed?.name}</Button>
      )}
      <Button color="inherit" onClick={() => keycloak.logout()}>
        Logout
      </Button>
    </>
  );
};

export default HeaderButtons;
