import Keycloak from "keycloak-js";
import { addUser } from "./api/apiCalls";
// NB! Leave the / or the relative path will use the Router path
const keycloak = new Keycloak("/keycloak.json");

/**
 * Initialize Keycloak and silently checking for an existing login.
 * @description Should be called before render() of app.
 * @returns { Promise<void> } Promise
 */
export const initialize = () => {
  const config = {
    checkLoginIframe: false,
    onLoad: "check-sso",
    silentCheckSsoRedirectUri:
      window.location.origin + "/silent-check-sso.html",
  };
  return keycloak.init(config);
};

keycloak.onAuthSuccess = async () => 
{
  if(keycloak.authenticated && keycloak.tokenParsed)
  {
    if(keycloak.tokenParsed.sub)
    {
      const user = {
        keycloakId: keycloak.tokenParsed.sub,
        firstName: keycloak.tokenParsed.name.split(" ")[0],
        lastName: keycloak.tokenParsed.name.split(" ")[1],
      }
      await addUser(user);
    }
  }
}

/** @type { Keycloak } keycloak */
export default keycloak;
