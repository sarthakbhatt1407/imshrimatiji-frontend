import { createStore } from "redux";
const defaultState = {
  isLoggedIn: false,
  userToken: "",
  userEmail: "",
  userId: "",
  userName: "",
  cartItems: [],
};
const storeReducer = (state = defaultState, action) => {
  if (action.type === "log in") {
    const data = action.data;
    const user = data.user;
    console.log("done");
    const obj = {
      ...state,
      isLoggedIn: true,
      userToken: data.token,
      userEmail: user.email,
      userId: user.id,
      userName: user.name,
    };

    localStorage.setItem("state", JSON.stringify(obj));
    return {
      ...state,
      isLoggedIn: true,
      userToken: data.token,
      userEmail: user.email,
      userId: user.id,
      userName: user.name,
    };
  }

  if (action.type === "logout") {
    localStorage.clear();
    return { ...defaultState };
  }

  if (action.type === "addToCart") {
    const product = action.product;
    let updatedCartItems = state.cartItems;
    updatedCartItems.push(product);
    const obj = {
      ...state,
      cartItems: updatedCartItems,
    };
    localStorage.setItem("state", JSON.stringify(obj));
    return {
      ...obj,
    };
  }

  if (action.type === "reload") {
    return {
      ...action.data,
    };
  }

  if (action.type === "itemRemover") {
    const id = action.id;
    console.log(id);
    const updatedCartItems = state.cartItems.filter((item) => {
      return item.productId !== id;
    });
    console.log(updatedCartItems);
  }

  return state;
};
const store = createStore(storeReducer);

export default store;
