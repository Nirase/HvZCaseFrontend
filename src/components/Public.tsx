import React from "react";
import keycloak from "../keycloak";

const Public = () => {
  return (
    <div>
      <p>Public</p>
      <button onClick={() => keycloak.login()}>Login</button>
    </div>
  );
};

export default Public;
