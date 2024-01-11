import React from "react";
import styled from "styled-components";

// images
import saree from "../../assets/images/category/saree.png";
import kurti from "../../assets/images/category/kurti.png";
import frock from "../../assets/images/category/frock.png";
import suit from "../../assets/images/category/suit.png";

//

const MainBox = styled.section`
  padding: 1rem 0;
  margin: 3rem 0;
  @media only screen and (max-width: 949px) {
    margin-top: -4rem;
  }
`;

const InnerBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

const TextBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  h1 {
    margin-top: 0.1rem;
    font-weight: bold;
    font-size: 4rem;
    letter-spacing: 0.1rem;
  }
  span {
    font-size: 1.2rem;
    letter-spacing: 0.2rem;
    color: #676767;
  }
`;

const ItemsBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  justify-items: center;
  padding: 0 2rem;
  gap: 2rem;
  @media only screen and (max-width: 949px) {
    grid-template-columns: 1fr;
    justify-items: center;
  }
`;

const CategoryBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f7f7f7;
  position: relative;
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
    { title: "saree", img: saree },
    { title: "kurti", img: kurti },
    { title: "frock", img: frock },
    { title: "suit", img: suit },
  ];
  return (
    <MainBox>
      <InnerBox>
        <TextBox>
          <span>Shop by category</span>
          <h1>Shop by category</h1>
        </TextBox>
        <ItemsBox>
          {categoryItems.map((item) => {
            return (
              <>
                <CategoryBox>
                  <img src={item.img} alt="" />
                  <span>
                    <b>{item.title}</b>
                    <i>6 Products</i>
                  </span>
                </CategoryBox>
              </>
            );
          })}
        </ItemsBox>
      </InnerBox>
    </MainBox>
  );
};

export default Categories;
