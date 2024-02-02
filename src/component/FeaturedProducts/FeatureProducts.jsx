import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SectionHeading from "../UI/SectionHeading";
import "./FeatureProducts.css";
import FeatureProductBox from "../UI/FeatureProductBox";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import CategoryLoader from "../Loaders/CategoryLoader/CategoryLoader";
import { Link } from "react-router-dom";
import { colors } from "../../data";

const MainBox = styled.section`
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

const CategoryBox = styled.div`
  width: 30%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  @media only screen and (max-width: 949px) {
    width: 100%;
  }
`;

const CategoryButton = styled.button`
  transition: all 0.4s;
  padding: 0.3rem 2rem;
  border-radius: 2rem;
  text-transform: uppercase;
  font-size: 1.6rem;
  @media only screen and (max-width: 949px) {
    padding: 0.3rem 1.4rem;
    font-size: 1.5rem;
  }
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
  max-width: 73%;
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

const LeftBtn = styled.button`
  position: absolute;
  top: 58%;
  left: 15%;
  width: 6rem;
  height: 6rem;
  border-radius: 50%;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #eeeeee;
  color: black;
  z-index: 2;
  font-size: 1.7rem;
  font-weight: bold;
  text-align: center;
  svg {
    transform: scale(1.8);
  }
  @media only screen and (max-width: 949px) {
    width: 5rem;
    left: 8%;
    height: 5rem;
  }
`;
const RightBtn = styled.button`
  position: absolute;
  top: 58%;
  right: 14%;
  z-index: 2;
  width: 6rem;
  height: 6rem;
  border-radius: 50%;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #eeeeee;
  color: black;
  svg {
    transform: scale(1.8);
  }
  @media only screen and (max-width: 949px) {
    width: 5rem;
    right: 11%;
    height: 5rem;
  }
  text-align: center;
`;

const NoProductsFoundDiv = styled.div`
  width: 60vw;
  letter-spacing: 0.3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  color: #a4a1a1;
  height: 60vh;
  font-size: 1.7rem;
  border-radius: 1rem;
`;

