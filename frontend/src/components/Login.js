import NavBar from "./NavBar";
import { Form, Button } from "react-bootstrap";
import './Register.css'
import axios from "axios";

function Login(props) {

  const handleLogin = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    axios.post('/login', {
      email: formData.get("email"),
      password: formData.get("password")
    })
      .then(res => {
        console.log(res.data)
        // store the accesstoken in local storage
        const token = res.data.accessToken;
        localStorage.setItem("jwtToken", token);
        // redirect to home page after success login
        window.location = "/home";
      })
      .catch(err => console.log(err));
  };

  console.log(props.userId)
  return (
    <div className="register-container">
      <NavBar userId={props.userId} />
      <div className="form-container">
        <Form onSubmit={handleLogin} >
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control name="email" type="email" placeholder="Enter email" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control name="password" type="password" placeholder="Password" />
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
