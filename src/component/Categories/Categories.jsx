import React, { useEffect, useState } from "react";
import styled from "styled-components";

// images
import SectionHeading from "../UI/SectionHeading";
import CategoryLoader from "../Loaders/CategoryLoader/CategoryLoader";
import CategoryBox from "../UI/CategoryBox";
import { Link } from "react-router-dom";

//

const MainBox = styled.section`
  padding: 1rem 0;
  margin: 3rem 0;
  @media only screen and (max-width: 949px) {
    margin-top: -4rem;
  }
  width: 100%;
  overflow: hidden;
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
  a {
    color: black;
  }

  @media only screen and (max-width: 649px) {
    grid-template-columns: 1fr;
    justify-items: center;
  }
  @media only screen and (min-width: 649px) and (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Categories = () => {
  const [categoryItems, setCategoryItems] = useState(null);

  useEffect(() => {
    const fetcher = async () => {
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/category/all-category`
      );
      const data = await res.json();
      setCategoryItems(data.categories);
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
        {!categoryItems && <CategoryLoader />}
        <ItemsBox>
          {categoryItems &&
            categoryItems.map((item) => {
              if (counter === 0) {
                counter++;
                return (
                  <Link to={`product-category/${item.title}`}>
                    <CategoryBox
                      key={item.id}
                      item={item}
                      data={
                        window.screen.availWidth > 949
                          ? "fade-up"
                          : "fade-right"
                      }
                    />
                  </Link>
                );
              } else {
                counter--;

                return (
                  <Link to={`product-category/${item.title}`}>
                    <CategoryBox
                      item={item}
                      key={item.id}
                      data={
                        window.screen.availWidth > 949 ? "fade-up" : "fade-left"
                      }
                    />{" "}
                  </Link>
                );
              }
            })}
        </ItemsBox>
      </InnerBox>
    </MainBox>
  );
};

export default Categories;
