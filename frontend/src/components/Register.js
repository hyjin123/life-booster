import NavBar from "./NavBar";
import axios from "../../axios";
import { Form, Button } from "react-bootstrap";
import "./Register.css";

function Register(props) {
  const onSubmit = (event) => {
    event.preventDefault();
    // save the form data to each variable
    const formData = new FormData(event.currentTarget);
    const firstName = formData.get("first-name");
    const lastName = formData.get("last-name");
    const email = formData.get("email");
    const password = formData.get("password");
    // make an axios request to the backend to save the register data to the db
    axios
      .post("/register", {
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password,
      })
      .then((res) => {
        console.log(res.data);
        const token = res.data.accessToken;
        // save the token to local storage
        localStorage.setItem("jwtToken", token);
        // if register is successful, redirect the user to home
        window.location = "/home";
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="register-container">
      <NavBar userId={props.userId} />
      <div className="form-container">
        <Form onSubmit={onSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              name="first-name"
              placeholder="Enter First Name"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              name="last-name"
              placeholder="Enter Last Name"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" name="email" placeholder="Enter email" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default Register;
