import "./NavBar.css";
import { Link } from "react-router-dom";
import { Nav } from "react-bootstrap";
import { FaHome, FaPencilAlt, FaLockOpen } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faSpinner, faTimes } from "@fortawesome/free-solid-svg-icons";

function NavBar(props) {
  const handleLogout = (event) => {
    event.preventDefault();
    // reset the token to an empty string
    localStorage.setItem("jwtToken", "", { maxAge: 1 });
    // redirect to home page after logout
    window.location = "/home";
  };

  return (
    <div className="position-relative nav-container">
      <Link className="nav" to="/home">
        Life Booster
      </Link>
      <Link className="nav" to="/home">
        <FaHome className="nav-icon" />
        Home
      </Link>
      {props.userId === 0 && (
        <Link className="nav" to="/register">
          <FaPencilAlt className="nav-icon" />
          Register
        </Link>
      )}
      {props.userId === 0 && (
        <Link className="nav" to="/login">
          <FaLockOpen className="nav-icon" />
          Login
        </Link>
      )}
      {props.userId !== 0 && (
        <Link className="nav" to="/login" onClick={handleLogout}>
          <FaLockOpen className="nav-icon" />
          Logout
        </Link>
      )}
      <Link
        className="nav"
        to="/tasks/uncompleted"
      >
        <FontAwesomeIcon icon={faTimes} className="nav-icon" />
        Uncompleted Tasks
      </Link>
      <Link
        className="nav"
        to="/tasks/in-progress"
      >
        <FontAwesomeIcon icon={faSpinner} className="nav-icon" />
        In-Progress Tasks
      </Link>
      <Link
        className="nav"
        to="/tasks/completed"
      >
        <FontAwesomeIcon icon={faCheck} className="nav-icon" />
        Completed Tasks
      </Link>
    </div>
  );
}

export default NavBar;
