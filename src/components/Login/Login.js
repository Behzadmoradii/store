import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { handleLoginForm, resetInput } from "./formPattern";
import { userLogin } from "../../redux/PostsSlice";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import BoxModal from "../Pages/BoxModal";
import AlertBox from "../Pages/AlertBox";
import Loading from "../loading/Loading";

const Login = () => {
  const { errProfile, FetchProfile, profile } = useSelector(
    (state) => state.data
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [errors, setErrors] = useState("");
  const [submitCheck, setSubmitCheck] = useState(false);
  const [validated, setValidated] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleLoginSubmit = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      setValidated(true);
      return;
    }

    localStorage.setItem("myPass", `${pass}`);
    if (handleLoginForm(email, pass) && email && pass) {
      dispatch(userLogin({ email: email, password: pass }));
      setSubmitCheck(true);
    }

    e.preventDefault();
  };

  useEffect(() => {
    if (submitCheck && FetchProfile === "Failed") {
      setErrors(errProfile);
      setSubmitCheck(false);
      setShowModal(true);
    }

    if (submitCheck && FetchProfile === "Succeeded") {
      navigate("/");
      resetInput(setEmail, setPass);
      setSubmitCheck(false);
    }
  }, [FetchProfile, errProfile, navigate, submitCheck]);

  return (
    <Row>
      {FetchProfile === "Loading" && <Loading />}
      {profile.id ? (
        <AlertBox
          message={"You are logged in! For back to homepage "}
          address={"/"}
        />
      ) : (
        <Col sm={6} className="mx-auto">
          <Form
            className="border p-4 my-3"
            noValidate
            validated={validated}
            onSubmit={handleLoginSubmit}
          >
            <h3 className="text-center">Login</h3>
            <hr />
            <Form.Group controlId="loginForm.ControlInput1">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Form.Control.Feedback type="invalid">
                Email address is invalid.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="my-2" controlId="loginForm.ControlInput1">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
                title="Must contain at least one  number and one uppercase
               and lowercase letter, and at least 6 or more characters"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                required
              />
              <Form.Control.Feedback type="invalid">
                Must contain at least one number and one uppercase and lowercase
                letter, and at least 6 or more characters
              </Form.Control.Feedback>
            </Form.Group>
            <Button variant="primary w-100 my-2" type="submit">
              Login
            </Button>
            <Row>
              <Col className="d-flex justify-content-center">
                <Link
                  to="/profile/signup"
                  className="text-decoration-none text-info"
                >
                  Create Account
                </Link>
                <span>&nbsp;|&nbsp;</span>
                <Link to="/" className="text-decoration-none text-info">
                  Home
                </Link>
              </Col>
            </Row>
          </Form>
        </Col>
      )}
      <BoxModal
        showModal={showModal}
        setShowModal={setShowModal}
        text={errors}
      />
    </Row>
  );
};

export default Login;
