import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { setOrders } from "../../redux/PostsSlice";
import { clearCart } from "../../redux/CartSlice";
import { images } from "../../img/js/img";
import Loading from "../loading/Loading";
import { Icons } from "../../img/js/iconSvg";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Button from "react-bootstrap/esm/Button";
import Badge from "react-bootstrap/esm/Badge";
import ListGroup from "react-bootstrap/esm/ListGroup";
import BoxModal from "./BoxModal";
import Card from "react-bootstrap/Card";

const Payment = () => {
  const { errOrder, FetchOrder, profile } = useSelector((state) => state.data);
  const { carts, information } = useSelector((state) => state.carts);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errors, setErrors] = useState();
  const [checked, setChecked] = useState(false);
  const [showModal, setShowModal] = useState(false)

  const handlePayment = () => {
    dispatch(
      setOrders({
        orderItems: carts?.map((item) => ({
          product: item._id,
          name: item.name,
          image: item.image,
          price: item.price,
          countInStock: item.countInStock,
          qty: item.qty,
        })),
        shippingAddress: {
          address: information.address,
          city: information.city,
          postalCode: information.postalCode,
          phone: information.phone,
        },
        paymentMethod: "onLine",
        itemsPrice: localStorage.getItem("price") || 0,
        shippingPrice: "0.00",
        totalPrice: localStorage.getItem("price") || 0,
      })
    );

    setChecked(true);
  };

  useEffect(() => {
    !checked && !carts?.length && navigate("/cart");
    const sTime = (event) => {
      setTimeout(() => {   
        if (event) {
          navigate("/");
          dispatch(clearCart());
        }
      }, 3000);
    };

    if (checked && FetchOrder === "Failed") {
      setErrors(errOrder);
      setShowModal(true)
    }
    if (checked && FetchOrder === "Succeeded") {
      setErrors("Completed request");
      setShowModal(true)
      sTime(true);
    }

    return clearTimeout(sTime);
  }, [FetchOrder, errOrder, checked, dispatch, navigate, carts?.length]);

  return (
    <section>
      <Row>
        {FetchOrder === "Loading" && <Loading />}
        <h4 className="bg-secondary text-dark-50 rounded bg-opacity-25 py-1 mt-3">
          Information
        </h4>
        <Col sm={6} className="mx-auto my-3">
          <ListGroup>
            <ListGroup.Item className="clearfix">
              <span className="float-start fw-bold">{Icons.profile}</span>
              <span className="float-end">{profile.name}</span>
            </ListGroup.Item>
            <ListGroup.Item>
              <span className="float-start fw-bold">{Icons.city}</span>
              <span className="float-end">{information.city}</span>
            </ListGroup.Item>
            <ListGroup.Item className="clearfix">
              <span className="float-start fw-bold">{Icons.phone}</span>
              <span className="float-end">{information.phone}</span>
            </ListGroup.Item>
            <ListGroup.Item>
              <span className="float-start fw-bold">{Icons.postalCode}</span>
              <span className="float-end">{information.postalCode}</span>
            </ListGroup.Item>
            <ListGroup.Item>
              <span className="float-start fw-bold">{Icons.address}</span>
              <span className="float-end">{information.address}</span>
            </ListGroup.Item>
            <Button variant="outline-primary w-50 mx-auto mt-2">
              <Link className="d-block w-100" to="/cart/information">
                Edit
              </Link>
            </Button>
          </ListGroup>
        </Col>
      </Row>
      <Row>
        <h4 className="bg-secondary text-dark-50 rounded bg-opacity-25 py-1">
          Products
        </h4>
        {carts.map((item) => (
          <Col sm={3} key={item._id}>
            <Card className="mt-2">
              <Card.Img
                variant="top img-thumbnail "
                src={
                  images[Object.keys(images).filter((i) => i === item.image)]
                }
                alt={item.name}
              />
              <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <div className="d-flex justify-content-between mt-3">
                  <Badge bg="secondary fs-6">{item.qty}</Badge>
                  <Badge bg="secondary fs-6">{item.price}$</Badge>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
        <ListGroup className="mt-3">
          <ListGroup.Item className="clearfix border">
            <span className="float-start fw-bold pt-1">Total Price:</span>
            <span className="float-end">
              <Badge bg="danger" className="fs-6 w-auto">
                {localStorage.getItem("price") || 0}$
              </Badge>
            </span>
          </ListGroup.Item>
        </ListGroup>
        <Row>
          <Col sm={6} className="mx-auto text-center">
            <Button variant="primary w-50 my-3" onClick={() => handlePayment()}>
              Payment
            </Button>
          </Col>
        </Row>
        {errors && <p className="ErrorLine">{errors}</p>}
      </Row>
      <BoxModal
          showModal={showModal}
          setShowModal={setShowModal}
          text={errors}
        />
    </section>
  );
};

export default Payment;
