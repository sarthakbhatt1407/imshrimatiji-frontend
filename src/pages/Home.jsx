import React, { useEffect } from "react";
import Header from "../component/Header.js/Header";
import Categories from "../component/Categories/Categories";
import WhyChooseUs from "../component/WhyChooseUs/WhyChooseUs";
import Footer from "../component/Footer/Footer";
import FeatureProducts from "../component/FeaturedProducts/FeatureProducts";
import { useDispatch } from "react-redux";

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const localStr = JSON.parse(localStorage.getItem("state"));

    if (localStr) {
      dispatch({ type: "reload", data: { ...localStr } });
    }
  }, []);
  return (
    <>
      <Header />
      <Categories />
      <FeatureProducts />
      <WhyChooseUs />
      <Footer />
    </>
  );
};

export default Home;
