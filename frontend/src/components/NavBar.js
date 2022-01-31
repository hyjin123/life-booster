import "./NavBar.css";
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
    <div className="position-relative">
      <Nav defaultActiveKey="/home" className="flex-column nav-container">
        <Nav.Link className="nav" href="/home">
          Life Booster
        </Nav.Link>
        <Nav.Link className="nav" href="/home">
          <FaHome className="nav-icon" />
          Home
        </Nav.Link>
        {props.userId === 0 && (
          <Nav.Link className="nav" href="/register">
            <FaPencilAlt className="nav-icon" />
            Register
          </Nav.Link>
        )}
        {props.userId === 0 && (
          <Nav.Link className="nav" href="/login">
            <FaLockOpen className="nav-icon" />
            Login
          </Nav.Link>
        )}
        {props.userId !== 0 && (
          <Nav.Link className="nav" href="/login" onClick={handleLogout}>
            <FaLockOpen className="nav-icon" />
            Logout
          </Nav.Link>
        )}
        <Nav.Link className="nav" href="/home">
          <FontAwesomeIcon icon={faTimes} className="nav-icon"/>
          Uncompleted Tasks
        </Nav.Link>
        <Nav.Link className="nav" href="/home">
          <FontAwesomeIcon icon={faSpinner} className="nav-icon"/>
          In-Progress Tasks
        </Nav.Link>
        <Nav.Link className="nav" href="/home">
          <FontAwesomeIcon icon={faCheck} className="nav-icon"/>
          Completed Tasks
        </Nav.Link>
      </Nav>
    </div>
  );
}

export default NavBar;
