import React from "react";
import Navbar from "../component/Header.js/Navbar/Navbar";
import Footer from "../component/Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { EnvVariables } from "../data";
import { CancelOutlined, Close } from "@mui/icons-material";

const MainBox = styled.div`
  border-top: 1px solid #dadada;
  height: fit-content;
  padding: 4rem 4rem;
  width: 80%;
  margin: auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;
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
  thead {
    background-color: #f1f2f2;
    tr {
      td {
        padding: 1rem 0;
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
        font-size: 1.5rem;
        color: black;
        a {
          color: black;
          text-decoration: none;
        }
      }
      @media only screen and (max-width: 1220px) {
        td {
          font-size: 1.4rem;
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
    font-size: 1.8rem;
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
  display: flex;
  align-items: center;
  padding: 0.5rem;
  gap: 2rem;
  width: 70%;
  margin: auto;
  /* background-color: red; */
  img {
    width: 8rem;
    border-radius: 0.4rem;
  }
  p {
    text-transform: capitalize;
    font-size: 1.5rem;
    color: #424242;
    font-weight: bold;
  }
  @media only screen and (max-width: 1220px) {
    gap: 1rem;
    display: flex;
    flex-direction: column;
    width: 100%;
    p {
    }
    img {
      width: 6rem;
    }
  }
`;

const NoItemsFoundBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f7f5f5;
  height: 30vh;
  p {
    color: #7a7979b7;
    font-size: 2.5rem;
    letter-spacing: 0.2rem;
  }
`;

const Cart = () => {
  const cartItems = useSelector((state) => state.cartItems.reverse());
  const dispatch = useDispatch();
  const itemRemover = (e) => {
    const id = e.target.parentNode.id;
    dispatch({ type: "itemRemover", id: { id } });
  };

  return (
    <div>
      <Navbar />
      <MainBox>
        <h1>Cart</h1>
        {cartItems.length > 0 && (
          <>
            <PcCartBox>
              <ProductsTable>
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
                                <span>
                                  {item.title} - {}
                                </span>
                                <span>{item.color}</span>
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
                          <div id={item.productId}>
                            <CancelOutlined onClick={itemRemover} />
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </ProductsTable>

              <PriceTotalTable>
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
                        <span>₹ 1300</span>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div>
                        <span>Subtotal</span>
                        <span>₹ 1300</span>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <button>proceed to checkout</button>
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
