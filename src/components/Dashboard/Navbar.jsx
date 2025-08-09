import { useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useContext } from "react";
import { globalAccess } from "./ContextAPI";

const Navbar = () => {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/", { replace: true });
  };

  let {setNewTicketForm} = useContext(globalAccess);

  return (
    <nav className="navbar">
      <h1>🎫 Ticket Management System</h1>
      <div>
        <button onClick={() => setNewTicketForm(true) }>+ New Ticket</button>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
