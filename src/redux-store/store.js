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
      ...obj,
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
    console.log(action.data);

    return {
      ...action.data,
    };
  }
  return state;
};
const store = createStore(storeReducer);

export default store;
