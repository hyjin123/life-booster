import "./NavBar.css";
import { Nav } from "react-bootstrap";

function NavBar() {
  return (
    <div className="position-relative">
      <Nav defaultActiveKey="/home" className="flex-column nav-container">
        <Nav.Link className="nav" href="/home">Life Booster</Nav.Link>
        <Nav.Link className="nav" href="/home">Home</Nav.Link>
        <Nav.Link className="nav" eventKey="link-1">Register</Nav.Link>
        <Nav.Link className="nav" eventKey="link-2">Login</Nav.Link>
        <Nav.Link className="nav" eventKey="disabled" disabled>
          Disabled
        </Nav.Link>
      </Nav>
    </div>
  );
}

export default NavBar;
