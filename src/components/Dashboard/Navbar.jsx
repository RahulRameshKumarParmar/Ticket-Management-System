import { useNavigate } from "react-router-dom";
import "./Navbar.css";


const Navbar = () => {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/", { replace: true });
  };

  return (
    <nav className="navbar">
      <h1>🎫 Ticket Management System</h1>
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
};

export default Navbar;
