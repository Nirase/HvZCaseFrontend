import Protected from "../components/Protected";
import Public from "../components/Public";
import keycloak from "../keycloak";

function Home() {
  //const isLogin = useAuth();

  return (
    //isLogin ? <Protected /> : <Public />;
    <div>
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
}

export default Home;
