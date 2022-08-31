import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";

const Footer = () => {
  const timeNew = () => {
    const d = new Date();
    return d.getFullYear();
  };
  return (
    <Row as="footer" className="border text-center fs-5 fw-semibold py-3">
      <Col>
        <p className="m-0">CopyRight &copy; {timeNew()}</p>
      </Col>
    </Row>
  );
};

export default Footer;
