import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
    const navigate = useNavigate();
  
    const handleLogout = () => {

      localStorage.removeItem("token");
      localStorage.removeItem("username");
      navigate("/");
    };
  
    return (
      <button className="button" onClick={handleLogout}>
        Logout
      </button>
    );
  };
  
  export default LogoutButton;