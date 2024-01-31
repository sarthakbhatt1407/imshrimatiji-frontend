import React from "react";
import Navbar from "../component/Header.js/Navbar/Navbar";
import styled from "styled-components";

const MainBox = styled.div``;

const HeadingBox = styled.div``;

// Order Upper Box
const OrderUpperBox = styled.div``;

const OrderLowerBox = styled.div``;

const Orders = () => {
  return (
    <>
      <Navbar />
      <MainBox>
        <OrderUpperBox></OrderUpperBox>
        <OrderLowerBox></OrderLowerBox>
      </MainBox>
    </>
  );
};

export default Orders;
