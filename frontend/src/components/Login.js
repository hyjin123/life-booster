import NavBar from "./NavBar";
import { Form, Button } from "react-bootstrap";
import './Register.css'
import axios from "axios";

function Login(props) {

  const handleLogin = (event) => {
    event.preventDefault();
    axios.post('/login', {

    })
      .then(res => {
        console.log(res.data)
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="register-container">
      <NavBar userId={props.userId} />
      <div className="form-container">
        <Form onSubmit={handleLogin} >
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Login
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default Login;
