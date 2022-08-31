import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  carts: [],
  information: [],
};

const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    fetchCart: (state, action) => {
      state.carts = action.payload;
    },
    addCart: (state, action) => {
      const filterItem = state.carts?.filter(
        (i) => i._id !== action.payload._id
      );
      saveData([...filterItem, action.payload]);
      state.carts = loadData([...filterItem, action.payload]);
    },

    UpdateCart: (state, action) => {
      const updateData = state.carts?.map((item) =>
        item._id === action.payload._id ? action.payload : item
      );
      saveData(updateData);
      state.carts = loadData(updateData);
    },

    deleteCart: (state, action) => {
      const deleted = state.carts?.filter((item) => item._id !== action.payload);
      saveData(deleted);
      state.carts = loadData(deleted);
    },
    infoData: (state, action) => {
      state.information = action.payload;
      localStorage.setItem("lastLocation", JSON.stringify(action.payload));
    },
    clearCart: (state) => {
      localStorage.removeItem("cartList");
      state.carts = [];
      state.information = [];
    },
  },
});

const myFunc = (total, num) => {
  return total + num;
};

const saveData = (data) => {
  return localStorage.setItem("cartList", JSON.stringify(data));
};

const loadData = (data) => {
  const price =
    (JSON.parse(localStorage.getItem("cartList")) || data)
      .map((i) => i.price * i.qty)
      .reduce(myFunc, 0) || 0;
  localStorage.setItem("price", price.toFixed(2));
  return JSON.parse(localStorage.getItem("cartList")) || data;
};

export const {
  fetchCart,
  addCart,
  UpdateCart,
  deleteCart,
  clearCart,
  infoData,
} = CartSlice.actions;
export default CartSlice.reducer;
