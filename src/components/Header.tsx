import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import keycloak from "../keycloak";

const Header = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ backgroundColor: "#360568" }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Humans vs Zombies
          </Typography>
          <section>
            {!keycloak.authenticated && (
              <Button color="inherit" onClick={() => keycloak.login()}>
                Login
              </Button>
            )}
            {keycloak.authenticated && (
              <Button color="inherit" onClick={() => keycloak.logout()}>
                Logout
              </Button>
            )}
          </section>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
export default Header;
