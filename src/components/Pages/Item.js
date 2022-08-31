import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchItems } from "../../redux/PostsSlice";
import { addCart } from "../../redux/CartSlice";
import { images } from "../../img/js/img";
import Row from "react-bootstrap/esm/Row";
import Button from "react-bootstrap/esm/Button";
import ListGroup from "react-bootstrap/esm/ListGroup";
import Card from "react-bootstrap/esm/Card";
import Loading from "../loading/Loading";
import ErrorPage from "../ErrorPage/ErrorPage";

const Item = () => {
  const { APost, fetchingAPost, errAPost } = useSelector((state) => state.data);
  const { carts } = useSelector((state) => state.carts);
  const btnRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const getRatings = () => {
    const starsTotal = 5;
    const starPercentage = (APost?.rating / starsTotal) * 100;
    return `${Math.round(starPercentage / 10) * 10}%`;
  };

  const handleClick = (e) => {
    if (e.target.innerText === "Added To Cart") return;
    APost?.countInStock &&
      dispatch(addCart({ ...APost, qty: 1 })) &&
      navigate("/cart");
  };

  useEffect(() => {
    dispatch(fetchItems(id));
  }, [dispatch, id]);

  useEffect(() => {
    carts?.filter(
      (item) =>
        item._id === APost?._id && (btnRef.current.innerText = "Added To Cart")
    );
  }, [APost, carts]);

  return (
    <Row as="section" className="justify-content-center my-3">
      {fetchingAPost === "Loading" && <Loading />}
      {fetchingAPost === "Failed" && <ErrorPage title={errAPost} />}
      <Card>
        <Card.Img
          variant="top w-50 mx-auto"
          src={images[Object.keys(images).filter((i) => i === APost?.image)]}
          alt={APost?.name}
        />
        <Card.Body>
          <ListGroup className="w-100">
            <ListGroup.Item className="clearfix">
              <span className="float-start fw-bold">Rating</span>
              <span className="float-end">
                <div className="starsOuter">
                  <div
                    style={{ width: `${getRatings()}` }}
                    className="starsInner"
                  ></div>
                </div>
              </span>
            </ListGroup.Item>
            <ListGroup.Item className="clearfix">
              <span className="float-start fw-bold">Name</span>
              <span className="float-end">{APost?.name}</span>
            </ListGroup.Item>
            <ListGroup.Item>
              <span className="float-start fw-bold">Price</span>
              <span className="float-end">{APost?.price}$</span>
            </ListGroup.Item>
            <ListGroup.Item>
              <span className="float-start fw-bold">Description:</span>
              <span className="float-end">{APost?.description}.</span>
            </ListGroup.Item>
          </ListGroup>
          <Button
            variant="outline-primary mt-2"
            ref={btnRef}
            onClick={handleClick}
            className="w-100"
          >
            {APost?.countInStock ? "Buy" : "Not available"}
          </Button>
        </Card.Body>
      </Card>
    </Row>
  );
};

export default Item;
