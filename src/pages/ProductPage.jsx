import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Navbar from "../component/Header.js/Navbar/Navbar";
import styled from "styled-components";
import ImagesSLider from "../component/UI/ImagesSlider";
import {
  Add,
  CheckCircle,
  CheckCircleOutline,
  CurrencyRupee,
  LocalShipping,
  LocationOn,
  Remove,
} from "@mui/icons-material";
import card from "../assets/images/cards/card.jpg";
import FullPageLoader from "../component/Loaders/CategoryLoader/FullPageLoader";
import Footer from "../component/Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import FeatureProductBox from "../component/UI/FeatureProductBox";
import BtnLoader from "../component/Loaders/CategoryLoader/BtnLoader";
import CompLoader from "../component/Loaders/CompLoader/CompLoader";

const MainBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem 10rem;
  position: relative;
  overflow-x: hidden;
  @media only screen and (max-width: 949px) {
    padding: 1rem 2rem;
  }
`;

// Product Info and slider

const SliderAndProductInfoBox = styled.div`
  display: grid;
  width: 90%;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;

  @media only screen and (max-width: 949px) {
    display: flex;
    width: 100%;
    flex-direction: column;
    gap: 2rem;
    height: auto;
  }
`;

const ProductInfoBox = styled.div`
  padding: 0 2rem;
  display: flex;
  gap: 1rem;
  flex-direction: column;
  text-align: justify;
  h1 {
    margin-bottom: -1.5rem;
    text-transform: capitalize;
    font-size: 2.7rem;
    font-weight: bold;
  }
  h3 {
    font-size: 2.1rem;
    display: flex;
    gap: 1rem;
    align-items: end;
    i {
      text-decoration: line-through;

      color: #cac9c9;
      font-family: "Times New Roman", Times, serif;
      font-size: 1.6rem;
    }
  }
  p {
    color: #7d7d7d;
    font-size: 1.6rem;
  }
  @media only screen and (max-width: 949px) {
    h1 {
      font-size: 2rem;
    }
  }
`;

const ColorAndInfoBox = styled.div`
  display: flex;
  height: fit-content;
  align-items: center;
  gap: 1rem;
  position: relative;
  color: #7d7d7d;
  font-size: 1.6rem;
`;
const ColorBox = styled.div`
  height: 4rem;
  width: 3rem;
  display: flex;
  position: relative;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  span {
    visibility: hidden;
    position: absolute;
    top: -2rem;
    z-index: 2;
    background-color: black;
    padding: 0.3rem 0.5rem 0.7rem 0.5rem;
    border-radius: 0.5rem;
    text-transform: capitalize;
    color: white;
    transition: all 0.1s;
    clip-path: polygon(
      0% 0%,
      100% 0%,
      100% 75%,
      75% 75%,
      53% 92%,
      32% 75%,
      0% 75%
    );
  }
  i {
    width: 1.7rem;
    height: 1.7rem;
    border-radius: 50%;
    cursor: pointer;
    opacity: 0.7;
    display: flex;

    &:hover {
      outline: 1px solid black;
      outline-offset: 2px;
      opacity: 1;
    }
  }
  &:hover {
    span {
      visibility: visible;
    }
  }
`;

const AddToCartDiv = styled.div`
  display: flex;
  gap: 2rem;
  height: 5rem;
  position: relative;
  width: 45rem;
  button {
    text-transform: uppercase;
    background-color: black;
    color: white;
    border: none;
    padding: 0.7rem 1.2rem;
  }
  @media only screen and (max-width: 949px) {
  }
`;

const InpBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  button {
    height: 4rem;
    background-color: white;
    border: 1px solid #e9e9e9;
    color: black;
    svg {
      color: black;
    }
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: none;
  }
`;

