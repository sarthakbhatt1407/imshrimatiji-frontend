import React, { useEffect, useState } from "react";
import Navbar from "../component/Header.js/Navbar/Navbar";
import styled from "styled-components";
import Footer from "../component/Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import CompLoader from "../component/Loaders/CompLoader/CompLoader";
import { ListAlt, MyLocation } from "@mui/icons-material";
import { Link, useParams } from "react-router-dom";
import { Avatar, Skeleton } from "@mui/material";

const LoaderBox = styled.div`
  width: 100%;
  height: 93vh;
`;
const OuterBox = styled.div`
  margin-top: -2rem;
  background-color: #f3f3f3;
  padding: 4rem 2rem;
  height: fit-content;
`;

const MainBox = styled.div`
  width: 65%;
  margin: 0 auto;
  display: flex;
  gap: 3rem;
  flex-direction: column;
  @media only screen and (max-width: 1220px) {
    width: 100%;
    gap: 2rem;
  }
`;

const HeadingBox = styled.div`
  display: flex;
  gap: 5rem;
  padding: 0 1rem;
  align-items: center;
  h1 {
    font-weight: 400;
  }
  p {
    display: flex;
    margin-bottom: -1rem;
    flex-direction: column;
    color: #6a6a6a;
  }
  @media only screen and (max-width: 1220px) {
    gap: 2rem;
    justify-content: space-between;
    h1 {
      font-size: 3rem;
    }
    p {
      font-size: 1.24rem;
    }
  }
`;

// Order Upper Box

const OrderBox = styled.div`
  padding: 2rem;
  text-decoration: none;
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

const OrderUpperBox = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  border-bottom: 1px solid #ededed;
  padding: 1rem;
  @media only screen and (max-width: 1220px) {
    grid-template-columns: 1.7fr 2fr;
    align-items: center;
  }
`;

const UpperBoxIdBox = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
  h5 {
    color: black;

    span {
      &:not(:first-child) {
        text-transform: uppercase;
        color: #963c51;
      }
    }
  }
  p {
    color: #6a6a6a;
    display: flex;
    flex-direction: column;
  }
  @media only screen and (max-width: 1220px) {
    gap: 1rem;
    align-items: start;
    flex-direction: column;
  }
`;
const UpperBoxStatusBox = styled.div`
  button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-left: auto;
    border: none;
    padding: 1rem 2rem;
    border-radius: 2rem;
    color: white;
    font-weight: 400;
    letter-spacing: 0.09rem;
    text-transform: uppercase;
    @media only screen and (max-width: 1220px) {
      padding: 1rem 0.7rem;
      font-size: 1.2rem;
    }
    a {
      color: white;
      text-decoration: none;
    }
  }
