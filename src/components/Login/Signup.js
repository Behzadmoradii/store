import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { handleSignUpForm, resetInput } from "./formPattern";
import { userSignUp } from "../../redux/PostsSlice";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import BoxModal from "../Pages/BoxModal";
import AlertBox from "../Pages/AlertBox";
import Loading from "../loading/Loading";

const Signup = () => {
  const { errProfile, FetchProfile, profile } = useSelector(
    (state) => state.data
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [configPass, setConfigPass] = useState("");
  const [errors, setErrors] = useState("");
  const [submitCheck, setSubmitCheck] = useState(false);
  const [validated, setValidated] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleSignUpSubmit = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      setValidated(true);
      return;
    }

    if (!pass || !configPass || !name || !email) {
      return;
    }

    localStorage.setItem("myPass", `${pass}`);
    if (
      handleSignUpForm(name, email, pass, configPass, setErrors, setShowModal)
    ) {
      dispatch(userSignUp({ name: name, email: email, password: pass }));
      setSubmitCheck(true);
    }

    e.preventDefault();
  };

  useEffect(() => {
    if (submitCheck && FetchProfile === "Failed" && pass === configPass) {
      setErrors(errProfile);
      setShowModal(true);
      setSubmitCheck(false);
    }
    if (FetchProfile === "Succeeded" && submitCheck) {
      navigate("/");
      resetInput(setName, setEmail, setPass, setConfigPass);
      setSubmitCheck(false);
    }
  }, [FetchProfile, configPass, errProfile, navigate, pass, submitCheck]);

  return (
    <>
      {profile.id ? (
        <AlertBox
          message={"You are logged in! For back to homepage "}
          address={"/"}
        />
      ) : (
        <Col sm={6} className="mx-auto">
          {FetchProfile === "Loading" && <Loading />}
          <Form
            className="border p-4 my-3"
            noValidate
            validated={validated}
            onSubmit={handleSignUpSubmit}
          >
            <h3 className="text-center">Sign Up</h3>
            <hr />

            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                pattern="[a-z-0-9_]{4,}"
                title="You must be use 4 or more lowercase letters characters"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              ></Form.Control>
              <Form.Control.Feedback type="invalid">
                You must be use 4 or more lowercase letters characters
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="my-2">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              ></Form.Control>
              <Form.Control.Feedback type="invalid">
                Email address is invalid.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="my-2">
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
              ></Form.Control>
              <Form.Control.Feedback type="invalid">
                Must contain at least one number and one uppercase and lowercase
                letter, and at least 6 or more characters
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="my-2">
              <Form.Label>Config Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
                title="Must contain at least one  number and one uppercase
              and lowercase letter, and at least 6 or more characters"
                value={configPass}
                onChange={(e) => setConfigPass(e.target.value)}
                required
              ></Form.Control>
              <Form.Control.Feedback type="invalid">
                Config Password is false.
              </Form.Control.Feedback>
            </Form.Group>

            <Button variant="primary w-100 my-2" type="submit">
              Sign Up
            </Button>
            <Row>
              <Col className="d-flex justify-content-center">
                <Link
                  to="/profile/login"
                  className="text-decoration-none text-info"
                >
                  Login Account
                </Link>
                <span>&nbsp;|&nbsp;</span>
                <Link to="/" className="text-decoration-none text-info">
                  Home
                </Link>
              </Col>
            </Row>
          </Form>

          {errors && <p className="ErrorLine">{errors}</p>}
          <BoxModal
            showModal={showModal}
            setShowModal={setShowModal}
            text={errors}
          />
        </Col>
      )}
    </>
  );
};

export default Signup;