const CheckOutBox = styled.div`
  padding: 1rem 0;
  /* background-color: red; */
  h4 {
    position: relative;
    font-size: 2rem;
    z-index: 1;
    margin: 1rem 0;
    overflow: hidden;
    text-align: center;
    color: #aaa9a9;
    &::before,
    &::after {
      position: absolute;
      top: 50%;
      overflow: hidden;
      width: 50%;
      height: 1px;

      content: "\a0";
      background-color: #e5e3e3;
    }
    &::before {
      margin-left: -50%;
      text-align: right;
    }
  }
  img {
    width: 30rem;
    display: block;
    margin: 0 auto;
    opacity: 0.9;
  }
  ul {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
    /* background-color: red; */
    justify-content: center;
    align-items: center;
    li {
      display: block;
      margin: 0 auto;
      color: #7d7d7d;
      font-size: 1.6rem;
      list-style: circle;
      text-transform: capitalize;
      width: 100%;

      @media only screen and (max-width: 949px) {
        margin: 0;
        margin-left: -5rem;
      }
      span {
        display: flex;
        justify-content: space-between;
        span {
          text-align: start;
        }
      }
    }
  }
`;

const MoneyInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  h5 {
    text-transform: capitalize;
    font-weight: bold;
  }
  span {
    p {
      display: flex;
      gap: 0.5rem;
      align-items: center;
      color: #6b6b6b;
      text-transform: capitalize;
    }
  }
`;

const OutOfStockPara = styled.h2`
  font-size: 3rem;
  letter-spacing: 0.1rem;
  font-weight: bold;
  color: #bb1313;
`;

// Desc
const DescBox = styled.div`
  display: flex;

  flex-direction: column;
  margin-top: 3rem;
  padding: 2rem 0;
  gap: 2rem;
  @media only screen and (max-width: 949px) {
  }
`;

const ImgAndTextbox = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-content: center;
  align-items: center;
  gap: 2rem;

  @media only screen and (max-width: 949px) {
    display: none;
  }
`;
const ImgAndTextBoxMobile = styled.div`
  overflow-x: hidden;
  display: none;
  @media only screen and (max-width: 949px) {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
`;

const ImgBox = styled.div`
  display: flex;
  justify-content: center;
  background-color: #f7f7f7;
  img {
    width: 45%;
    @media only screen and (max-width: 949px) {
      width: 80%;
    }
  }
`;

const TextBox = styled.div`
  display: flex;

  flex-direction: column;
  gap: 2rem;
  padding: 0 2rem;
  h5 {
    font-size: 2.7rem;
    font-weight: bold;
    letter-spacing: 0.1rem;
    text-transform: capitalize;
    text-align: center;
    @media only screen and (max-width: 949px) {
      font-size: 2rem;
    }
  }
  p {
    text-align: center;
    color: #7d7d7d;
    font-size: 1.5rem;
    letter-spacing: 0.1rem;
    @media only screen and (max-width: 949px) {
      font-size: 1.1rem;
    }
  }
  @media only screen and (max-width: 949px) {
    gap: 0;
  }
`;

const RelatedProductBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 2rem 0;
`;

const MainBoxProducts = styled.section`
  padding: 1rem 0;
  margin-top: 1rem;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  overflow-x: hidden;
  position: relative;
`;

const ProductsBox = styled.div`
  height: fit-content;
  display: flex;
  gap: 3rem;
  padding: 1rem 0;
  align-items: center;
  justify-content: center;
  padding: 0 1rem;
  width: fit-content;
  max-width: 100%;
  justify-content: start;
  position: relative;
  height: fit-content;
  overflow-x: scroll;
  @media only screen and (max-width: 949px) {
    width: 90%;
    max-width: 90%;
    justify-content: start;
  }
  scroll-behavior: smooth;
  &::-webkit-scrollbar {
    display: none;
  }
  a {
    text-decoration: none;
    color: black;
  }
`;
const Select = styled.select`
  padding: 1rem 1.5rem;
  border: none;
  color: #777;
  background-color: white;
  border-radius: 1rem;
  font-size: 1.3rem;
  font-weight: bold;
  letter-spacing: 0.04rem;
  border: 1px solid #777;
  border-style: dotted;
  &:focus {
    outline: none;
    border: none;
    border: 1px solid #777;
    border-style: dotted;
  }
  @media only screen and (max-width: 1099px) {
    padding: 1rem 0;
  }
`;
const Option = styled.option`
  color: #777;
  font-weight: bold;
`;

const ErrDiv = styled.div`
  color: red;
`;

const AddedToCart = styled.div`
  color: black;
`;

const RzrpayDiv = styled.div`
  width: 100%;
  height: fit-content;
