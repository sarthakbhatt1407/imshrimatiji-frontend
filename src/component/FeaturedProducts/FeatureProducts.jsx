import React, { useState } from "react";
import styled from "styled-components";
import SectionHeading from "../UI/SectionHeading";
import "./FeatureProducts.css";
import AOS from "aos";
import saree from "../../assets/images/featured/Kanji Silk Saree_3.webp";
import FeatureProductBox from "../UI/FeatureProductBox";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

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
  border: 1px solid black;
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
  overflow: scroll;
  justify-content: center;
  padding: 0 1rem;
  width: 80%;
  justify-content: start;
  position: relative;
  @media only screen and (max-width: 949px) {
    width: 80%;
    justify-content: start;
  }
  scroll-behavior: smooth;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const LeftBtn = styled.button`
  position: absolute;
  top: 58%;
  left: 11%;
  width: 6rem;
  height: 6rem;
  border-radius: 50%;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
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
    left: 14%;
    height: 5rem;
  }
`;
const RightBtn = styled.button`
  position: absolute;
  top: 58%;
  right: 10.5%;
  z-index: 2;
  width: 6rem;
  height: 6rem;
  border-radius: 50%;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
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

const FeatureProducts = () => {
  const data = [
    {
      title: "Anarkali Frock for women black kjhfdskjhfnskj i ugiurei",
      img: saree,
      category: "kurti",
      price: 1999,
      colors: ["red", "black", "green", "black"],
    },
    {
      title: "kurti 02",
      img: saree,
      category: "kurti",
      price: 1999,
      colors: ["red", "green", "yellow", "ggg"],
    },
    {
      title: "kurti 03",
      img: saree,
      category: "kurti",
      price: 1999,
      colors: ["red", "black", "green"],
    },
    {
      title: "kurti 04",
      img: saree,
      category: "kurti",
      price: 1999,
      colors: ["red", "black", "green"],
    },
    {
      title: "saree 01",
      img: saree,
      category: "saree",
      price: 1999,
      colors: ["red", "black", "green"],
    },
    {
      title: "saree 01",
      img: saree,
      category: "saree",
      price: 1999,
      colors: ["red", "black", "green"],
    },
    {
      title: "saree 01",
      img: saree,
      category: "saree",
      price: 1999,
      colors: ["red", "black", "green"],
    },
    {
      title: "saree 01",
      img: saree,
      category: "saree",
      price: 1999,
      colors: ["red", "black", "green"],
    },
    {
      title: "saree 01",
      img: saree,
      category: "saree",
      price: 1999,
      colors: ["red", "black", "green"],
    },
    {
      title: "saree 01",
      img: saree,
      category: "saree",
      price: 1999,
      colors: ["red", "black", "green"],
    },
    {
      title: "frock 01",
      img: saree,
      category: "frock",
      price: 1999,
      colors: ["red", "black", "green"],
    },
    {
      title: "frock 01",
      img: saree,
      category: "frock",
      price: 1999,
      colors: ["red", "black", "green"],
    },
    {
      title: "frock 01",
      img: saree,
      category: "frock",
      price: 1999,
      colors: ["red", "black", "green"],
    },
    {
      title: "frock 01",
      img: saree,
      category: "frock",
      price: 1999,
      colors: ["red", "black", "green"],
    },
    {
      title: "frock 01",
      img: saree,
      category: "frock",
      price: 1999,
      colors: ["red", "black", "green"],
    },
    {
      title: "frock 01",
      img: saree,
      category: "frock",
      price: 1999,
      colors: ["red", "black", "green"],
    },
    {
      title: "frock 01",
      img: saree,
      category: "frock",
      price: 1999,
      colors: ["red", "black", "green"],
    },
    {
      title: "suit 01",
      img: saree,
      category: "suit",
      price: 1999,
      colors: ["red", "black", "green"],
    },
    {
      title: "suit 01",
      img: saree,
      category: "suit",
      price: 1999,
      colors: ["red", "black", "green"],
    },
    {
      title: "suit 01",
      img: saree,
      category: "suit",
      price: 1999,
      colors: ["red", "black", "green"],
    },
    {
      title: "suit 01",
      img: saree,
      category: "suit",
      price: 1999,
      colors: ["red", "black", "green"],
    },
    {
      title: "suit 01",
      img: saree,
      category: "suit",
      price: 1999,
      colors: ["red", "black", "green"],
    },
    {
      title: "suit 01",
      img: saree,
      category: "suit",
      price: 1999,
      colors: ["red", "black", "green"],
    },
  ];

  const [currentView, setCurrentView] = useState("saree");

  const onClickHandler = (e) => {
    document.querySelector("#productBox").scrollLeft = 0;
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
  };

  const RightLeftBtnHandler = (e) => {
    const id = e.target.id;
    if (id === "left") {
      document.getElementById("productBox").scrollBy(-360, 0);
    }
    if (id === "right") {
      document.getElementById("productBox").scrollBy(360, 0);
    }
  };

  return (
    <MainBox>
      <LeftBtn data-aos="fade-up" id="left" onClick={RightLeftBtnHandler}>
        <ChevronLeft id="left" onClick={RightLeftBtnHandler} />
      </LeftBtn>
      <RightBtn data-aos="fade-up" id="right" onClick={RightLeftBtnHandler}>
        <ChevronRight id="right" onClick={RightLeftBtnHandler} />
      </RightBtn>
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
      <ProductsBox id="productBox">
        {currentView === "saree" &&
          data.map((item) => {
            if (item.category === "saree") {
              return <FeatureProductBox key={item.title} data={item} />;
            }
            return <></>;
          })}
        {currentView === "kurti" &&
          data.map((item) => {
            if (item.category === "kurti") {
              return <FeatureProductBox key={item.title} data={item} />;
            }
            return <></>;
          })}
        {currentView === "frock" &&
          data.map((item) => {
            if (item.category === "frock") {
              return <FeatureProductBox key={item.title} data={item} />;
            }
            return <></>;
          })}
        {currentView === "suit" &&
          data.map((item) => {
            if (item.category === "suit") {
              return <FeatureProductBox key={item.title} data={item} />;
            }
            return <></>;
          })}
      </ProductsBox>
    </MainBox>
  );
};

export default FeatureProducts;
