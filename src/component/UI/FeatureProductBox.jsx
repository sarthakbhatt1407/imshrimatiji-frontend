import React from "react";
import styled from "styled-components";

const MainBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: #f7f7f7;
  border-radius: 0.4rem;
  height: 20vh;
  padding: 2rem;
  height: fit-content;
  cursor: pointer;
  &:hover {
    img {
      transform: scale(1.05);
    }
  }
  @media only screen and (max-width: 949px) {
    padding: 2rem 2rem;
    width: 100%;

    &:hover {
      transform: scale(1);
    }
  }
`;

const ImgBox = styled.div`
  img {
    transition: all 0.5s;
    width: 29rem;
    height: 38rem;
    border-radius: 0.5rem;
    @media only screen and (max-width: 949px) {
      width: 26rem;
      height: 35rem;
    }
  }
`;

const TextBox = styled.div`
  color: #3a3a3a;
  text-transform: capitalize;

  h3 {
    font-size: 2rem;
    font-weight: 600;
  }
  h5 {
    display: flex;
    font-size: 1.6rem;
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

const FeatureProductBox = (props) => {
  const { title, img, price } = props.data;
  const titleArr = title.split(" ");

  return (
    <MainBox data-aos="fade-up">
      <ImgBox>
        <img src={img} alt="" />
      </ImgBox>
      <TextBox>
        <h3>
          {titleArr[0] || ""} {}
          {titleArr[1] || ""}
        </h3>
        <h5>₹ {Number(price).toLocaleString("en-IN")}</h5>
        {/* <span>
          {colors.map((clr) => {
            if (counter <= 2) {
              counter++;
              if (counter === 2) {
                fireCounter = true;
              }
              return (
                <ColorDiv key={id + clr}>
                  <span>{clr}</span>

                  <i clr={clr} key={clr} style={{ backgroundColor: clr }}></i>
                </ColorDiv>
              );
            }
            if (counter === 3 && fireCounter) {
              fireCounter = false;
              return (
                <ColorDiv key={id + "more"}>
                  <span>more</span>
                  <i
                    clr={clr}
                    key={clr}
                    style={{ backgroundColor: "black", opacity: "0.1" }}
                  ></i>
                </ColorDiv>
              );
            }
            return <></>;
          })}
        </span> */}
      </TextBox>
    </MainBox>
  );
};

export default FeatureProductBox;