`;

const ColorPincodeBox = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;

  @media only screen and (max-width: 949px) {
    flex-direction: column;
    align-items: start;
    gap: 1rem;
  }
`;

const PinCodeInnerBox = styled.div`
  background-color: white;
  padding: 0.4rem 1rem;
  display: flex;
  align-items: center;
  border-radius: 0.5rem;
  border: 1px solid #e1e1e1;
  width: 60%;
  @media only screen and (max-width: 949px) {
    width: 100%;
  }
`;

const Input = styled.input`
  border: none;
  width: 80%;
  padding: 0 1rem;
  &:focus {
    outline: none;
  }
`;

const CheckButton = styled.button`
  border: none;
  background-color: black;
  color: white;
  padding: 0.6rem 1.4rem;
  border-radius: 0.5rem;
  width: 20%;
  @media only screen and (max-width: 949px) {
    width: 30%;
  }
`;

const DeliveryResultBox = styled.div`
  background-color: #f6f6f9;
  width: 65%;
  height: fit-content;
  border-radius: 0.8rem;
  border: 1px solid #e1e1e1;
  display: flex;
  flex-direction: column;

  padding: 2rem;
  padding-top: 1rem;
  gap: 1rem;
  @media only screen and (max-width: 949px) {
    width: 100%;
  }
`;
const DeliveryResultTextBox = styled.div`
  border: 1px solid #c5c5c5;
  border-style: dashed;
  background-color: white;
  padding: 1rem 2rem;
  display: flex;
  flex-direction: column;

  div {
    display: flex;
    align-items: center;
    padding: 0.2rem;
    gap: 1rem;
    margin-bottom: 0.1rem;
    /* width: 100%; */
    svg {
      color: black;
      &:first-child {
        color: #57c13d;
      }
    }
  }
  @media only screen and (max-width: 949px) {
    /* padding: 0.2rem 0.1rem; */
    p {
      font-size: 1.38rem;
    }
    div {
      gap: 0.5rem;
    }
  }
`;
const ParaBox = styled.div`
  color: black;
`;

const MoneyDetailsInfoBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  @media only screen and (max-width: 949px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const ProductPage = (props) => {
  const cartItems = useSelector((state) => state.cartItems);
  const [deliveryDate, setDeliveryDate] = useState(null);
  const [product, setProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [deliveryResult, setDeliveryResult] = useState(null);
  const [pinLoading, setPinLoading] = useState(false);
  const [colors, setColors] = useState(null);
  const [selectedClr, setSelectedClr] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [productAdded, setProductAdded] = useState(false);
  const productId = useParams().productId;
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [cartError, setCartError] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);
  const [maxQ, setMAxQ] = useState(false);
  const dispatch = useDispatch();
  let counter = 0;
  const navigate = useNavigate();
  const getSelectValueHandler = () => {
    setError(false);
    const e = document.getElementById("searchFilter");

    const value = e.options[e.selectedIndex].value;
    console.log(value);
    console.log(value);
    setSelectedSize(value);
  };

  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex > 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }
  const descData = [
    {
      heading: "quality",
      des: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio sapiente illo odio aut dolorem? Tempore maxime animi perspiciatis ex atque est vitae. Velit voluptate similique aliquam fuga optio enim ad magni. Aspernatur minus necessitatibus molestias aperiam accusantium eius distinctio suscipit?",
    },
    {
      heading: "Customer Satisfaction",
      des: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio sapiente illo odio aut dolorem? Tempore maxime animi perspiciatis ex atque est vitae. Velit voluptate similique aliquam fuga optio enim ad magni. Aspernatur minus necessitatibus molestias aperiam accusantium eius distinctio suscipit?",
    },
    {
      heading: "Demo test",
      des: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio sapiente illo odio aut dolorem? Tempore maxime animi perspiciatis ex atque est vitae. Velit voluptate similique aliquam fuga optio enim ad magni. Aspernatur minus necessitatibus molestias aperiam accusantium eius distinctio suscipit?",
    },
    {
      heading: "Dummy test",
      des: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio sapiente illo odio aut dolorem? Tempore maxime animi perspiciatis ex atque est vitae. Velit voluptate similique aliquam fuga optio enim ad magni. Aspernatur minus necessitatibus molestias aperiam accusantium eius distinctio suscipit?",
    },
  ];

  let swicther = true;
  useEffect(() => {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    // const localStr = JSON.parse(localStorage.getItem("state"));

    // if (localStr) {
    //   dispatch({ type: "reload", data: { ...localStr } });
    // }
    const fetcher = async () => {
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/product/${productId}`
      );
      const data = await res.json();
      if (!data.product) {
        navigate("/not-found");
        return;
      }
      setProduct(data.product);

      setSelectedClr(data.product.color);
      const clrArr = data.product.color.split(",");
      setColors(clrArr);

      const resProducts = await fetch(
        `${process.env.REACT_APP_BASE_URL}/product/all-items`
      );
      const dataProducts = await resProducts.json();
      setProducts(shuffle(dataProducts.products));
      const key = "rzp_test_ymEsmet2FmOUDv";

      const widgetConfig = {
        key: key,
        amount: Number(data.product.price) * 100,
      };
      const rzpAffordabilitySuite = await new window.RazorpayAffordabilitySuite(
        widgetConfig
      );
      await rzpAffordabilitySuite.render();
    };
    fetcher();

    return () => {};
  }, [productId]);

  //Replace it with your Test Key ID generated from the Dashboard
  // const amount = product ? product.amount : 40000; //in paise

  const quantityAdder = () => {
    if (quantity < 2) {
      setQuantity(quantity + 1);
    }
  };
  const quantutyMinus = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  // const colorSelecter = (e) => {
  //   const id = e.target.id;
  //   setSelectedClr(id);
  //   setErr(false);

  //   const allELe = document.querySelectorAll(".clrBox");
  //   for (const el of allELe) {
  //     el.style.outline = "";
  //     el.style.outlineOffset = "";
  //     el.style.opacity = ".7";
  //   }
  //   const ele = document.querySelector(`#${id}`);
  //   ele.style.outline = "1px solid black";
  //   ele.style.outlineOffset = "2px";
  //   ele.style.opacity = "1";
  // };

  const addToCartHandler = async () => {
    setError(false);
    if (!selectedSize) {
      setError(true);
      return;
    }
    setIsLoading(true);
    const titleArr = product.title.split(" ");
    let title;
    if (titleArr[1]) {
      title = titleArr[0] + " " + titleArr[1];
    } else {
      title = titleArr[0];
    }
    const obj = {
      title: title,
      productId: productId,
      price: product.price,
      image: product.images.split(" ")[0],
      quantity: quantity,
      color: selectedClr,
      size: selectedSize,
      category: product.category,
      slug: product.slug,
      stockAvailable: Number(product.stock),
    };

    // Stock Verifier

    const alreadyFound = cartItems.find((item) => {
      if (item.size === obj.size) {
        return item.productId === obj.productId;
      }
    });
    if (
      alreadyFound &&
      Number(alreadyFound.quantity) + Number(obj.quantity) > 2
    ) {
      setMAxQ(true);
      setIsLoading(false);
      setTimeout(() => {
        setMAxQ(false);
      }, 1500);
      return;
    }

    if (alreadyFound) {
      const stockVerifier = await fetch(
        `${process.env.REACT_APP_BASE_URL}/product/stock`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            productId: product.id,
            quantity: Number(alreadyFound.quantity) + obj.quantity,
            size: selectedSize,
          }),
        }
      );
      const stockData = await stockVerifier.json();
      console.log(stockData);
      if (stockData.add) {
        setProductAdded(true);
        dispatch({ type: "addToCart", product: { ...obj } });
        setSelectedSize(null);
      } else {
        setCartError(true);
        setTimeout(() => {
          setCartError(false);
        }, 2000);
      }
    } else {
      const stockVerifier = await fetch(
        `${process.env.REACT_APP_BASE_URL}/product/stock`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            productId: product.id,
            quantity: obj.quantity,
            size: selectedSize,
          }),
        }
      );
      const stockData = await stockVerifier.json();
      console.log(stockData);
      if (stockData.add) {
        setProductAdded(true);
        dispatch({ type: "addToCart", product: { ...obj } });
      } else {
        setCartError(true);
        setTimeout(() => {
          setCartError(false);
        }, 2000);
      }
    }
    setSelectedSize(null);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    setTimeout(() => {
      setProductAdded(false);
    }, 1500);
  };

  // const [rating, setRating] = useState(0);
  // const ratingsChanger = (newRating, name) => {
  //   setRating(newRating);
  // };
  return (
    <>
      {!product && <FullPageLoader />}

      {product && (
        <>
          <Navbar />
          <MainBox>
            {product && (
              <>
                <SliderAndProductInfoBox>
                  <ImagesSLider product={product} />
                  {/* data-aos="fade-left" */}
                  <ProductInfoBox>
                    <h1>{product.title}</h1>
                    <h3>
                      ₹ {Number(product.price).toLocaleString("en-IN")}
                      <i>
                        {Number.parseInt(
                          (Number(product.price) * 100) /
                            (100 - Number(product.discount))
                        )}
                      </i>
                    </h3>
                    <p>{product.desc}</p>
                    <RzrpayDiv>
                      <div id="razorpay-affordability-widget"></div>
                    </RzrpayDiv>
                    <ColorPincodeBox>
                      <ColorAndInfoBox>
                        Color :
                        {colors.map((clr) => {
                          return (
                            <ColorBox key={product.id + clr}>
                              <span>{clr}</span>
                              <i
                                className="clrBox"
                                id={clr.trim()}
                                style={{ backgroundColor: `${clr}` }}
                              ></i>
                            </ColorBox>
                          );
                        })}
                      </ColorAndInfoBox>
                      {!deliveryResult && (
                        <PinCodeInnerBox id="pincodeInner">
                          <LocationOn />
                          <Input
                            type="number"
                            max={6}
                            id="pinCode"
                            placeholder="Enter pincode"
                            onChange={() => {
                              const pinCode =
                                document.querySelector("#pinCode");
                              const pincodeInner =
                                document.querySelector("#pincodeInner");

                              pincodeInner.style.border = "1px solid #e1e1e1";
                              pinCode.placeholder = "Enter pincode";
                              return;
                            }}
                          />
                          <CheckButton
                            onClick={async () => {
                              setPinLoading(true);
                              const pinCode =
                                document.querySelector("#pinCode");
                              const pincodeInner =
                                document.querySelector("#pincodeInner");
                              if (pinCode.value.length < 6) {
                                pinCode.value = "";
                                pincodeInner.style.border = "1px solid red";
                                pinCode.placeholder = "Enter valid pincode";
                                return;
                              }
                              if (pinCode.value.length > 6) {
                                pinCode.value = "";
                                pincodeInner.style.border = "1px solid red";
                                pinCode.placeholder = "Enter valid pincode";
                                return;
                              }
                              const reslt = await fetch(
                                `${process.env.REACT_APP_BASE_URL}/shipping/check-delivery`,
                                {
                                  method: "POST",
                                  headers: {
                                    "Content-Type": "application/json",
                                  },
                                  body: JSON.stringify({
                                    pinCode: pinCode.value,
                                  }),
                                }
                              );
                              const data = await reslt.json();
                              setDeliveryResult(data);
                              console.log(data);
                              setPinLoading(false);
                              pinCode.value = "";
                              // alert(data.message + `: ${data.data.city}`);
                              var date = new Date();
                              date.setDate(date.getDate() + 10);
                              setDeliveryDate(date.toString().split(" "));
                            }}
                          >
                            Check
                          </CheckButton>
                        </PinCodeInnerBox>
                      )}
                    </ColorPincodeBox>
                    {deliveryResult && (
                      <DeliveryResultBox data-aos="zoom-in">
                        {pinLoading && <CompLoader />}
                        {deliveryResult.available && (
                          <h4>Available at {deliveryResult.data[0].city}</h4>
                        )}
                        {!deliveryResult.available && (
                          <h4>Not available at your pincode.</h4>
                        )}
                        <DeliveryResultTextBox>
                          {deliveryResult.available && (
                            <p style={{ color: "#57C13D" }}>
                              We are available and serving at your location.
                            </p>
                          )}
                          {!deliveryResult.available && (
                            <p style={{ color: "red" }}>
                              We are not available at your location. Stay tuned
                              for updates.
                            </p>
                          )}
                          {deliveryResult.available && (
                            <>
                              <div>
                                {" "}
                                <CheckCircleOutline />
                                <LocalShipping />
                                <ParaBox>
                                  <strong>Expected Delivery -</strong>
                                  <span>
                                    {deliveryDate[0]}, {deliveryDate[1]}{" "}
                                    {deliveryDate[2]}
                                  </span>
                                </ParaBox>
                              </div>
                              <div>
                                <CheckCircleOutline />
                                <CurrencyRupee />
                                <ParaBox>
                                  <strong>Payment -</strong>
                                  <span>Online Only</span>
                                </ParaBox>
                              </div>
                            </>
                          )}
                        </DeliveryResultTextBox>
                        <CheckButton
                          onClick={() => {
                            setDeliveryResult(null);
                          }}
                        >
                          Change
                        </CheckButton>
                      </DeliveryResultBox>
                    )}
                    <AddToCartDiv>
                      {isLoading && <BtnLoader />}
                      {product.stock.length > 0 && !isLoading && (
                        <>
                          <InpBox>
                            <button onClick={quantityAdder}>
                              <Add onClick={quantityAdder} />
                            </button>
                            <button>{quantity}</button>
                            <button onClick={quantutyMinus}>
                              <Remove onClick={quantutyMinus} />
                            </button>
                          </InpBox>
                          <Select
                            name="searchFilter"
                            id="searchFilter"
                            onChange={getSelectValueHandler}
                          >
                            <Option defaultValue value={selectedSize}>
                              Select Size
                            </Option>
                            ;
                            {product.stock.map((i) => {
                              for (const k in i) {
                                if (Number(i[k]) > 0) {
                                  return (
                                    <Option key={k} value={k}>
                                      Size : {k}
                                    </Option>
                                  );
                                }
                                return <></>;
                              }
                            })}
                          </Select>
                          <button onClick={addToCartHandler}>
                            add to cart
                          </button>
                        </>
                      )}{" "}
                      {product.stock < 1 && (
                        <OutOfStockPara>Out of stock</OutOfStockPara>
                      )}
                    </AddToCartDiv>
                    {productAdded && (
                      <AddedToCart data-aos="fade-right">
                        Added to cart
                      </AddedToCart>
                    )}
                    {maxQ && (
                      <AddedToCart data-aos="fade-right">
                        Max quantity reached.
                      </AddedToCart>
                    )}
                    {error && <ErrDiv data-aos="fade-up">Select Size</ErrDiv>}
                    {cartError && (
                      <ErrDiv data-aos="fade-up">
                        Stock not available, please reduce quantity
                      </ErrDiv>
                    )}
                    <CheckOutBox>
                      <h4>Safe Checkout</h4>
                      <img src={card} alt="" />
                    </CheckOutBox>
                    <MoneyDetailsInfoBox>
                      <MoneyInfoBox>
                        <h5>free shipping on orders over ₹999</h5>
                        <span>
                          <p>
                            <CheckCircle />
                            Secure payments
                          </p>
                          <p>
                            <CheckCircle />
                            No hassle replacements
                          </p>
                          <p>
                            <CheckCircle />
                            No-Risk moneyback guarantee
                          </p>
                        </span>
                      </MoneyInfoBox>{" "}
                      <CheckOutBox>
                        <h4>Details</h4>
                        <ul>
                          <li>
                            <span>
                              <span>Category</span>
                              <span> {`${product.category}`}</span>
                            </span>
                          </li>
                          <li>
                            <span>
                              <span>Fabric </span>
                              <span>{`${product.fabric}`}</span>
                            </span>
                          </li>
                        </ul>
                        <ul>
                          <li>
                            <span>
                              <span>Country Of Origin </span>
                              <span>INDIA</span>
                            </span>
                          </li>
                          <li>
                            <span>
                              <span>Discount </span>
                              <span>{`${product.discount}%`}</span>
                            </span>
                          </li>
                        </ul>
                      </CheckOutBox>
                    </MoneyDetailsInfoBox>
                  </ProductInfoBox>
                </SliderAndProductInfoBox>

                <DescBox>
                  <CheckOutBox data-aos="fade-up">
                    <h4>About</h4>
                  </CheckOutBox>

                  <ImgAndTextbox>
                    {product.images.split(" ").map((img, ind) => {
                      if (img !== "") {
                        if (swicther) {
                          swicther = false;

                          if (descData[ind]) {
                            return (
                              <>
                                <ImgBox key={ind + img} data-aos="fade-left">
                                  <img src={img} alt="" />
                                </ImgBox>
                                <TextBox
                                  key={ind + descData[ind].heading}
                                  data-aos="fade-right"
                                >
                                  <h5>{descData[ind].heading}</h5>
                                  <p>{descData[ind].des}</p>
                                </TextBox>
                              </>
                            );
                          }
                        } else {
                          swicther = true;

                          if (descData[ind]) {
                            return (
                              <>
                                <TextBox
                                  key={ind + descData[ind].heading}
                                  data-aos="fade-left"
                                >
                                  <h5>{descData[ind].heading}</h5>
                                  <p>{descData[ind].des}</p>
                                </TextBox>
                                <ImgBox key={ind + img} data-aos="fade-right">
                                  <img src={img} alt="" />
                                </ImgBox>
                              </>
                            );
                          }
                        }
                      }
                      return <></>;
                    })}
                  </ImgAndTextbox>
                  <ImgAndTextBoxMobile>
                    {product.images.split(" ").map((img, ind) => {
                      if (img !== "") {
                        swicther = false;

                        if (descData[ind]) {
                          return (
                            <>
                              <ImgBox key={ind + img} data-aos="fade-right">
                                <img src={img} alt="" />
                              </ImgBox>
                              <TextBox
                                key={ind + descData[ind].heading}
                                data-aos="fade-left"
                              >
                                <h5>{descData[ind].heading}</h5>
                                <p>{descData[ind].des}</p>
                              </TextBox>
                            </>
                          );
                        }
                      }
                      return <></>;
                    })}
                  </ImgAndTextBoxMobile>
                </DescBox>

                {/* <ReviewsBox>
                  <StarRatings
                    starRatedColor="gold"
                    numberOfStars={5}
                    name="rating"
                    rating={rating}
                    changeRating={ratingsChanger}
                  />
                </ReviewsBox> */}

                <RelatedProductBox>
                  {/* <CheckOutBox>
                    <h4>Related Products</h4>
                    <RelatedProductDiv>
                      {products.length > 0 &&
                        products.map((item) => {
                          if (
                            product.id !== item.id &&
                            item.category === product.category &&
                            counter < 5
                          ) {
                            counter++;
                            const colors = item.color.split(",");
                            const image = item.images.split(" ")[0];
                            return (
                              <Link
                                to={`/product/${item.slug}`}
                                key={item.id + item.title}
                                state={{ productId: `${item.id}` }}
                              >
                                <FeatureProductBox
                                  data={{
                                    ...item,
                                    colors: colors,
                                    img: image,
                                  }}
                                />
                              </Link>
                            );
                          }

                          return <></>;
                        })}
                    </RelatedProductDiv>
                  </CheckOutBox> */}

                  {!isLoading &&
                    products.length > 1 &&
                    products.filter((item) => {
                      return item.category === product.category;
                    }).length > 1 && (
                      <>
                        <CheckOutBox>
                          <h4>Related Products</h4>
                        </CheckOutBox>
                        <MainBoxProducts>
                          <ProductsBox id="productBox">
                            {!isLoading &&
                              products.length > 0 &&
                              products.map((item) => {
                                if (
                                  product.id !== item.id &&
                                  item.category === product.category &&
                                  counter < 4
                                ) {
                                  counter++;
                                  const colors = item.color.split(",");
                                  const image = item.images.split(" ")[0];
                                  return (
                                    <Link
                                      to={`/product/${item.category}/${item.slug}/${item.id}`}
                                      key={item.id + item.title}
                                      state={{ productId: `${item.id}` }}
                                    >
                                      <FeatureProductBox
                                        key={item.title}
                                        data={{
                                          ...item,
                                          colors: colors,
                                          img: image,
                                        }}
                                      />
                                    </Link>
                                  );
                                }
                                return <></>;
                              })}
                          </ProductsBox>
                        </MainBoxProducts>
                      </>
                    )}
                </RelatedProductBox>
              </>
            )}
          </MainBox>
          <Footer />
        </>
      )}
    </>
  );
};

export default ProductPage;
