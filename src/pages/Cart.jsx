import React, { useEffect } from "react";
import Navbar from "../component/Header.js/Navbar/Navbar";
import Footer from "../component/Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import "react-alert-confirm/lib/style.css";
import confirm from "react-alert-confirm";
import moment from "moment";
moment().format();
const MainBox = styled.div`
  height: fit-content;
  padding: 4rem 4rem;
  width: 90%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  position: relative;
  @media only screen and (max-width: 1220px) {
    width: 100%;
    padding: 1rem;
  }
`;

const PcCartBox = styled.div`
  display: grid;
  height: fit-content;
  gap: 1rem;
  grid-template-columns: 1.8fr 1fr;
  gap: 3rem;
  @media only screen and (max-width: 1220px) {
    display: flex;
    flex-direction: column;
  }
`;

const ProductsTable = styled.table`
  border: 1px solid #dadada;
  height: fit-content;
  thead {
    background-color: #f1f2f2;
    tr {
      td {
        padding: 1rem;
        color: #5e5e5e;
        text-transform: capitalize;
        font-size: 1.5rem;
        font-weight: bold;
        &:first-child {
          text-align: center;
        }
        @media only screen and (max-width: 1220px) {
          font-size: 1.2rem;
        }
      }
    }
  }
  tbody {
    tr {
      border-bottom: 1px solid #e5e5e5;
      td {
        padding: 1rem;
        font-size: 1.5rem;
        color: black;
        text-transform: capitalize;
        a {
          color: black;
          text-decoration: none;
        }
        button {
          border: none;
          padding: 0.2rem 1rem;
          margin: 0 1rem;
          border-radius: 50%;
        }
        svg {
          color: #b5b5b5;
          margin: 0 0.5rem;
          transform: scale(1.4);
          transform: all 0.5s;
          &:hover {
            color: black;
            cursor: pointer;
          }
        }
      }
      @media only screen and (max-width: 1220px) {
        td {
          font-size: 1.6rem;
          color: #000000;

          span {
          }
        }
      }
    }
  }
`;
const PriceTotalTable = styled.table`
  border: 1px solid #dadada;
  width: 70%;
  height: 10vh;
  @media only screen and (max-width: 1220px) {
    width: 100%;
  }
  thead {
    background-color: #f1f2f2;
    color: black;
    font-size: 1.9rem;
    font-weight: bold;

    tr {
      td {
        padding: 1rem;
        letter-spacing: 0.09rem;
      }
    }
  }
  tbody {
    tr {
      td {
        padding: 1rem 2rem;
        div {
          border-bottom: 1px solid #dadada;
          display: flex;
          gap: 2rem;
          padding: 1rem;
          font-size: 1.5rem;
          font-weight: 600;
          letter-spacing: 0.08rem;
        }
        button {
          background-color: black;
          color: white;
          text-transform: uppercase;
          width: 100%;
          padding: 1.5rem 1rem;
          font-size: 1.5rem;
          border: none;
        }
      }
    }
  }
`;

const ProductImgTextBox = styled.div`
  margin: auto;
  width: 80%;
  display: flex;
  align-items: center;
  gap: 2rem;
  div {
    p {
      color: #8e8e8e;
    }
  }
  img {
    width: 8rem;
    border-radius: 0.4rem;
    display: inline;
    margin-right: 1rem;
  }
  p {
    text-transform: capitalize;
    display: inline;
    font-size: 1.5rem;
    color: #424242;
    font-weight: bold;
  }
  @media only screen and (max-width: 1220px) {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.4rem;
    text-align: center;

    p {
      font-size: 1.25rem;
    }
    img {
      width: 7rem;
      margin-right: 0;
    }
  }
`;

const NoItemsFoundBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  /* background-color: #f7f5f5; */
  height: 30vh;
  p {
    color: #7a7979b7;
    font-size: 2.5rem;
    letter-spacing: 0.2rem;
  }
`;

const Cart = () => {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const userName = useSelector((state) => state.userName);
  const userEmail = useSelector((state) => state.userEmail);
  const userContact = useSelector((state) => state.userContact);
  const userId = useSelector((state) => state.userId);
  const cartItems = useSelector((state) => state.cartItems.reverse());
  const cartTotalAmount = useSelector((state) => state.cartTotalAmount);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    // const unloadCallback = (event) => {
    //   event.preventDefault();
    //   event.returnValue = "";
    //   return "";
    // };
    // window.addEventListener("beforeunload", unloadCallback);
    // return () => window.removeEventListener("beforeunload", unloadCallback);
  }, []);

  function handleClickBasic(id, size) {
    confirm({
      title: "Do you want to delete ?",
      language: "en",
      content: <h2> </h2>,
      onOk: () => dispatch({ type: "itemRemover", id: id, itemSize: size }),
    });
  }
  const itemRemover = (e) => {
    const size = e.target.classList["value"];
    const id = e.target.id;
    handleClickBasic(id, size);
    // dispatch({ type: "itemRemover", id: id });
  };

  return (
    <div>
      <Navbar />
      <MainBox>
        <h1 data-aos="fade-right">Cart</h1>
        {cartItems.length > 0 && (
          <>
            <PcCartBox>
              <ProductsTable data-aos="fade-left">
                <thead>
                  <tr>
                    <td>Product</td>
                    <td>Price</td>
                    <td>Quantity</td>
                    <td>Subtotal</td>
                    <td></td>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => {
                    return (
                      <tr key={item.productId + Math.random() * 20}>
                        <td>
                          <Link
                            to={`/product/${item.category}/${item.slug}/${item.productId}`}
                            state={{ productId: `${item.productId}` }}
                          >
                            <ProductImgTextBox>
                              <img
                                src={`${process.env.REACT_APP_BASE_URL}/${item.image}`}
                                alt=""
                              />
                              <p>
                                <div>
                                  <span>{item.title} </span>
                                  <span>({item.color})</span>
                                </div>
                                <div>
                                  <p>Size : </p>
                                  {item.size}
                                </div>
                              </p>
                            </ProductImgTextBox>
                          </Link>
                        </td>
                        <td>₹ {Number(item.price).toLocaleString("en-IN")}</td>
                        <td>{item.quantity}</td>
                        <td>
                          ₹
                          {(
                            Number(item.price) * Number(item.quantity)
                          ).toLocaleString("en-IN")}
                        </td>
                        <td>
                          <button
                            className={item.size}
                            onClick={itemRemover}
                            id={item.productId}
                          >
                            x
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </ProductsTable>

              <PriceTotalTable data-aos="fade-right">
                <thead>
                  <tr>
                    <td colSpan={2}>Cart Total</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div>
                        <span>Subtotal</span>
                        <span>₹ {cartTotalAmount.toLocaleString("en-IN")}</span>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div>
                        <span>Subtotal</span>
                        <span>₹ {cartTotalAmount.toLocaleString("en-IN")}</span>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <button
                        onClick={() => {
                          if (!isLoggedIn) {
                            navigate("/login");
                            return;
                          }
                          if (isLoggedIn) {
                            navigate("/checkout");
                          }
                        }}
                      >
                        proceed to checkout
                      </button>
                    </td>
                  </tr>
                </tbody>
              </PriceTotalTable>
            </PcCartBox>
          </>
        )}
        {cartItems.length === 0 && (
          <NoItemsFoundBox data-aos="fade-up">
            <p>Cart is empty...</p>
          </NoItemsFoundBox>
        )}
      </MainBox>
      <Footer />
    </div>
  );
};

export default Cart;
