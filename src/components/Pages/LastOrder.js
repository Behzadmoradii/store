import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../redux/PostsSlice";
import { images } from "../../img/js/img";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import AlertBox from "./AlertBox";
import Accordion from "react-bootstrap/Accordion";
import Loading from "../loading/Loading";
import ErrorPage from "../ErrorPage/ErrorPage";

const LastOrder = () => {
  const { order, FetchOrder, errOrder } = useSelector((state) => state.data);
  const dispatch = useDispatch();
  const [allItem, setAllItem] = useState([]);

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  useEffect(() => {
    setAllItem(
      order?.map((item) => ({ ...item, setShowItem: false })).reverse()
    );
  }, [order]);

  return (
    <Row as="section" className="my-4">
      {FetchOrder === "Loading" && <Loading />}
      {errOrder && <ErrorPage title={errOrder} />}
      {allItem?.length ? (
        allItem?.map((boxItem, index) => (
          <Col xl={10} xs={12} className="mx-auto" key={index}>
            <Accordion>
              <Accordion.Item eventKey={index}>
                <Accordion.Header>
                  <div className="d-flex justify-content-between w-100 flex-column flex-sm-row">
                    <span className="py-1">
                      {boxItem.shippingAddress?.city}
                    </span>
                    <span className="py-1">{boxItem.totalPrice}$</span>
                    <span className="py-1">
                      {boxItem.createdAt.slice(11, 16)} /
                      {boxItem.createdAt.slice(0, 10)}
                    </span>
                    <span className="me-sm-2 py-1">
                      Product{boxItem.orderItems.length === 1 ? "" : "s"}:&nbsp;
                      {boxItem.orderItems.length}
                    </span>
                  </div>
                </Accordion.Header>
                <Accordion.Body>
                  {boxItem.orderItems.map((item) => (
                    <Row key={item._id}>
                      <Col xs={8} md={4} className="mx-auto">
                        <figure className="m-0 m-0">
                          <img
                            className="img-thumbnail mb-sm-2"
                            src={
                              images[
                                Object.keys(images).filter(
                                  (i) => i === item.image
                                )
                              ]
                            }
                            alt={item.name}
                          />
                        </figure>
                      </Col>
                      <Col
                        className="d-flex justify-content-between flex-column mb-sm-2"
                        xs={12}
                        md={8}
                      >
                        <h4 className="fs-4">{item.name}</h4>
                        <p className="d-flex justify-content-between">
                          <span>{item.price}$</span>
                          <span>Qty: {item.qty}</span>
                        </p>
                      </Col>
                    </Row>
                  ))}
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Col>
        ))
      ) : (
        <AlertBox message={"You have not bought anything before."} />
      )}
    </Row>
  );
};

export default LastOrder;
