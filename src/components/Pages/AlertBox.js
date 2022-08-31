import { Link } from "react-router-dom";
import Alert from "react-bootstrap/Alert";

const AlertBox = ({ message = false, address = false }) => {
  return (
    <Alert variant="info mt-3 text-center lead">
      {message}&nbsp;
      {address && (
        <Alert.Link as="span">
          <Link className="text-info" to={address}>
            click here
          </Link>
        </Alert.Link>
      )}
    </Alert>
  );
};

export default AlertBox;
