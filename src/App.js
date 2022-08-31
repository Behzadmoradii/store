import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPost, fetchUser } from "./redux/PostsSlice";
import { fetchCart } from "./redux/CartSlice";
import Header from "./components/Header";
import Content from "./components/Content";
import Footer from "./components/Footer";
import Container from "react-bootstrap/esm/Container";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css"

function App() {
  const [filterItem, setFilterItem] = useState("");
  const { posts, profile } = useSelector((state) => state.data);
  const dispatch = useDispatch();
  useEffect(() => {
    const sTime = () =>
      setTimeout(() => {
        dispatch(fetchCart(JSON.parse(localStorage.getItem("cartList"))));
      }, 1000);
    if (posts.length) {
      return;
    } else {
      dispatch(fetchPost());
      sTime();
    }

    profile.id && dispatch(fetchUser());

    return clearTimeout(sTime);
  }, [dispatch, posts, profile.id]);

  return (
    <Container className="App">
      <Header filterItem={filterItem} setFilterItem={setFilterItem} />
      <Content filterItem={filterItem} />
      <Footer />
    </Container>
  );
}

export default App;
