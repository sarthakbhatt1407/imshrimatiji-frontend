import React from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import slide1 from "../../../assets/images/slider-image/1.webp";

const SliderBox = styled.div`
  position: relative;
`;

const MainBox = styled.div`
  position: relative;
  width: 100%;
  height: 88vh;
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
    gap: 1rem;
    span {
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
    align-items: center;
    margin-top: -2rem;
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
  const navigate = useNavigate();
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
                  <Link to={`/product-category/all-products`}>
                    <button data-aos="fade-in" onClick={() => {}}>
                      Shop Now
                    </button>
                  </Link>
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
