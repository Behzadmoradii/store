import { configureStore } from "@reduxjs/toolkit";
import CartSlice from "./CartSlice";
import PostsSlice from "./PostsSlice";

const Store = configureStore({
  reducer: {
    data: PostsSlice,
    carts: CartSlice,
  },
});

export default Store;
