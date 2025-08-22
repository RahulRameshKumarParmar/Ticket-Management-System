import { useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useContext, useEffect, useState } from "react";
import { globalAccess } from "./ContextAPI";
import { FaTasks } from "react-icons/fa";
import { CiMenuBurger } from "react-icons/ci";

const Navbar = () => {

  let { isLoggedIn, setIsLoggedIn, setNewTicketForm } = useContext(globalAccess);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/', { replace: true });
    }
  }, [isLoggedIn, navigate])

  const handleLogout = (event) => {
    event.preventDefault();

    if (isLoggedIn === true) {
      setIsLoggedIn(false)
      localStorage.removeItem("isLoggedIn");
    }
  };

  const [openMobileMenu, setOpenMobileMenu] = useState(false);

  return (
    <div>
      <nav className={`navbar ${openMobileMenu ? "hamberger-model" : null}`}>
        <div className="title-box">
          <span className="tasket-icon"><FaTasks size={23} /></span>
          <h1 className="title-heading">Tasket</h1>
        </div>
        <div className="navbar-btn">
          <button className="new-ticket-btn" onClick={() => setNewTicketForm(true)}>+ New Ticket</button>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
        <div className="mobile-navbar-menu">
          <span onClick={() => setOpenMobileMenu(!openMobileMenu)} className="menu-logo"><CiMenuBurger size={25} /></span>
        </div>
      </nav>

      <div
        className={`blur-overlay ${openMobileMenu ? "show" : ""}`} onClick={() => setOpenMobileMenu(!openMobileMenu)}
      ></div>

      <div className={`mobile-navbar-btn ${(openMobileMenu) ? "show-mobile-navbar-btn" : null}`}>
        <button className="mobile-new-ticket-btn" onClick={() => {
          setNewTicketForm(true);
          setOpenMobileMenu(false);
        }}>+ New Ticket</button>
        <button className="mobile-logout-btn" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Navbar;
