import React from "react";
import styled from "styled-components";
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
    button {
      width: 40%;
      background-color: black;
      color: white;
      border-radius: 0.3rem;
      padding: 0.8rem 0.9rem;
      font-weight: bold;
      letter-spacing: 0.2rem;
      margin: 1rem 0;
      transition: all 0.5s;
      border: none;
      outline: none;
      text-transform: uppercase;
      &:hover {
        transform: translateY(-5px);
        box-shadow: 0.3rem 0.3rem 0.4rem #5e5d5d;
      }
      &:active {
        transform: translateY(0);
        box-shadow: 0.1rem 0.1rem 0.4rem #5e5d5d;
      }
    }
  }
  @media only screen and (max-width: 949px) {
    display: flex;
    justify-content: center;
    align-items: center;
    div {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`;
const DiscountSpan = styled.span`
  font-size: 4rem;
  margin-top: -0.5rem;
  font-weight: bold;
`;
const EventSpan = styled.span`
  font-size: 1rem;
  font-weight: 200;
  letter-spacing: 0.3rem;
`;
const AddiSpan = styled.span`
  font-size: 1.3rem;
  text-transform: capitalize;
  font-size: 500;
  letter-spacing: 0.09rem;
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
