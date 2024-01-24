import React, { useEffect } from "react";
import Navbar from "../component/Header.js/Navbar/Navbar";
import Footer from "../component/Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { EnvVariables } from "../data";
import { CancelOutlined, Close } from "@mui/icons-material";

import "react-alert-confirm/lib/style.css";
import confirm, { Button, alert } from "react-alert-confirm";

const MainBox = styled.div`
  border-top: 1px solid #dadada;
  height: fit-content;
  padding: 4rem 4rem;
  width: 80%;
  margin: auto;
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
        padding: 0.9rem;
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
        padding: 1.4rem;
        font-size: 1.5rem;
        color: black;
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
          text-align: center;
          padding: 1.4rem 0;
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
    width: 90%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.4rem;
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
  const userName = useSelector((state) => state.userName);
  const userEmail = useSelector((state) => state.userEmail);
  const userContact = useSelector((state) => state.userContact);
  const userId = useSelector((state) => state.userId);
  const cartItems = useSelector((state) => state.cartItems.reverse());
  const cartTotalAmount = useSelector((state) => state.cartTotalAmount);
  const dispatch = useDispatch();
  useEffect(() => {
    // const unloadCallback = (event) => {
    //   event.preventDefault();
    //   event.returnValue = "";
    //   return "";
    // };
    // window.addEventListener("beforeunload", unloadCallback);
    // return () => window.removeEventListener("beforeunload", unloadCallback);
  }, []);

  function handleClickBasic(id) {
    confirm({
      title: "This is title",
      language: "en",
      content: <h2>This is content !</h2>,
      onOk: () => dispatch({ type: "itemRemover", id: { id } }),
    });
  }
  const itemRemover = (e) => {
    const id = e.target.id;
    handleClickBasic(id);
    // dispatch({ type: "itemRemover", id: { id } });
  };

  const loadRazorpayScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  //function will get called when clicked on the pay button.
  const displayRazorpayPaymentSdk = async () => {
    const res = await loadRazorpayScript(
      "https://checkout.razorpay.com/v2/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. please check are you online?");
      return;
    }

    const orderRes = await fetch(
      `${EnvVariables.BASE_URL}/payment/create-order`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: cartTotalAmount.toString(),
          userEmail,
          userContact,
          userName,
        }),
      }
    );
    const data = await orderRes.json();
    console.log(data);
    var options = {
      key: data.key_id,
      amount: data.amount,
      currency: "INR",
      name: data.product_name,
      description: data.description,
      order_id: data.order_id,
      email: userEmail,
      contact: userContact,
      handler: async function (response) {
        console.log(response);
        cartItems.map(async (item) => {
          let obj = {
            userId: userId,
            address: "dehradun uk",
            quantity: item.quantity,
            price: item.price,
            productId: item.productId,
            paymentMethod: "online",
            paymentStatus: "done",
            shippingCharges: 99,
          };
          const orderCreator = await fetch(
            `${EnvVariables.BASE_URL}/order/new-order`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ ...obj }),
            }
          );
          const d = await orderCreator.json();
          console.log(d);
        });
      },
      theme: {
        color: "#32a86d",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
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
                            to={`/product/fkdjk`}
                            state={{ productId: `${item.productId}` }}
                          >
                            <ProductImgTextBox>
                              <img
                                src={`${EnvVariables.BASE_URL}/${item.image}`}
                                alt=""
                              />

                              <p>
                                <span>{item.title} </span>
                                <span>({item.color})</span>
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
                            onClick={itemRemover}
                            id={item.productId + " " + item.color}
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
                      <button onClick={displayRazorpayPaymentSdk}>
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
