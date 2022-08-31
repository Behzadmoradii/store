import { Link } from "react-router-dom";
import style from "./errorMessage.module.css";

const ErrorPage = ({ title }) => {
  return (
    <div className={style.ErrorBox}>
      <div className={style.notfound}>
        <div className={style.notfoundMessage}>
          <h1>Oops!</h1>
          <h2>{title}</h2>
        </div>
        <Link to="/" onClick={() => navigator.reload()}>
          Go To HomePage
        </Link>
      </div>
    </div>
  );
};

//We can do this approach
ErrorPage.defaultProps = {
  title: "404 - The Page can't be found",
};

export default ErrorPage;
