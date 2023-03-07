import keycloak from "../keycloak";
import React from "react";
import KeyCloakRoute from "../routes/KeyCloakRoute.jsx";
import { ROLES } from "../roles/roles";
import { useNavigate } from "react-router-dom";

const Protected = () => {
  const navigate = useNavigate();

  const toProfile = () => {
    navigate("/profile");
  };

  return (
    <div>
      <p>Protected</p>

      <button onClick={() => keycloak.logout()}>Logout</button>
      <button onClick={() => toProfile()}>Profile</button>
    </div>
  );
};

export default Protected;
// {
//   <BrowserRouter>
//     <LandingPage />
//     <Route
//       path="/profile"
//       element={
//         <KeyCloakRoute role={ROLES.admin}>
//           <p>Admin</p>
//         </KeyCloakRoute>
//       }
//     />
//   </BrowserRouter>;
// }
