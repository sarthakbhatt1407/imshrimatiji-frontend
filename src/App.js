import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AOS from "aos";
import "aos/dist/aos.css";
import ProductPage from "./pages/ProductPage";
import { useDispatch, useSelector } from "react-redux";
import Cart from "./pages/Cart";

const App = () => {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  const dispatch = useDispatch();
  useEffect(() => {
    const localStr = JSON.parse(localStorage.getItem("state"));

    if (localStr) {
      dispatch({ type: "reload", data: { ...localStr } });
    }
    AOS.init({});
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
        <Route path="/" element={<Home />} />
        {isLoggedIn && <Route path="/login" element={<Navigate to="/" />} />}
        {!isLoggedIn && <Route path="/login" element={<Login />} />}
        {isLoggedIn && <Route path="/login" element={<Login />} />}
        <Route path="/product/:product" exact element={<ProductPage />} />
        <Route path="/cart" exact element={<Cart />} />
      </Routes>
    </>
  );
};

export default App;
