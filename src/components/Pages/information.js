import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { infoData } from "../../redux/CartSlice";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Form from "react-bootstrap/Form";
import ErrorPage from "../ErrorPage/ErrorPage";

const Information = () => {
  const { profile } = useSelector((state) => state.data);
  const { carts } = useSelector((state) => state.carts);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const info = JSON.parse(localStorage.getItem("lastLocation")) || "";
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [postal, setPostal] = useState("");
  const [address, setAddress] = useState("");
  const [validated, setValidated] = useState(false);
  const resetInput = () => {
    setCity("");
    setPhone("");
    setPostal("");
    setAddress("");
  };

  const handleShopping = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      setValidated(true);
      return;
    }

    e.preventDefault();
    if (!city || !phone || !postal || !address) {
      return;
    }

    dispatch(
      infoData({
        address: address,
        city: city,
        postalCode: postal,
        phone: phone,
      })
    );

    navigate("payment");
  };

  const lastLocation = () => {
    setCity(info.city);
    setPhone(info.phone);
    setPostal(info.postalCode);
    setAddress(info.address);
  };

  useEffect(() => {
    !carts?.length && navigate("/cart");
  }, [carts?.length, navigate]);

  return (
    <Row>
      {!profile.id && <ErrorPage />}
      <Col sm={8} className="mx-auto">
        <Form
          className="border p-4 my-3"
          noValidate
          validated={validated}
          onSubmit={handleShopping}
        >
          <Form.Group controlId="informationForm.ControlInput1">
            <Form.Label>City </Form.Label>
            <Form.Control
              type="text"
              name="city"
              placeholder="Tehran"
              pattern="[A-Z]{1}[a-z]{1,}"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
            <Form.Control.Feedback type="invalid">
              Format invalid.(e.g Tehran){" "}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group
            className="mt-2"
            controlId="informationForm.ControlInput1"
          >
            <Form.Label>Phone </Form.Label>
            <Form.Control
              type="tel"
              name="phone"
              placeholder="912983532"
              pattern="[0-9]{10}"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
            <Form.Control.Feedback type="invalid">
              You must use 9 number character
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group
            className="mt-2"
            controlId="informationForm.ControlInput1"
          >
            <Form.Label>Cart postal</Form.Label>
            <Form.Control
              type="text"
              name="cart-postal"
              placeholder="3232145363"
              title="You must use 10 number character"
              pattern="[0-9]{10}"
              value={postal}
              onChange={(e) => setPostal(e.target.value)}
              required
            />
            <Form.Control.Feedback type="invalid">
              You must use 10 number character
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group
            className="mt-2"
            controlId="informationForm.ControlInput1"
          >
            <Form.Label>Address</Form.Label>
            <Form.Control
              as="textarea"
              name="address"
              maxLength="120"
              placeholder="Your address..."
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
            <Form.Control.Feedback type="invalid">
              Write an address!
            </Form.Control.Feedback>
          </Form.Group>

          <Button className="w-100 my-2" variant="primary" type="submit">
            Next
          </Button>
          <Row>
            <Col>
              <ButtonGroup className="w-100">
                <Button
                  variant="outline-primary"
                  type="button"
                  onClick={() => resetInput()}
                >
                  Reset
                </Button>
                {info && (
                  <Button
                    type="button"
                    variant="primary"
                    onClick={() => lastLocation()}
                  >
                    Set
                  </Button>
                )}
              </ButtonGroup>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  );
};

export default Information;
