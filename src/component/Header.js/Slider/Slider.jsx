import React from "react";
import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";
import slide1 from "../../../assets/images/slider-image/1.webp";

const SliderBox = styled.div`
  position: relative;
`;

const MainBox = styled.div`
  position: relative;
  width: 100%;
  height: 78.5vh;
  overflow: hidden;
  margin: auto;

  @media only screen and (max-width: 949px) {
    overflow: visible;
  }
`;

const SlideBox = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  transition: all 1s;
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  justify-content: center;
  align-items: center;
  @media only screen and (max-width: 949px) {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 90vh;
    div {
    }
  }
`;

const ButtonAni = keyframes`
    0% {
    opacity: 0;
  }
    70% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }

`;
const SpanAni = keyframes`
  0% {
    -webkit-filter: blur(12px);
            filter: blur(12px);
    opacity: 0;
  }
  100% {
    -webkit-filter: blur(0px);
            filter: blur(0px);
    opacity: 1;
  }


`;

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  span {
    color: black;
  }
  div {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    span {
      animation: ${SpanAni} 1s cubic-bezier(0.55, 0.085, 0.68, 0.53) both;
      width: 100%;
    }
  }
  button {
    width: 10rem;
    background-color: black;
    color: white;
    border-radius: 0.3rem;
    padding: 0.8rem 0.9rem;
    font-weight: bold;
    letter-spacing: 0.2rem;
    margin: 1rem 0;
    border: none;
    outline: none;
    text-transform: uppercase;
    animation: ${ButtonAni} 1.3s cubic-bezier(0.39, 0.575, 0.565, 1) both;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0.3rem 0.3rem 0.4rem #5e5d5d;
    }
    &:active {
      transform: translateY(0);
      box-shadow: 0.1rem 0.1rem 0.4rem #5e5d5d;
    }
  }

  @media only screen and (max-width: 949px) {
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: -12rem;
    div {
      display: flex;
      justify-content: center;
    }
  }
`;

const DiscountSpan = styled.span`
  font-size: 4rem;
  margin-top: -0.5rem;
  font-weight: bold;

  @media only screen and (max-width: 949px) {
    font-size: 3rem;
  }
`;

const EventSpan = styled.span`
  font-size: 1rem;
  font-weight: 200;
`;
const AddiSpan = styled.span`
  font-size: 1.3rem;
  text-transform: capitalize;
  font-size: 500;
`;

const Slider = () => {
  const headerInfo = {
    event: "Republic Day Sale",
    discount: "Up to 50% off",
    additional: "Limited Stocks",
    img: slide1,
    id: "1",
  };

  return (
    <>
      <SliderBox>
        <MainBox>
          <Link to={`/`}>
            <SlideBox className="slide">
              <TextBox>
                <div>
                  <EventSpan>{headerInfo.event}</EventSpan>
                  <DiscountSpan>{headerInfo.discount}</DiscountSpan>
                  <AddiSpan>{headerInfo.additional}</AddiSpan>
                  <button>Shop Now</button>
                </div>
              </TextBox>
            </SlideBox>
          </Link>
        </MainBox>
      </SliderBox>
    </>
  );
};

export default Slider;
