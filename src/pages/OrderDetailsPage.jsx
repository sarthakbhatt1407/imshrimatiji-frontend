import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import Navbar from "../component/Header.js/Navbar/Navbar";
import Footer from "../component/Footer/Footer";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import MyDocument from "./MyDocument";
import { Description } from "@mui/icons-material";
import CompLoader from "../component/Loaders/CompLoader/CompLoader";

const LoaderBox = styled.div`
  width: 100%;
  height: 93vh;
`;
const OuterBox = styled.div`
  background-color: #f3f3f3;
  height: fit-content;
  width: 100%;
`;

const MainBox = styled.div`
  width: 70%;
  margin: 0 auto;
  padding: 4rem 0;
  display: flex;

  flex-direction: column;
  height: fit-content;
  gap: 2rem;
  h1 {
    font-weight: 400;
    margin: 0.5rem 0;
    display: flex;
    align-items: center;
    gap: 1rem;
    span {
      font-size: 2.4rem;
      color: #963c51;
    }
  }
  @media only screen and (max-width: 1220px) {
    width: 90%;
    h1 {
      font-size: 2.6rem;
      span {
        font-size: 2rem;
      }
    }
  }
`;

const UpperBox = styled.div`
  padding: 2rem 3rem;
  background-color: white;
  border-radius: 0.8rem;
  box-shadow: 0.2rem 0.2rem 0.8rem #dfdfdf;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-content: center;
  @media only screen and (max-width: 1220px) {
    display: flex;
    flex-direction: column;
    padding: 2rem;
    gap: 1rem;
  }
`;

const AddressBox = styled.div`
  display: flex;
  flex-direction: column;
  border-right: 1px solid #ededed;
  p {
    font-size: 1.6rem;
    margin: 0.3rem 0;
    span {
      color: black;
      font-weight: bold;
      font-size: 1.6rem;
    }
  }
  span {
    font-size: 1.6rem;
  }
  @media only screen and (max-width: 1220px) {
    border: none;
    border-bottom: 1px solid #ededed;
    padding-bottom: 1rem;
  }
`;

const OrderDetailBox = styled.div`
  display: flex;
  padding: 0 2rem;
  flex-direction: column;
  text-transform: capitalize;
  border-right: 1px solid #ededed;
  p {
    font-size: 1.6rem;
  }
  @media only screen and (max-width: 1220px) {
    border: none;
    border-bottom: 1px solid #ededed;
    padding: 0;
    padding-bottom: 1rem;
  }
`;

const ActionBox = styled.div`
  padding: 0 2rem;
  div {
    display: flex;
    justify-content: space-between;
    p {
      font-size: 1.6rem;
    }
  }
  span {
    color: black;
    display: flex;
    font-size: 1.6rem;
    align-items: center;
    background-color: #963c51;
    color: white;
    padding: 0.2rem 0.8rem;
    border-radius: 0.8rem;
    gap: 1rem;
    width: fit-content;
    cursor: pointer;
    svg {
      transform: scale(1.2);
    }
    a {
      text-decoration: none;
      color: white;
    }
  }
  @media only screen and (max-width: 1220px) {
    border: none;
    padding: 0;
  }
`;

const OrderBox = styled.div`
  padding: 2rem;
  background-color: white;
  border-radius: 0.8rem;
  box-shadow: 0.2rem 0.2rem 0.8rem #dfdfdf;
  @media only screen and (max-width: 1220px) {
    padding: 1rem 0.5rem;
  }
  a {
    text-decoration: none;
  }
`;

const OrderMidBox = styled.div`
  padding: 2rem 3rem;
  /* border-bottom: 1px solid #ededed; */
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media only screen and (max-width: 1220px) {
    padding: 1rem;
    flex-direction: column;
    justify-content: start;
    align-items: start;
  }
`;

const ProductImgtextInfoBox = styled.div`
  display: flex;
  gap: 3rem;
  color: black;
  h4 {
    font-size: 1.6rem;
    text-transform: capitalize;
  }
  p {
    gap: 1rem;
    font-size: 1.27rem;
    text-transform: uppercase;
    color: #989898;
    &:last-child {
      font-weight: 500;
      color: black;
    }
  }
  img {
    width: 12rem;
  }
  @media only screen and (max-width: 1220px) {
    img {
      width: 11rem;
    }
  }
`;

