import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { handleEditUser, resetInput } from "../Login/formPattern";
import { editUser } from "../../redux/PostsSlice";
import { getOrders } from "../../redux/PostsSlice";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import BoxModal from "./BoxModal";
import Form from "react-bootstrap/Form";
import AlertBox from "./AlertBox";
import Loading from "../loading/Loading";

const Profile = () => {
  const dispatch = useDispatch();
  const { profile, errProfile, FetchProfile } = useSelector(
    (state) => state.data
  );
  const [showEdit, setShowEdit] = useState(false);
  const [name, setName] = useState("");
  const [lastPass, setLastPass] = useState("");
  const [pass, setPass] = useState("");
  const [configPass, setConfigPass] = useState("");
  const [errors, setErrors] = useState("");
  const [submitCheck, setSubmitCheck] = useState(false);
  const LastPassword = localStorage.getItem("myPass") || true;
  const [validated, setValidated] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleShowEdit = () => {
    setShowEdit((prev) => !prev);
  };

  const handleEditProfile = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      setValidated(true);
      return;
    }

    if (
      handleEditUser(
        name,
        pass,
        configPass,
        setErrors,
        setShowModal,
        setConfigPass
      ) &&
      lastPass === LastPassword
    ) {
      dispatch(editUser({ name: name, password: pass, email: profile.email }));
      setSubmitCheck(true);
    }

    if (lastPass !== LastPassword) {
      setErrors("Current password isn't correct.");
      setLastPass("");
      setShowModal(true);
    }

    e.preventDefault();
  };

  useEffect(() => {
    if (submitCheck && FetchProfile === "Failed" && pass === configPass) {
      setErrors(errProfile);
      setShowModal(true);
      setSubmitCheck(false);
    }
    if (submitCheck && FetchProfile === "Succeeded" && pass === configPass) {
      localStorage.setItem("myPass", `${pass}`);
      resetInput(setName, setPass, setConfigPass, setLastPass);
      setShowEdit((prev) => !prev);
      setSubmitCheck(false);
      setValidated(false);
    }
  }, [FetchProfile, configPass, errProfile, pass, submitCheck]);

  return (
    <>
      {FetchProfile === "Loading" && <Loading />}
      {profile.id ? (
        <Row>
          <Col xs={12} sm={6} className="mx-auto my-3 p-2 text-center">
            <ListGroup>
              <ListGroup.Item className="clearfix">
                <span className="float-start fw-bold">UserName </span>
                <span className="float-end">{profile.name}</span>
              </ListGroup.Item>
              <ListGroup.Item className="clearfix">
                <span className="float-start fw-bold">Email </span>
                <span className="float-end">{profile.email}</span>
              </ListGroup.Item>
              <ListGroup.Item className="clearfix">
                <span className="float-start fw-bold">Id </span>
                <span className="float-end">{profile.id}</span>
              </ListGroup.Item>
            </ListGroup>
            <ButtonGroup className="mt-3">
              <Button variant="outline-primary" onClick={handleShowEdit}>
                Edit Profile
              </Button>
              <Button variant="primary px-4">
                <Link to="/cart/orders" onClick={() => dispatch(getOrders())}>
                  History
                </Link>
              </Button>
            </ButtonGroup>
          </Col>
        </Row>
      ) : (
        <AlertBox message={"You first be login."} address={"/profile/login"} />
      )}
      {showEdit && (
        <Row>
          <Col xs={12} sm={6} className="mx-auto my-3 p-4 border">
            <Form
              as="form"
              noValidate
              validated={validated}
              onSubmit={handleEditProfile}
            >
              <Form.Group controlId="validationCustom01">
                <Form.Label></Form.Label>
                <Form.Label>New name</Form.Label>
                <Form.Control
                  type="text"
                  pattern="[a-z-0-9_]{4,}"
                  title="You must be use 4 or more lowercase letters characters"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  You must be use 4 or more lowercase letters characters
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mt-2" controlId="validationCustom02">
                <Form.Label></Form.Label>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="lastPassword"
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
                  title="Must contain at least one  number and one uppercase
               and lowercase letter, and at least 6 or more characters"
                  value={lastPass}
                  onChange={(e) => setLastPass(e.target.value)}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Password isn't correct.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mt-2" controlId="validationCustom03">
                <Form.Label></Form.Label>
                <Form.Label>New password</Form.Label>
                <Form.Control
                  type="password"
                  name="newPassword"
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
                  title="Must contain at least one  number and one uppercase
               and lowercase letter, and at least 6 or more characters"
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Must contain at least one number and one uppercase and
                  lowercase letter, and at least 6 or more characters
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mt-2" controlId="validationCustom04">
                <Form.Label></Form.Label>
                <Form.Label>Config password</Form.Label>
                <Form.Control
                  type="password"
                  name="newPassword"
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
                  title="Must contain at least one  number and one uppercase
               and lowercase letter, and at least 6 or more characters"
                  value={configPass}
                  onChange={(e) => setConfigPass(e.target.value)}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Config Password is false.
                </Form.Control.Feedback>
              </Form.Group>

              <Button variant="outline-primary w-100 mt-3" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      )}
      <BoxModal
        showModal={showModal}
        setShowModal={setShowModal}
        text={errors}
      />
    </>
  );
};

export default Profile;
