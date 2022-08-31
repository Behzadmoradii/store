import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteCart, UpdateCart } from "../../redux/CartSlice";
import { fetchItems } from "../../redux/PostsSlice";
import { images } from "../../img/js/img";
import { Icons } from "../../img/js/iconSvg";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/esm/Badge";
import Card from "react-bootstrap/Card";

const CartItem = ({ item }) => {
  const [count, setCount] = useState(
    item.qty >= item.countInStock ? item.countInStock : item.qty
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addQty = (num) =>
    num >= item.countInStock ? item.countInStock : num + 1;
  const minesQty = (num) => (num <= 1 ? 1 : num - 1);

  const handleShowItem = () => {
    dispatch(fetchItems(item._id));
    navigate(`/products/${item._id}`);
  };

  return (
    <Card className="my-2">
      <Row>
        <Col xs={3}>
          <Card.Img
            onClick={handleShowItem}
            variant="left w-100 p-0 pointer"
            src={images[Object.keys(images).filter((i) => i === item.image)]}
            alt={item.name}
          />
        </Col>
        <Col xs={9}>
          <Card.Body>
            <Card.Title className="text-start">{item.name}</Card.Title>
            <div className="mt-4 d-flex justify-content-between align-items-center">
              <Button
                variant="transparent border-0 p-1 fs-4"
                onClick={() => {
                  setCount((prev) => minesQty(prev));
                  dispatch(UpdateCart({ ...item, qty: minesQty(count) }));
                }}
              >
                -
              </Button>
              <span className="fs-4">{count}</span>
              <Button
                variant="transparent border-0 p-0 fs-4"
                onClick={() => {
                  setCount((prev) => addQty(prev));
                  dispatch(UpdateCart({ ...item, qty: addQty(count) }));
                }}
              >
                +
              </Button>
              <Button
                variant="transparent border-0 p-0"
                onClick={() => dispatch(deleteCart(item._id))}
              >
                {Icons.trash}
              </Button>
              <Badge bg="danger" className="py-2 px-3 fs-6">
                {item.price}$
              </Badge>
            </div>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
};

export default CartItem;