const ProductTextInfo = styled.div``;

const ProductStatusInfoBox = styled.div`
  h4 {
    color: #a1a1a1;
    font-size: 1.6rem;
  }
  p {
    margin-top: -0.7rem;
    font-size: 1.8rem;
    letter-spacing: 0.13rem;
    font-weight: 500;

    @media only screen and (max-width: 1220px) {
      margin-top: 0;
      font-size: 1.7rem;
    }
  }
  @media only screen and (max-width: 1220px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-top: 0.5rem;
    h4 {
      font-size: 1.4rem;
    }
  }
`;

const OrderDetailsPage = () => {
  const { userId, orderId } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    const fetcher = async () => {
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/order/get-order/${orderId}`
      );
      const data = await res.json();
      console.log(data.order);
      setOrder(data.order);
    };
    fetcher();
    return () => {};
  }, [orderId]);

  return (
    <>
      <Navbar />
      {!order && (
        <LoaderBox>
          <CompLoader />
        </LoaderBox>
      )}
      {order && (
        <OuterBox>
          <MainBox data-aos="fade-up">
            <h1>
              Order <span>#{order.id}</span>
            </h1>
            <UpperBox>
              <AddressBox>
                <h4>Delivery Address</h4>
                <p>{order.fullName}</p>
                <span>{order.addressLine1}</span>
                <span>{order.addressLine2}</span>
                <p>
                  {order.city} - {order.cityPincode}
                </p>
                <p>{order.addressState}</p>
                <p>
                  <span>Contact number</span> {order.contactNum}
                </p>
              </AddressBox>
              <OrderDetailBox>
                <h4>Order Details</h4>
                <p>
                  <span>Order Id : </span> {order.id}
                </p>
                <p>
                  <span>Order Placed : </span> {order.time}
                </p>
                <p>
                  <span>Order Price : </span> Rs.{" "}
                  {Number(order.price * Number(order.quantity)).toLocaleString(
                    "en-IN"
                  )}
                </p>
                <p>
                  <span>Payment Method : </span> {order.paymentMethod}
                </p>
              </OrderDetailBox>
              <ActionBox>
                <h4>More Actions</h4>

                <div>
                  <p>Download Invoice</p>
                  <span>
                    <Description />
                    <PDFDownloadLink
                      document={<MyDocument data={order} />}
                      fileName={`invoice-${order.id}.pdf`}
                    >
                      {({ blob, url, loading, error }) =>
                        loading ? "Loading document..." : "Download"
                      }
                    </PDFDownloadLink>
                  </span>
                </div>
              </ActionBox>
            </UpperBox>

            {/* data-aos="fade-up" */}
            <OrderBox>
              <OrderMidBox>
                <Link
                  to={`/product/${order.category}/${order.slug}/${order.productId}`}
                >
                  <ProductImgtextInfoBox>
                    <img
                      src={`${process.env.REACT_APP_BASE_URL}/${order.image}`}
                      alt=""
                    />
                    <ProductTextInfo>
                      <h4>{order.orderTitle}</h4>
                      <p>
                        <span>Size : {order.size}</span>
                      </p>
                      <p>Qty : {order.quantity}</p>
                      <p>
                        Price : {"₹ "}
                        {Number(order.price).toLocaleString("en-IN")}
                      </p>
                    </ProductTextInfo>
                  </ProductImgtextInfoBox>
                </Link>
                <ProductStatusInfoBox>
                  <h4>Status</h4>
                  {order.tracking.length > 0 &&
                    order.paymentStatus === "completed" && (
                      <p style={{ color: "#ff9800" }}>In Transit</p>
                    )}
                  {order.tracking.length === 0 &&
                    order.paymentStatus === "completed" && (
                      <p style={{ color: "#963C51" }}>Waiting for pickup</p>
                    )}
                </ProductStatusInfoBox>
                <ProductStatusInfoBox>
                  <h4>Expected Delivery</h4>
                  <p style={{ color: "#3e3e3e" }}>{order.expectedDelivery}</p>
                </ProductStatusInfoBox>
              </OrderMidBox>
            </OrderBox>
          </MainBox>
        </OuterBox>
      )}
      <Footer />
    </>
  );
};

export default OrderDetailsPage;