const FeatureProducts = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetcher = async () => {
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/product/all-items`
      );
      const data = await res.json();
      setProducts(data.products.reverse());
      setIsLoading(false);
    };
    fetcher();
    const intv = setInterval(() => {
      fetcher();
    }, 600);
    return () => {
      clearInterval(intv);
    };
  }, []);

  const [currentView, setCurrentView] = useState("saree");

  const onClickHandler = (e) => {
    document.querySelector("#productBox").scrollLeft = 0;
    setTimeout(() => {
      const id = e.target.id;
      const buttons = document.querySelectorAll(".button");
      for (const btn of buttons) {
        btn.classList.remove("active");
        btn.classList.add("notActive");
      }

      const activeEle = document.querySelector(`#${id}`);
      activeEle.classList.add("active");
      activeEle.classList.remove("notActive");
      setCurrentView(id);
    }, 100);
  };

  const RightLeftBtnHandler = (e) => {
    const id = e.target.id;
    if (id === "left") {
      document.getElementById("productBox").scrollBy(-300, 0);
    }
    if (id === "right") {
      document.getElementById("productBox").scrollBy(300, 0);
    }
  };
  let sareeCounter = 0;
  let kurtiCounter = 0;
  let frockCounter = 0;
  let suitCounter = 0;
  const slideBtns = (
    <>
      <LeftBtn id="left" onClick={RightLeftBtnHandler}>
        <ChevronLeft id="left" onClick={RightLeftBtnHandler} />
      </LeftBtn>
      <RightBtn id="right" onClick={RightLeftBtnHandler}>
        <ChevronRight id="right" onClick={RightLeftBtnHandler} />
      </RightBtn>
    </>
  );
  return (
    <MainBox>
      <SectionHeading
        data={{ main: "Feature Products", secondary: "Shop by category" }}
      />
      <CategoryBox data-aos="fade-up">
        <CategoryButton
          onClick={onClickHandler}
          className="button notActive active"
          id="saree"
        >
          Saree
        </CategoryButton>
        <CategoryButton
          onClick={onClickHandler}
          className="button notActive"
          id="kurti"
        >
          Kurti
        </CategoryButton>
        <CategoryButton
          onClick={onClickHandler}
          className="button notActive"
          id="frock"
        >
          Frock
        </CategoryButton>
        <CategoryButton
          onClick={onClickHandler}
          className="button notActive"
          id="suit"
        >
          Suit
        </CategoryButton>
      </CategoryBox>
      {isLoading && <CategoryLoader />}
      <ProductsBox id="productBox">
        {currentView === "saree" &&
          !isLoading &&
          products.length > 0 &&
          products.map((item) => {
            if (item.category === "saree") {
              sareeCounter++;
              const colors = item.color.split(",");
              const image = item.images.split(" ")[0];
              return (
                <Link
                  to={`/product/${item.category}/${item.slug}/${item.id}`}
                  key={item.id + item.title}
                  state={{ productId: `${item.id}` }}
                >
                  <FeatureProductBox
                    data={{ ...item, colors: colors, img: image }}
                  />
                </Link>
              );
            }
            return <></>;
          })}

        {currentView === "kurti" &&
          !isLoading &&
          products.length > 0 &&
          products.map((item) => {
            if (item.category === "kurti") {
              kurtiCounter++;
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
                    data={{ ...item, colors: colors, img: image }}
                  />
                </Link>
              );
            }
            return <></>;
          })}
        {currentView === "suit" &&
          !isLoading &&
          products.length > 0 &&
          products.map((item) => {
            if (item.category === "suit") {
              suitCounter++;
              const colors = item.color.split(",");
              const image = item.images.split(" ")[0];

              return (
                <Link
                  to={`/product/${item.category}/${item.slug}/${item.id}`}
                  key={item.id + item.title}
                  state={{ productId: `${item.id}` }}
                >
                  <FeatureProductBox
                    data={{ ...item, colors: colors, img: image }}
                  />
                </Link>
              );
            }
            return <></>;
          })}
        {currentView === "frock" &&
          !isLoading &&
          products.length > 0 &&
          products.map((item) => {
            if (item.category === "frock") {
              frockCounter++;
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
                    data={{ ...item, colors: colors, img: image }}
                  />
                </Link>
              );
            }
            return <></>;
          })}
        {currentView === "saree" && !isLoading && sareeCounter === 0 && (
          <NoProductsFoundDiv>
            <p>No Products Found...</p>
          </NoProductsFoundDiv>
        )}
        {currentView === "kurti" && !isLoading && kurtiCounter === 0 && (
          <NoProductsFoundDiv>
            <p>No Products Found...</p>
          </NoProductsFoundDiv>
        )}
        {currentView === "suit" && !isLoading && suitCounter === 0 && (
          <NoProductsFoundDiv>
            <p>No Products Found...</p>
          </NoProductsFoundDiv>
        )}
        {currentView === "frock" && !isLoading && frockCounter === 0 && (
          <NoProductsFoundDiv>
            <p>No Products Found...</p>
          </NoProductsFoundDiv>
        )}
      </ProductsBox>
      {currentView === "saree" &&
        !isLoading &&
        sareeCounter !== 0 &&
        sareeCounter > 3 &&
        slideBtns}
      {currentView === "kurti" &&
        !isLoading &&
        kurtiCounter !== 0 &&
        kurtiCounter > 3 &&
        slideBtns}
      {currentView === "suit" &&
        !isLoading &&
        suitCounter !== 0 &&
        suitCounter > 3 &&
        slideBtns}
      {currentView === "frock" &&
        !isLoading &&
        frockCounter !== 0 &&
        frockCounter > 3 &&
        slideBtns}
    </MainBox>
  );
};

export default FeatureProducts;