`;

const OrderMidBox = styled.div`
  padding: 2rem 3rem;
  border-bottom: 1px solid #ededed;
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
  h5 {
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
  h5 {
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
    h5 {
      font-size: 1.4rem;
    }
  }
`;

const OrderLowerBox = styled.div`
  display: grid;
  grid-template-columns: 0.7fr 3fr;
  padding: 1rem 0;
  div {
    padding: 0 1rem;
    &:first-child {
      display: flex;
      justify-content: center;
      align-items: center;
      border-right: 1px solid #ededed;
      button {
        border: none;
        padding: 1rem 3rem;
        border-radius: 2rem;
        text-transform: uppercase;
        letter-spacing: 0.07rem;
        @media only screen and (max-width: 1220px) {
          padding: 1rem 4rem;
        }
      }
      @media only screen and (max-width: 1220px) {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }

    &:last-child {
      display: flex;
      justify-content: space-between;
      align-items: center;
      h5 {
        font-size: 2rem;
      }
      p {
        margin: 0;
        color: #818181;
        font-size: 1.3rem;
        span {
          text-transform: capitalize;
          color: #414040;
        }
      }
    }
  }
  @media only screen and (max-width: 1220px) {
    display: flex;
    flex-direction: column-reverse;
    gap: 1rem;
  }
`;

const NoOrdersFoundBox = styled.div`
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2.5rem;
  letter-spacing: 0.2rem;
  color: #cacaca;
`;
const Span = styled.span`
  font-size: 2.5rem;
  height: 60vh;
  display: flex;
  justify-content: center;
  align-items: center;
  letter-spacing: 0.2rem;
  color: #cacaca;
`;

const Orders = () => {
  const { userId } = useParams();
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const fetcher = async () => {
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}/order/${userId}`
    );
    const data = await res.json();
    if (data.orders.length === 0) {
    }
    if (data.orders) {
      setOrders(data.orders.reverse());
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
    for (const order of data.orders) {
      if (order.paymentStatus === "completed" && order.deleted === false) {
        return;
      } else {
        const paymentVerifier = await fetch(
          `${process.env.REACT_APP_BASE_URL}/payment/payment-verifier/${order.paymentOrderId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await paymentVerifier.json();

        if (data.captured === false) {
          const orderPaymentUpdater = await fetch(
            `${process.env.REACT_APP_BASE_URL}/order/payment-updater`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                productId: order.productId,
                size: order.size,
                orderId: order._id,
                orderPaymentStatus: false,
                paymentMethod: "failed",
              }),
            }
          );
          const ds = await orderPaymentUpdater.json();
          console.log(ds);
        }
        if (data.captured) {
          const orderPaymentUpdater = await fetch(
            `${process.env.REACT_APP_BASE_URL}/order/payment-updater`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                orderId: order._id,
                orderPaymentStatus: data.captured,
                paymentMethod: data.method,
                productId: order.productId,
                size: order.size,
              }),
            }
          );
          const ds = await orderPaymentUpdater.json();
          console.log(ds);
        }
      }
    }
  };
  useEffect(() => {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    fetcher();
    // const intv = setInterval(() => {
    //   fetcher();
    // }, 3000);
    // return () => {
    //   clearInterval(intv);
    // };
  }, []);

  return (
    <>
      <Navbar />
      <OuterBox>
        {isLoading && (
          <LoaderBox>
            <CompLoader />
          </LoaderBox>
        )}

        {orders.length > 0 && (
          <MainBox>
            <HeadingBox>
              <h1>My Orders</h1>
              <p>
                <span>View and track your pending, delivered</span>
                <span>orders and track them here</span>
              </p>
            </HeadingBox>

            {orders.map((ord) => {
              if (
                ord.paymentStatus !== "completed" &&
                ord.paymentStatus !== "Waiting for confirmation."
              ) {
                return;
              }
              if (ord.deleted) {
                return;
              }
              //
              return (
                <OrderBox key={ord.id} data-aos="fade-up">
                  <OrderUpperBox>
                    <Link to={`/account/${userId}/orders/${ord.id}`}>
                      <UpperBoxIdBox>
                        <h5>
                          <span>Order </span>
                          <span>#{ord.id}</span>
                        </h5>

                        <p>
                          <span>
                            <strong> Order Placed : </strong>
                            {ord.day} {ord.month} {ord.year}
                          </span>
                          <span>
                            <strong>Time : </strong>
                            {ord.time}
                          </span>
                        </p>
                      </UpperBoxIdBox>
                    </Link>
                    <UpperBoxStatusBox>
                      {ord.tracking.length > 0 &&
                        ord.paymentStatus === "completed" && (
                          <button
                            style={{
                              backgroundColor: "#ff9800",
                              color: "white",
                            }}
                          >
                            <Link to={ord.tracking} target="_blank">
                              <MyLocation /> Track order
                            </Link>
                          </button>
                        )}
                      {ord.tracking.length === 0 &&
                        ord.paymentStatus === "completed" && (
                          <button style={{ backgroundColor: "#963C51" }}>
                            <ListAlt /> Order Received
                          </button>
                        )}
                    </UpperBoxStatusBox>
                  </OrderUpperBox>

                  <OrderMidBox>
                    <Link
                      to={`/product/${ord.category}/${ord.slug}/${ord.productId}`}
                    >
                      <ProductImgtextInfoBox>
                        <img src={ord.image} alt="" />
                        <ProductTextInfo>
                          <h5>{ord.orderTitle}</h5>
                          <p>
                            <span>Size : {ord.size}</span>
                          </p>
                          <p>Qty : {ord.quantity}</p>
                          <p>
                            Price : {"₹ "}
                            {Number(ord.price).toLocaleString("en-IN")}
                          </p>
                        </ProductTextInfo>
                      </ProductImgtextInfoBox>
                    </Link>
                    <ProductStatusInfoBox>
                      <h5>Status</h5>
                      {ord.tracking.length > 0 &&
                        ord.paymentStatus === "completed" && (
                          <p style={{ color: "#ff9800" }}>In Transit</p>
                        )}
                      {ord.tracking.length === 0 &&
                        ord.paymentStatus === "completed" && (
                          <p style={{ color: "#963C51" }}>Waiting for pickup</p>
                        )}
                    </ProductStatusInfoBox>
                    <ProductStatusInfoBox>
                      <h5>Expected Delivery</h5>
                      <p style={{ color: "#3e3e3e" }}>{ord.expectedDelivery}</p>
                    </ProductStatusInfoBox>
                  </OrderMidBox>
                  <OrderLowerBox>
                    <div>
                      {ord.tracking.length === 0 &&
                        ord.paymentStatus === "completed" && (
                          <Link to={`/account/${userId}/orders/${ord.id}`}>
                            <button
                              style={{
                                backgroundColor: "#963C51",
                                color: "white",
                              }}
                            >
                              View order
                            </button>
                          </Link>
                        )}
                      {ord.tracking.length > 0 &&
                        ord.paymentStatus === "completed" && (
                          <Link to={`/account/${userId}/orders/${ord.id}`}>
                            <button
                              style={{
                                backgroundColor: "#ff9800",
                                color: "white",
                              }}
                            >
                              View order
                            </button>
                          </Link>
                        )}
                    </div>
                    <div>
                      <p>
                        Payment method used : <span>{ord.paymentMethod}</span>
                      </p>
                      <h5>
                        Rs.{" "}
                        {Number(
                          ord.price * Number(ord.quantity)
                        ).toLocaleString("en-IN")}
                      </h5>
                    </div>
                  </OrderLowerBox>
                </OrderBox>
              );
            })}
          </MainBox>
        )}
      </OuterBox>
      {/* <button
        onClick={() => {
          console.log(orders.reverse());
        }}
      >
        ll
      </button> */}
      {orders && <Footer />}
    </>
  );
};

export default Orders;
