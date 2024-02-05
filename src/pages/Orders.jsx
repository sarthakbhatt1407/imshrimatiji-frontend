import React, { useEffect, useState } from "react";
import Navbar from "../component/Header.js/Navbar/Navbar";
import styled from "styled-components";
import Footer from "../component/Footer/Footer";
import { useSelector } from "react-redux";
import CompLoader from "../component/Loaders/CompLoader/CompLoader";
import { MyLocation } from "@mui/icons-material";
import { Link } from "react-router-dom";

const LoaderBox = styled.div`
  width: 100%;
  height: 93vh;
`;
const OuterBox = styled.div`
  margin-top: -2rem;
  background-color: #f3f3f3;
  padding: 4rem 2rem;
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
  background-color: white;
  border-radius: 0.8rem;
  @media only screen and (max-width: 1220px) {
    padding: 1rem;
  }
`;

const OrderUpperBox = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  border-bottom: 1px solid #ededed;
  padding: 1rem;
  @media only screen and (max-width: 1220px) {
    grid-template-columns: 1fr 1fr;
    align-items: center;
  }
`;

const UpperBoxIdBox = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
  h5 {
    span {
      &:not(:first-child) {
        text-transform: uppercase;
        color: #77a9e1;
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
    background-color: #ff9800;
    border: none;
    padding: 1rem 2rem;
    border-radius: 2rem;
    color: white;
    font-weight: 400;
    letter-spacing: 0.09rem;
    text-transform: uppercase;
    @media only screen and (max-width: 1220px) {
      padding: 1rem 0.8rem;
      font-size: 1.2rem;
    }
  }
`;

const OrderMidBox = styled.div`
  padding: 1rem 3rem;
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
    color: #ff9800;
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

const OrderLowerBox = styled.div``;

const Orders = () => {
  const userId = useSelector((state) => state.userId);
  const [orders, setOrders] = useState(null);
  const [products, setProducts] = useState(null);
  useEffect(() => {
    const fetcher = async () => {
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/order/order-by-userid`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId,
          }),
        }
      );
      const data = await res.json();
      // console.log(data);
      let arr = [];
      if (data.orders) {
        setOrders(data.orders.reverse());
      }
      if (res.ok) {
        for (const ord of data.orders) {
          const res = await fetch(
            `${process.env.REACT_APP_BASE_URL}/product/${ord.productId}`
          );
          const data = await res.json();
          arr.push(data.product);
        }
      }

      setProducts(arr);
    };
    fetcher();
    const intv = setInterval(() => {
      fetcher();
    }, 1500);
    return () => {
      clearInterval(intv);
    };
  }, [userId]);

  return (
    <>
      {!orders && (
        <LoaderBox>
          <CompLoader />
        </LoaderBox>
      )}
      <Navbar />
      <OuterBox>
        {orders && products && (
          <MainBox>
            <HeadingBox>
              <h1>My Orders</h1>
              <p>
                <span>View and track your pending, delivered</span>
                <span>orders and track them here</span>
              </p>
            </HeadingBox>
            {products &&
              orders.map((ord) => {
                const product = products.find((pro) => {
                  return ord.productId === pro.id;
                });
                if (product) {
                  return (
                    <OrderBox data-aos="fade-up" key={ord.id}>
                      <OrderUpperBox>
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
                        <UpperBoxStatusBox>
                          <button>
                            <MyLocation /> Track order
                          </button>
                        </UpperBoxStatusBox>
                      </OrderUpperBox>
                      <OrderMidBox>
                        <Link
                          to={`/product/${product.category}/${product.title}/${product.id}`}
                        >
                          <ProductImgtextInfoBox>
                            <img
                              src={`${process.env.REACT_APP_BASE_URL}/${ord.image}`}
                              alt=""
                            />
                            <ProductTextInfo>
                              <h5>{product.title}</h5>
                              <p>
                                <span>Size : {ord.size}</span>
                              </p>
                              <p>Qty : {ord.quantity}</p>
                              <p>
                                Price : {"₹ "}
                                {Number(product.price.toLocaleString("en-IN"))}
                              </p>
                            </ProductTextInfo>
                          </ProductImgtextInfoBox>
                        </Link>
                        <ProductStatusInfoBox>
                          <h5>Status</h5>
                          <p>In-Transit</p>
                        </ProductStatusInfoBox>
                        <ProductStatusInfoBox>
                          <h5>Expected Delivery</h5>
                          <p style={{ color: "#3e3e3e" }}>24 Decemeber 2024</p>
                        </ProductStatusInfoBox>
                      </OrderMidBox>
                      <OrderLowerBox></OrderLowerBox>
                    </OrderBox>
                  );
                }
              })}
            {/* <button
              onClick={() => {
                console.log(orders.reverse());
                console.log(products);
              }}
            >
              ll
            </button> */}
          </MainBox>
        )}
      </OuterBox>
      {orders && products && <Footer />}
    </>
  );
};

export default Orders;
