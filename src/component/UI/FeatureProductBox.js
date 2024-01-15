import React from "react";
import styled from "styled-components";

const MainBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background-color: #f7f7f7;
  border-radius: 0.4rem;
  padding: 2rem;
  cursor: pointer;
  &:hover {
    transform: scale(1.5);
  }
`;

const ImgBox = styled.div`
  img {
    width: 30rem;
  }
`;

const TextBox = styled.div`
  h4 {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  span {
    display: flex;
    gap: 1rem;
    align-items: center;
    justify-content: center;
  }
`;
const ColorDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1rem 0;
  align-items: center;

  position: relative;
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
  span {
    visibility: hidden;
    position: absolute;
    top: -2rem;
    /* left: 0; */
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
  &:hover {
    span {
      visibility: visible;
    }
  }
`;

const FeatureProductBox = (props) => {
  const { title, img, price, colors } = props.data;
  const titleArr = title.split(" ");
  let counter = 0;

  return (
    <MainBox data-aos="fade-down">
      <ImgBox>
        <img src={img} alt="" />
      </ImgBox>
      <TextBox>
        <h3>{titleArr[0] + " " + titleArr[1]}</h3>
        <h4>₹ {price}</h4>
        <span>
          {colors.map((clr) => {
            if (counter < 3) {
              counter++;
              return (
                <ColorDiv>
                  <span>{clr}</span>
                  <i clr={clr} key={clr} style={{ backgroundColor: clr }}></i>
                </ColorDiv>
              );
            } else {
              return (
                <ColorDiv>
                  <span>more</span>
                  <i
                    clr={clr}
                    key={clr}
                    style={{ backgroundColor: "black", opacity: "0.1" }}
                  ></i>
                </ColorDiv>
              );
            }
          })}
        </span>
      </TextBox>
    </MainBox>
  );
};

export default FeatureProductBox;
