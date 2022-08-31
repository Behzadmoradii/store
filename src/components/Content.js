import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Products from "./Pages/Products";
import Signup from "./Login/Signup";
import Login from "./Login/Login";
import Profile from "./Pages/Profile";
import Item from "./Pages/Item";
import Cart from "./Pages/Cart";
import Information from "./Pages/information";
import LastOrder from "./Pages/LastOrder";
import Payment from "./Pages/Payment";
import ErrorPage from "./ErrorPage/ErrorPage";
import Loading from "./loading/Loading";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";

const Content = ({ filterItem }) => {
  const { posts, FetchingPosts, errMessage, profile } = useSelector(
    (state) => state.data
  );

  return (
    <Container as="main">
      {FetchingPosts === "Loading" && <Loading />}
      {FetchingPosts === "Failed" && <ErrorPage title={errMessage} />}
      <Routes>
        <Route
          path="/"
          element={
            <Row className="mt-3">
              {posts
                ?.filter((item) =>
                  item.name.toLowerCase().includes(filterItem.toLowerCase())
                )
                .map((item) => (
                  <Products key={item._id} item={item} />
                ))}
            </Row>
          }
        />

        <Route
          path="cart/information"
          element={profile.id ? <Information /> : <ErrorPage />}
        />
        <Route
          path="cart/orders"
          element={profile.id ? <LastOrder /> : <ErrorPage />}
        />
        <Route
          path="cart/information/payment"
          element={profile.id ? <Payment /> : <ErrorPage />}
        />
        <Route path="cart" element={<Cart />} />
        <Route path="profile" element={<Profile />} />
        <Route path="products/:id" element={<Item />} />
        <Route path="profile/login" element={<Login />} />
        <Route path="profile/signup" element={<Signup />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Container>
  );
};

export default Content;
