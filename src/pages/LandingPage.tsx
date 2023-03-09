import Protected from "../components/Protected";
import Public from "../components/Public";
import keycloak from "../keycloak";

const Home = () => {
  //implement this in navbar

  return (
    <div>
      <h1>Landing Page</h1>
      <section className="actions">
        {!keycloak.authenticated && <Public />}
        {keycloak.authenticated && <Protected />}
      </section>

      {keycloak.token && (
        <div>
          <h4>Token</h4>
          <pre>{keycloak.token}</pre>
        </div>
      )}
    </div>
  );
};

export default Home;
