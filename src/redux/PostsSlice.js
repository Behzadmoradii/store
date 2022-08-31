import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const loadProfile = () => {
  return JSON.parse(localStorage.getItem("profile"));
};

const initialState = {
  posts: [],
  FetchingPosts: "",
  errMessage: null,
  APost: [],
  fetchingAPost: "",
  errAPost: null,
  profile: loadProfile() || [],
  FetchProfile: "",
  errProfile: "",
  order: [],
  FetchOrder: "",
  errOrder: null,
};

const api = axios.create({
  baseURL: "http://5.161.141.215:5000/",
});

export const fetchPost = createAsyncThunk("posts/fetch", async () => {
  const response = await api.get(`api/products`);
  return response.data;
});

export const fetchItems = createAsyncThunk("post/fetch", async (id) => {
  const response = await api.get(`api/products/${id}`);
  return response.data;
});

export const userSignUp = createAsyncThunk("signup/post", async (user) => {
  const users = await api.post(`api/users`, user);
  return users.data;
});

export const userLogin = createAsyncThunk("login/post", async (user) => {
  const users = await api.post(
    `http://5.161.141.215:5000/api/users/login`,
    user
  );
  return users.data;
});

export const editUser = createAsyncThunk("profile/put", async (user) => {
  const users = await api.put(`api/users/profile`, user, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return users.data;
});

export const fetchUser = createAsyncThunk("profile/fetch", async () => {
  const users = await api.get(`api/users/profile`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return users.data;
});

export const setOrders = createAsyncThunk("Orders/post", async (order) => {
  const response = await api.post(`api/orders`, order, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
});

export const getOrders = createAsyncThunk("Orders/fetch", async () => {
  const response = await api.get(`api/orders/myorders`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
});

const PostSlice = createSlice({
  name: "posts",
  initialState,
  extraReducers: {
    // Fetch Posts
    [fetchPost.fulfilled]: (state, { payload }) => {
      state.FetchingPosts = "Succeeded";
      storageUpdate(payload);
      state.posts = payload;
    },
    [fetchPost.pending]: (state) => {
      state.FetchingPosts = "Loading";
      state.errMessage = null;
    },
    [fetchPost.rejected]: (state, { error }) => {
      state.FetchingPosts = "Failed";
      state.errMessage = error.message;
    },

    [fetchItems.fulfilled]: (state, { payload }) => {
      state.fetchingAPost = "Succeeded";
      state.APost = payload;
    },
    [fetchItems.pending]: (state) => {
      state.fetchingAPost = "Loading";
      state.APost = [];
    },
    [fetchItems.rejected]: (state, { error }) => {
      state.fetchingAPost = "Failed";
      state.errAPost = error.message;
    },

    // Create, Fetch, Edit User
    [fetchUser.fulfilled]: (state, { payload }) => {
      state.FetchProfile = "Succeeded";
      saveProfile(payload);
      state.profile = loadProfile();
    },
    [fetchUser.pending]: (state) => {
      state.FetchProfile = "Loading";
      state.errProfile = null;
    },
    [fetchUser.rejected]: (state, { error }) => {
      state.FetchProfile = "Failed";
      state.profile = [];
      state.errProfile = error.message;
    },

    [userSignUp.fulfilled]: (state, { payload }) => {
      state.FetchProfile = "Succeeded";
      saveProfile(payload);
      localStorage.setItem("token", payload.token);
      state.profile = loadProfile();
    },
    [userSignUp.pending]: (state) => {
      state.FetchProfile = "Loading";
      state.errProfile = null;
    },
    [userSignUp.rejected]: (state, { error }) => {
      state.FetchProfile = "Failed";
      state.errProfile =
        error.message === "Request failed with status code 400"
          ? "User Already Exist!"
          : error.message;
    },

    [userLogin.fulfilled]: (state, { payload }) => {
      state.FetchProfile = "Succeeded";
      saveProfile(payload);
      localStorage.setItem("token", payload.token);
      state.profile = loadProfile();
    },
    [userLogin.pending]: (state) => {
      state.FetchProfile = "Loading";
      state.errProfile = null;
    },
    [userLogin.rejected]: (state, { error }) => {
      state.FetchProfile = "Failed";
      state.errProfile =
        error.message === "Request failed with status code 401"
          ? "Invalid Email or Password"
          : error.message;
    },

    [editUser.fulfilled]: (state, { payload }) => {
      state.FetchProfile = "Succeeded";
      saveProfile(payload);
      state.profile = loadProfile();
    },
    [editUser.pending]: (state) => {
      state.FetchProfile = "Loading";
      state.errProfile = null;
    },
    [editUser.rejected]: (state, { error }) => {
      state.FetchProfile = "Failed";
      state.errProfile = error.message;
    },

    // Set and Get OrderList
    [setOrders.fulfilled]: (state, { payload }) => {
      state.FetchOrder = "Succeeded";
      state.order = payload;
    },
    [setOrders.pending]: (state) => {
      state.FetchOrder = "Loading";
      state.order = [];
      state.errOrder = null;
    },
    [setOrders.rejected]: (state, { error }) => {
      state.FetchOrder = "Failed";
      state.errOrder = error.message;
    },
    [getOrders.fulfilled]: (state, { payload }) => {
      state.FetchOrder = "Succeeded";
      state.order = payload;
    },
    [getOrders.pending]: (state) => {
      state.FetchOrder = "Loading";
      state.order = [];
      state.errOrder = null;
    },
    [getOrders.rejected]: (state, { error }) => {
      state.FetchOrder = "Failed";
      state.errOrder = error.message;
    },
  },
});

const saveProfile = (data) => {
  return localStorage.setItem("profile", JSON.stringify(data));
};

const storageUpdate = (data) => {
  const lastItem = JSON.parse(localStorage.getItem("cartList")) || [];
  let updateItem = [];
  if (data.length && lastItem.length) {
    const newItem = data.filter((item) =>
      lastItem.some((i) => i._id === item._id)
    );
    for (let i = 0; i < newItem.length; i++) {
      for (let j = 0; j < lastItem.length; j++) {
        if (lastItem[j]._id === newItem[i]._id)
          updateItem.push({
            ...newItem[i],
            qty:
              lastItem[j].qty > newItem[i].countInStock
                ? newItem[i].countInStock
                : lastItem[j].qty,
          });
      }
    }
  }
  return localStorage.setItem(
    "cartList",
    JSON.stringify(updateItem.filter((item) => item.countInStock > 0) || [])
  );
};

export default PostSlice.reducer;
