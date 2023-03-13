import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const AdminPage = () => {
  const location = useLocation();
  const [pathName, setPathName] = useState("");

  useEffect(() => {
    if (location) {
      let tmp = location.pathname.slice(
        location.pathname.lastIndexOf("/") + 1,
        location.pathname.length
      );
      setPathName(tmp);
    }
  }, [location]);

  return (
    //isLogin ? <Protected /> : <Public />;
    <div>
      <h4>Admin Page {pathName}</h4>
    </div>
  );
};

export default AdminPage;
