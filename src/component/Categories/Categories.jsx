import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AOS from "aos";

// images
import SectionHeading from "../UI/SectionHeading";
import { EnvVariables } from "../../data";
import CategoryLoader from "../Loaders/CategoryLoader/CategoryLoader";

//

const MainBox = styled.section`
  padding: 1rem 0;
  margin: 3rem 0;
  @media only screen and (max-width: 949px) {
    margin-top: -4rem;
    /* overflow-x: hidden; */
  }
  width: 100%;
`;

const InnerBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

const ItemsBox = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  justify-items: center;
  padding: 0 2rem;
  gap: 2rem;

  @media only screen and (max-width: 649px) {
    grid-template-columns: 1fr;
    justify-items: center;
  }
  @media only screen and (min-width: 649px) and (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const CategoryBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f7f7f7;
  position: relative;
  animation-delay: 0.7s;
  &:hover {
    img {
      transform: scale(1.05);
    }
    span {
      transform: scale(1.05);
    }
  }
  img {
    width: 80%;
    padding: 1rem 0;
    transition: all 0.5s;
  }
  span {
    position: absolute;
    bottom: 10%;
    z-index: 2;
    background-color: #ffffffdd;
    text-transform: uppercase;
    width: 70%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0.7rem 0;
    transition: all 0.7s;

    b {
      font-size: 1.5rem;
      letter-spacing: 0.2rem;
      font-weight: bold;
    }
    i {
      font-style: normal;
      font-size: 0.9rem;
      font-weight: bold;
      color: #676767;
    }
  }
  @media only screen and (max-width: 949px) {
  }
`;

const Categories = () => {
  const [categoryItems, setCategoryItems] = useState(null);

  useEffect(() => {
    const fetcher = async () => {
      const res = await fetch(`${EnvVariables.BASE_URL}/category/all-category`);
      const data = await res.json();
      setCategoryItems(data.categories);
      console.log(data);
    };
    fetcher();
    return () => {};
  }, []);
  let counter = 0;

  return (
    <MainBox>
      <InnerBox>
        <SectionHeading
          data={{ main: "Shop by category", secondary: "Shop by category" }}
        />
        <ItemsBox>
          {!categoryItems && <CategoryLoader />}
          {categoryItems &&
            categoryItems.map((item) => {
              console.log(`${EnvVariables.BASE_URL}/${item.image}`);
              if (counter === 0) {
                counter++;
                return (
                  <CategoryBox
                    key={item.title}
                    data-aos={
                      window.screen.availWidth > 949 ? "fade-up" : "fade-right"
                    }
                  >
                    <img
                      src={`${EnvVariables.BASE_URL}/${item.image}`}
                      alt=""
                    />
                    <span>
                      <b>{item.title}</b>
                      <i>6 Products</i>
                    </span>
                  </CategoryBox>
                );
              } else {
                counter--;
                return (
                  <CategoryBox
                    key={item.title}
                    data-aos={
                      window.screen.availWidth > 949 ? "fade-up" : "fade-left"
                    }
                  >
                    <img
                      src={`${EnvVariables.BASE_URL}/${item.image}`}
                      alt=""
                    />
                    <span>
                      <b>{item.title}</b>
                      <i>6 Products</i>
                    </span>
                  </CategoryBox>
                );
              }
            })}
        </ItemsBox>
      </InnerBox>
    </MainBox>
  );
};

export default Categories;
