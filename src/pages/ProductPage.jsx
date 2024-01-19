import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../component/Header.js/Navbar/Navbar";
import styled from "styled-components";
import { EnvVariables } from "../data";
import ImagesSLider from "../component/UI/ImagesSlider";
import { Add, CheckCircle, Remove } from "@mui/icons-material";
import card from "../assets/images/cards/card.jpg";
import FullPageLoader from "../component/Loaders/CategoryLoader/FullPageLoader";
import Footer from "../component/Footer/Footer";
import { useDispatch } from "react-redux";

const MainBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem 10rem;
  @media only screen and (max-width: 949px) {
    padding: 1rem 2rem;
  }
`;

// Product Info and slider

const SliderAndProductInfoBox = styled.div`
  display: grid;
  width: 90%;
  grid-template-columns: 1fr 1.4fr;
  gap: 2rem;
  @media only screen and (max-width: 949px) {
    display: flex;
    width: 100%;
    flex-direction: column;
    gap: 2rem;
  }
`;

const ProductInfoBox = styled.div`
  padding: 0 2rem;
  display: flex;
  gap: 1rem;
  flex-direction: column;
  @media only screen and (max-width: 949px) {
  }
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
    /* background-color: red; */
    i {
      text-decoration: line-through;

      color: #cac9c9;
      font-family: "Times New Roman", Times, serif;
      font-size: 1.6rem;
    }
  }
  p {
    color: #a0a0a0;
    font-size: 1.3rem;
  }
`;

const ColorAndInfoBox = styled.div`
  display: flex;
  height: fit-content;
  align-items: center;
  position: relative;
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
    width: 2rem;
    height: 2rem;
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

const SelectedColorBox = styled.div`
  text-transform: capitalize;
  span {
    color: black;
    font-weight: bold;
  }
  p {
    text-transform: capitalize;
    color: red;
  }
`;

const AddToCartDiv = styled.div`
  display: flex;
  gap: 2rem;
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
  h4 {
    position: relative;
    font-size: 2rem;
    z-index: 1;
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
    width: 20rem;
    display: block;
    margin: 0 auto;
    opacity: 0.9;
  }
  ul {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    li {
      width: 50%;
      color: #7a7979;
      list-style: circle;
      text-transform: capitalize;

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
  }
`;

const TextBox = styled.div`
  display: flex;

  flex-direction: column;
  gap: 2rem;
  padding: 0 2rem;
  h5 {
    font-size: 2.5rem;
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
    color: #797979;
    font-size: 1.3rem;
    letter-spacing: 0.1rem;
    @media only screen and (max-width: 949px) {
      font-size: 1.1rem;
    }
  }
  @media only screen and (max-width: 949px) {
    gap: 0;
  }
`;

const ReviewsBox = styled.div``;

const RelatedProductBox = styled.div``;

