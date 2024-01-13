import React from "react";
import Header from "../component/Header.js/Header";
import Categories from "../component/Categories/Categories";
import WhyChooseUs from "../component/WhyChooseUs/WhyChooseUs";
import Footer from "../component/Footer/Footer";
import FeatureProducts from "../component/FeaturedProducts/FeatureProducts";

const Home = () => {
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
