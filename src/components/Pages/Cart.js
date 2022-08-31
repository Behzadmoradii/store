import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CartItem from "./CartItem";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/esm/Badge";
import BoxModal from "./BoxModal";
import AlertBox from "./AlertBox";

const Cart = () => {
  const { profile } = useSelector((state) => state.data);
  const { carts } = useSelector((state) => state.carts);
  const [errors, SetErrors] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleCart = () => {
    if (profile.id && carts.length) {
      navigate("/cart/information");
    } else if (!profile.id) {
      navigate("/profile/login");
    } else {
      SetErrors("Nothing item to buy it.");
      setShowModal(true);
    }
  };

  return (
    <Row as="section">
      <Col sm={8}>
        {carts.length ? (
          carts.map((item) => <CartItem item={item} key={item._id} />)
        ) : (
          <AlertBox
            message={"You can choose a product and than buy it."}
            address={"/"}
          />
        )}
      </Col>
      <Col sm={4} className="h-50 border my-2 py-2">
        <div className="d-flex justify-content-between">
          <span className="priceName">Total Price</span>
          <span className="price"></span>
          <Badge bg="danger" className="py-2 px-3 fs-5">
            {localStorage.getItem("price")}$
          </Badge>
        </div>
        <Button onClick={handleCart} variant="outline-primary w-100 mt-5">
          Next
        </Button>
        <BoxModal
          showModal={showModal}
          setShowModal={setShowModal}
          text={errors}
        />
      </Col>
    </Row>
  );
};

export default Cart;