const ProductPage = (props) => {
  const { state } = useLocation();
  const [product, setProduct] = useState(null);
  const [colors, setColors] = useState(null);
  const [selectedClr, setSelectedClr] = useState(null);
  const [err, setErr] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const productId = state.productId;
  const dispatch = useDispatch();

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
    const localStr = JSON.parse(localStorage.getItem("state"));
    if (localStr) {
      dispatch({ type: "reload", data: { ...localStr } });
    }
    const fetcher = async () => {
      const res = await fetch(`${EnvVariables.BASE_URL}/product/${productId}`);
      const data = await res.json();
      console.log(data.product);
      setProduct(data.product);
      const clrArr = data.product.color.split(",");

      setColors(clrArr);
    };
    fetcher();
  }, [productId]);

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

  const colorSelecter = (e) => {
    const id = e.target.id;
    setSelectedClr(id);
    setErr(false);

    const allELe = document.querySelectorAll(".clrBox");
    for (const el of allELe) {
      el.style.outline = "";
      el.style.outlineOffset = "";
      el.style.opacity = ".7";
    }
    const ele = document.querySelector(`#${id}`);
    ele.style.outline = "1px solid black";
    ele.style.outlineOffset = "2px";
    ele.style.opacity = "1";
  };

  const addToCartHandler = () => {
    if (!selectedClr) {
      setErr(true);
      return;
    }
    const obj = {
      productId: productId,
      price: product.price,
      image: product.images.split(" ")[0],
      quantity: quantity,
      color: selectedClr,
    };
    dispatch({ type: "addToCart", product: { ...obj } });
  };

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
                        {(Number(product.price) * 100) /
                          (100 - Number(product.discount))}
                      </i>
                    </h3>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Magni ab ut magnam commodi voluptates. Enim nisi quos in
                      animi quae fugit magnam deserunt harum vel minima,
                      mollitia asperiores facere laboriosam tempore et totam
                      odio fugiat hic ad quam id! Nobis perspiciatis deserunt
                      veniam vel velit nesciunt repellendus provident corporis
                      quae?
                    </p>

                    <ColorAndInfoBox>
                      {colors.map((clr) => {
                        return (
                          <ColorBox>
                            <span>{clr}</span>
                            <i
                              className="clrBox"
                              onClick={colorSelecter}
                              id={clr.trim()}
                              style={{ backgroundColor: `${clr}` }}
                            ></i>
                          </ColorBox>
                        );
                      })}
                    </ColorAndInfoBox>

                    {selectedClr && (
                      <SelectedColorBox id="slctedBox">
                        {selectedClr && `Color:`} <span>{selectedClr}</span>
                      </SelectedColorBox>
                    )}
                    {err && (
                      <SelectedColorBox>
                        <p>select color</p>
                      </SelectedColorBox>
                    )}

                    <AddToCartDiv data-aos="fade-up">
                      <InpBox>
                        <button onClick={quantityAdder}>
                          <Add onClick={quantityAdder} />
                        </button>
                        <button>{quantity}</button>
                        <button onClick={quantutyMinus}>
                          <Remove onClick={quantutyMinus} />
                        </button>
                      </InpBox>
                      <button onClick={addToCartHandler}>add to cart</button>
                    </AddToCartDiv>
                    <CheckOutBox>
                      <h4>Safe Checkout</h4>
                      <img src={card} alt="" />
                    </CheckOutBox>
                    <MoneyInfoBox data-aos="fade-up">
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
                    </MoneyInfoBox>
                    <CheckOutBox data-aos="fade-up">
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
                          return (
                            <>
                              <ImgBox data-aos="fade-left">
                                <img
                                  src={`${EnvVariables.BASE_URL}/${img}`}
                                  alt=""
                                />
                              </ImgBox>
                              <TextBox data-aos="fade-right">
                                <h5>{descData[ind].heading}</h5>
                                <p>{descData[ind].des}</p>
                              </TextBox>
                            </>
                          );
                        } else {
                          swicther = true;
                          return (
                            <>
                              <TextBox data-aos="fade-left">
                                <h5>{descData[ind].heading}</h5>
                                <p>{descData[ind].des}</p>
                              </TextBox>
                              <ImgBox data-aos="fade-right">
                                <img
                                  src={`${EnvVariables.BASE_URL}/${img}`}
                                  alt=""
                                />
                              </ImgBox>
                            </>
                          );
                        }
                      }
                    })}
                  </ImgAndTextbox>
                  <ImgAndTextBoxMobile>
                    {product.images.split(" ").map((img, ind) => {
                      if (img !== "") {
                        swicther = false;
                        return (
                          <>
                            <ImgBox data-aos="fade-right">
                              <img
                                src={`${EnvVariables.BASE_URL}/${img}`}
                                alt=""
                              />
                            </ImgBox>
                            <TextBox data-aos="fade-left">
                              <h5>{descData[ind].heading}</h5>
                              <p>{descData[ind].des}</p>
                            </TextBox>
                          </>
                        );
                      }
                    })}
                  </ImgAndTextBoxMobile>
                </DescBox>

                <ReviewsBox></ReviewsBox>

                <RelatedProductBox></RelatedProductBox>
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
