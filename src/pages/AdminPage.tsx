import { useNavigate } from "react-router-dom";

const AdminPage = () => {
  const navigate = useNavigate();
  const toHomePage = () => {
    navigate("/");
  };
  return (
    //isLogin ? <Protected /> : <Public />;
    <div>
      <p>Admin Page</p>
      <button onClick={() => toHomePage()}>Home page</button>
    </div>
  );
};

export default AdminPage;
