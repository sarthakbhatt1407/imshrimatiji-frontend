import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AOS from "aos";
import "aos/dist/aos.css";
import ProductPage from "./pages/ProductPage";
import { useDispatch } from "react-redux";

const App = () => {
  useEffect(() => {
    AOS.init({});
    const aosRefresh = setInterval(() => {
      AOS.refresh();
    }, 500);
    return () => {
      clearInterval(aosRefresh);
    };
  }, []);
  const dispatch = useDispatch();
  dispatch({ type: "login", data: { data: "s" } });
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/:product" element={<ProductPage />} />
      </Routes>
    </>
  );
};

export default App;
