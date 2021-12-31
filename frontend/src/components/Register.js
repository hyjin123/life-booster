import NavBar from "./NavBar";
import { Form, Button } from "react-bootstrap";
import './Register.css'

function Register() {

  const onSubmit = (event) => {
    event.preventDefault();
    // save the form data to each variable
    const formData = new FormData(event.currentTarget);
    const firstName = formData.get('first-name');
    const lastName = formData.get('last-name');
    const email = formData.get('email');
    const password = formData.get('password');
    console.log(email);
  };

  return (
    <div className="register-container">
      <NavBar />
      <div className="form-container">
        <Form onSubmit={onSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>First Name</Form.Label>
            <Form.Control type="text" name="first-name" placeholder="Enter First Name" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Last Name</Form.Label>
            <Form.Control type="text" name="last-name" placeholder="Enter Last Name" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" name="email" placeholder="Enter email" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" name="password" placeholder="Password" />
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
