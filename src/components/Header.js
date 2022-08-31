import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { Icons } from "../img/js/iconSvg";
import logo from "../img/logo.png";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Badge from "react-bootstrap/Badge";
import ListGroup from "react-bootstrap/ListGroup";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";

const Header = ({ filterItem, setFilterItem }) => {
  const location = useLocation();
  const { carts } = useSelector((state) => state.carts);
  const { profile } = useSelector((state) => state.data);
  const [count, setCount] = useState(0);

  const handleLogOutBtn = () => {
    if (!profile.id) return;

    if (window.confirm("Are you sure log out!")) {
      localStorage.removeItem("profile");
      navigator.reload();
    }
  };

  useEffect(() => {
    const redux = carts?.reduce(
      (accumulator, object) =>
        object.qty > object.countInStock && accumulator + object.countInStock,
      0
    );
    const sum = carts?.reduce(
      (accumulator, object) =>
        object.qty <= object.countInStock && accumulator + object.qty,
      0
    );
    setCount(redux + sum);
  }, [carts]);

  return (
    <Row as="header" className="shadow">
      <Col
        sm={8}
        xs={6}
        className="d-flex justify-content-between align-items-center py-2"
      >
        <Link to="/">
          <img src={logo} className="logo" alt="logo" />
        </Link>
        {location.pathname === "/" && (
          <Form className="me-5 d-none d-sm-block w-25">
            <Form.Control
              type="text"
              value={filterItem}
              onChange={(e) => setFilterItem(e.target.value)}
              placeholder="Search for Item..."
            />
          </Form>
        )}
      </Col>
      <Col sm={4} xs={6} className="py-2">
        <nav>
          <ListGroup
            as="ul"
            className="justify-content-end align-items-center py-2"
            horizontal
          >
            <ListGroup.Item as="li" className="p-2 border-0 pe-3">
              <Link to="/cart">{Icons.cart}</Link>
              {carts?.length ? (
                <Badge bg="danger" className="setPos">
                  {count}
                </Badge>
              ) : (
                ""
              )}
            </ListGroup.Item>
            <ListGroup.Item as="li" className="p-2 border-0">
              <Dropdown as="ul" className="widthSize pe-auto p-0">
                <Dropdown.Toggle
                  as="span"
                  variant="light"
                  className={profile?.id ? "profileIcon" : ""}
                >
                  {Icons.profile}
                </Dropdown.Toggle>
                <Dropdown.Menu className="p-0">
                  <Dropdown.Item as="li" className="p-0">
                    <Link
                      to="/profile"
                      className="iconSize d-block link-dark w-100 p-2 text-decoration-none"
                    >
                      {Icons.profile} Profile
                    </Link>
                  </Dropdown.Item>
                  {!profile.id ? (
                    <Dropdown.Item as="li" className="p-0">
                      <Link
                        to="/profile/login"
                        className="iconSize d-block link-dark w-100 p-2 text-decoration-none"
                      >
                        {Icons.logIn} Login
                      </Link>
                    </Dropdown.Item>
                  ) : (
                    <Dropdown.Item as="li" className="p-0">
                      <Link
                        to="#"
                        className="iconSize d-block link-dark w-100 p-2 text-decoration-none"
                        onClick={handleLogOutBtn}
                      >
                        {Icons.logOut} Log out
                      </Link>
                    </Dropdown.Item>
                  )}
                </Dropdown.Menu>
              </Dropdown>
            </ListGroup.Item>
          </ListGroup>
        </nav>
      </Col>
    </Row>
  );
};

export default Header;
