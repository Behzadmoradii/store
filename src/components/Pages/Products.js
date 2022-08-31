import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { images } from "../../img/js/img";
import { fetchItems } from "../../redux/PostsSlice";
import Col from "react-bootstrap/esm/Col";
import Badge from "react-bootstrap/esm/Badge";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const Products = ({ item }) => {
  const dispatch = useDispatch();
  const handleItemPost = () => {
    dispatch(fetchItems(item._id));
  };
  return (
    <Col md={6} className="overflow-hidden mt-1 mb-2">
      <Card>
        <Card.Img
          variant="top"
          src={images[Object.keys(images).filter((i) => i === item.image)]}
          alt={item.name}
        />
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center mb-2">
            <Card.Title>{item.name}</Card.Title>
            <Badge bg="danger" className="py-2 px-3 fs-5">
              {item.price}$
            </Badge>
          </div>
          <Card.Text>{item.description.slice(0, 120)}...</Card.Text>
          <Button variant="outline-primary w-100 p-0">
            <Link
              className="d-block w-100 py-2"
              onClick={handleItemPost}
              to={`/products/${item._id}`}
            >
              View
            </Link>
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Products;
