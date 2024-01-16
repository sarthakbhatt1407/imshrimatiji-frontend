import React from "react";
import { useLocation } from "react-router-dom";

const ProductPage = (props) => {
  const { state } = useLocation();
  console.log(state);
  return <div>ProductPage</div>;
};

export default ProductPage;
