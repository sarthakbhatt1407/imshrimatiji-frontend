import React from "react";
import styled from "styled-components";
import { EnvVariables } from "../../data";
import AOS from "aos";

const CategoryBoxDiv = styled.div`
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

const CategoryBox = (props) => {
  AOS.refresh();
  const { title, image } = props.item;
  const data = props.data;

  return (
    <CategoryBoxDiv data-aos={`${data}`}>
      <img src={`${EnvVariables.BASE_URL}/${image}`} alt="" />
      <span>
        <b>{title}</b>
        <i>6 Products</i>
      </span>
    </CategoryBoxDiv>
  );
};

export default CategoryBox;
