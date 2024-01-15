import React from "react";
import styled from "styled-components";

// images
import saree from "../../assets/images/category/saree.png";
import kurti from "../../assets/images/category/kurti.png";
import frock from "../../assets/images/category/frock.png";
import suit from "../../assets/images/category/suit.png";
import SectionHeading from "../UI/SectionHeading";

//

const MainBox = styled.section`
  padding: 1rem 0;
  margin: 3rem 0;
  @media only screen and (max-width: 949px) {
    margin-top: -4rem;
    overflow-x: hidden;
  }
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
  const categoryItems = [
    {
      title: "saree",
      img: saree,
      ani: window.screen.availWidth > 949 ? "fade-up" : "fade-right",
    },
    {
      title: "kurti",
      img: kurti,
      ani: window.screen.availWidth > 949 ? "fade-up" : "fade-left",
    },
    {
      title: "frock",
      img: frock,
      ani: window.screen.availWidth > 949 ? "fade-up" : "fade-right",
    },
    {
      title: "suit",
      img: suit,
      ani: window.screen.availWidth > 949 ? "fade-up" : "fade-left",
    },
  ];

  return (
    <MainBox>
      <InnerBox>
        <SectionHeading
          data={{ main: "Shop by category", secondary: "Shop by category" }}
        />
        <ItemsBox>
          {categoryItems.map((item) => {
            return (
              <CategoryBox
                key={item.title}
                data-aos={item.ani}
                data-aos-once="true"
              >
                <img src={item.img} alt="" />
                <span>
                  <b>{item.title}</b>
                  <i>6 Products</i>
                </span>
              </CategoryBox>
            );
          })}
        </ItemsBox>
      </InnerBox>
    </MainBox>
  );
};

export default Categories;
