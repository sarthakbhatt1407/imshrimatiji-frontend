import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AOS from "aos";
import "aos/dist/aos.css";
import ProductPage from "./pages/ProductPage";
import { useDispatch, useSelector } from "react-redux";
import Cart from "./pages/Cart";
import SuccesPage from "./pages/SuccesPage";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import OrderDetailsPage from "./pages/OrderDetailsPage";
import Profile from "./pages/Profile";
import CheckoutPage from "./pages/CheckoutPage";
import Register from "./pages/Register";
import Error from "./pages/Error";

const App = () => {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  const dispatch = useDispatch();
  useEffect(() => {
    const localStr = JSON.parse(localStorage.getItem("state"));

    if (localStr) {
      dispatch({ type: "reload", data: { ...localStr } });
    }
    AOS.init({
      once: true,
    });
    const aosRefresh = setInterval(() => {
      AOS.refresh();
    }, 500);
    return () => {
      clearInterval(aosRefresh);
    };
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />{" "}
        <Route path="/not-found" exact element={<Error />} />
        {isLoggedIn && <Route path="/login" element={<Navigate to="/" />} />}
        {!isLoggedIn && <Route path="/login" element={<Login />} />}
        {isLoggedIn && <Route path="/login" element={<Login />} />}
        {isLoggedIn && <Route path="/account/:userId" element={<Profile />} />}
        <Route
          path="/product/:category/:product/:productId"
          exact
          element={<ProductPage />}
        />
        <Route path="/cart" exact element={<Cart />} />
        <Route path="/account/:userId/orders" exact element={<Orders />} />
        <Route
          path="/account/:userId/orders/:orderId"
          exact
          element={<OrderDetailsPage />}
        />
        <Route path="/success" exact element={<SuccesPage />} />
        <Route path="/register" exact element={<Register />} />
        <Route path="/checkout" exact element={<CheckoutPage />} />
        <Route
          path="/product-category/:category"
          exact
          element={<Products />}
        />
        <Route path="*" exact element={<Error />} />
      </Routes>
    </>
  );
};

export default App;
