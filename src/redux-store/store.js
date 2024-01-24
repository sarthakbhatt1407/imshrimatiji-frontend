import { createStore } from "redux";
const defaultState = {
  isLoggedIn: false,
  userToken: "",
  userEmail: "",
  userId: "",
  userName: "",
  cartItems: [],
  cartMsg: "",
  cartTotalAmount: 0,
  userContact: null,
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
      userContact: user.contact,
    };

    localStorage.setItem("state", JSON.stringify(obj));
    return {
      ...state,
      isLoggedIn: true,
      userToken: data.token,
      userEmail: user.email,
      userId: user.id,
      userName: user.name,
      userContact: user.contactNum,
    };
  }

  if (action.type === "logout") {
    localStorage.clear();
    return { ...defaultState };
  }

  if (action.type === "addToCart") {
    let amount = 0;
    const product = action.product;
    let cartAmount = state.cartTotalAmount;
    const cartItems = state.cartItems;
    let alreadyFound = cartItems.find((item) => {
      return (
        item.productId === product.productId && item.color === product.color
      );
    });
    const alreadyFoundIndex = cartItems.findIndex((item) => {
      return (
        item.productId === product.productId && item.color === product.color
      );
    });
    if (alreadyFound) {
      if (alreadyFound.quantity > 1) {
        return {
          ...state,
          cartMsg: "Max quantity reached",
        };
      } else {
        if (product.quantity + alreadyFound.quantity > 2) {
          console.log("Max quantity reached");
          return {
            ...state,
            cartMsg: "Max quantity reached",
          };
        } else {
          let obj = alreadyFound;
          obj.quantity = alreadyFound.quantity + product.quantity;
          let updatedCartItems = cartItems;
          cartItems[alreadyFoundIndex] = obj;
          for (const item of updatedCartItems) {
            amount += Number(item.quantity) * Number(item.price);
          }
          const localObj = {
            ...state,
            cartItems: updatedCartItems,
            cartMsg: "Added to cart",
            cartTotalAmount: amount,
          };

          localStorage.setItem("state", JSON.stringify(localObj));
          return {
            ...state,
            cartItems: updatedCartItems,
            cartMsg: "Added to cart",
            cartTotalAmount: amount,
          };
        }
      }
    }

    let updatedCartItems = state.cartItems;
    updatedCartItems.push(product);
    for (const item of updatedCartItems) {
      amount += Number(item.quantity) * Number(item.price);
    }
    const obj = {
      ...state,
      cartItems: updatedCartItems,
      cartMsg: "Added to cart",
      cartTotalAmount: amount,
    };
    localStorage.setItem("state", JSON.stringify(obj));
    return {
      ...state,
      cartItems: updatedCartItems,
      cartMsg: "Added to cart",
      cartTotalAmount: amount,
    };
  }

  if (action.type === "reload") {
    return {
      ...action.data,
    };
  }

  if (action.type === "itemRemover") {
    const idAndColor = action.id.id;
    const idAndColorArr = idAndColor.split(" ");
    const cartItems = state.cartItems;
    let amount = state.cartTotalAmount;
    const updatedCartItems = cartItems.filter((item) => {
      if (item.productId === idAndColorArr[0]) {
        if (item.color === idAndColorArr[1]) {
          amount -= Number(item.quantity) * Number(item.price);
        }
        return item.color !== idAndColorArr[1];
      }
    });

    const obj = {
      ...state,
      cartItems: updatedCartItems,
      cartMsg: "Removed",
      cartTotalAmount: amount,
    };
    localStorage.setItem("state", JSON.stringify(obj));
    return {
      ...state,
      cartItems: updatedCartItems,
      cartMsg: "Removed",
      cartTotalAmount: amount,
    };
  }

  return state;
};
const store = createStore(storeReducer);

export default store;
