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
    gap: 1rem;
    span {
      /* animation: ${SpanAni} 1s cubic-bezier(0.55, 0.085, 0.68, 0.53) both; */
      width: 100%;
    }
  }
  button {
    width: 13rem;
    background-color: black;
    color: white;
    border-radius: 0.7rem;
    padding: 0.8rem 1.2rem;
    font-weight: bold;
    letter-spacing: 0.26rem;
    margin: 1rem 0;
    border: none;
    outline: none;
    text-transform: uppercase;
    /* animation: ${ButtonAni} 1.3s cubic-bezier(0.39, 0.575, 0.565, 1) both; */
    @media only screen and (max-width: 949px) {
      letter-spacing: 0.1rem;
      padding: 0.8rem 0.7rem;
    }
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
    /* background-color: yellow; */
    align-items: center;
    margin-top: -25rem;
    div {
      width: 100%;
      display: flex;
      gap: 1rem;
      align-items: center;
      span {
        text-align: center;
      }
    }
  }
`;

const DiscountSpan = styled.span`
  font-size: 6rem;
  margin-top: -0.5rem;
  font-weight: bold;

  @media only screen and (max-width: 949px) {
    font-size: 5rem;
    width: 100%;
    letter-spacing: 0.5rem;
  }
`;

const EventSpan = styled.span`
  font-size: 1.8rem;
  font-weight: 200;
  @media only screen and (max-width: 949px) {
    font-size: 2rem;
    letter-spacing: 0.2rem;
    font-weight: 400;
  }
`;
const AddiSpan = styled.span`
  font-size: 1.8rem;
  text-transform: capitalize;
  font-size: 500;
  @media only screen and (max-width: 949px) {
    font-size: 2rem;
    font-weight: 400;
    letter-spacing: 0.2rem;
  }
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
                  <EventSpan data-aos="fade-right">
                    {headerInfo.event}
                  </EventSpan>
                  <DiscountSpan data-aos="fade-left">
                    {headerInfo.discount}
                  </DiscountSpan>
                  <AddiSpan data-aos="fade-right">
                    {headerInfo.additional}
                  </AddiSpan>
                  <button data-aos="fade-in">Shop Now</button>
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
