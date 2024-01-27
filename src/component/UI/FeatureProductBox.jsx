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
    /* transform: scale(1.5); */
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
    width: 32rem;
    height: 38rem;
    border-radius: 0.5rem;
    @media only screen and (max-width: 949px) {
      width: 26rem;
      height: 33rem;
    }
  }
`;

const TextBox = styled.div`
  color: black;
  text-transform: capitalize;

  h5 {
    display: flex;
    font-size: 1.8rem;
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
    <MainBox>
      <ImgBox>
        <img src={`${process.env.REACT_APP_BASE_URL}/${img}`} alt="" />
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
