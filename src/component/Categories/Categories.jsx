import React, { useEffect, useState } from "react";
import styled from "styled-components";

// images
import SectionHeading from "../UI/SectionHeading";
import { EnvVariables } from "../../data";
import CategoryLoader from "../Loaders/CategoryLoader/CategoryLoader";
import CategoryBox from "../UI/CategoryBox";

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
      const res = await fetch(`${EnvVariables.BASE_URL}/category/all-category`);
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
        <ItemsBox>
          {!categoryItems && <CategoryLoader />}
          {categoryItems &&
            categoryItems.map((item) => {
              if (counter === 0) {
                counter++;
                return (
                  <CategoryBox
                    item={item}
                    data={
                      window.screen.availWidth > 949 ? "fade-up" : "fade-right"
                    }
                  />
                );
              } else {
                counter--;

                return (
                  <CategoryBox
                    item={item}
                    data={
                      window.screen.availWidth > 949 ? "fade-up" : "fade-left"
                    }
                  />
                );
              }
            })}
        </ItemsBox>
      </InnerBox>
    </MainBox>
  );
};

export default Categories;
