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
    const stockAvailable = action.stockAvailable;
    const cartItems = state.cartItems;
    let alreadyFound = cartItems.find((item) => {
      return (
        item.productId === product.productId &&
        item.color === product.color &&
        product.size === item.size
      );
    });
    const alreadyFoundIndex = cartItems.findIndex((item) => {
      return (
        item.productId === product.productId &&
        item.color === product.color &&
        product.size === item.size
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
          if (stockAvailable < obj.quantity) {
            return {
              ...state,
              cartMsg: "Stock not available",
            };
          }
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
    const { id } = action;
    const cartItems = state.cartItems;
    if (cartItems.length === 1) {
      const obj = {
        ...state,
        cartItems: [],
        cartMsg: "Removed",
        cartTotalAmount: 0,
      };
      localStorage.setItem("state", JSON.stringify(obj));
      return {
        ...state,
        cartItems: [],
        cartMsg: "Removed",
        cartTotalAmount: 0,
      };
    }
    let amount = state.cartTotalAmount;
    const updatedCartItems = [];
    for (const item of cartItems) {
      if (item.productId !== id && item.size) {
        amount -= Number(item.quantity) * Number(item.price);
        updatedCartItems.push(item);
      }
    }
    if (updatedCartItems.length > 0) {
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
    return {
      ...state,
    };
  }

  if (action.type === "clearCart") {
    const localStr = JSON.parse(localStorage.getItem("state"));
    const obj = {
      ...localStr,
      cartItems: [],
      cartMsg: "",
      cartTotalAmount: 0,
    };
    localStorage.setItem("state", JSON.stringify(obj));
    return {
      ...state,
      ...state,
      cartItems: [],
      cartMsg: "",
      cartTotalAmount: 0,
    };
  }

  return state;
};
const store = createStore(storeReducer);

export default store;
