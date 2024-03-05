import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

const OuterBox = styled.div`
  position: relative;
`;

const MainBox = styled.div`
  width: 100%;
  height: 80%;
  margin: auto;
  position: relative;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  background-color: #f7f7f7;
  @media (max-width: 450px) {
    width: 100%;
    height: 40vh;
  }
  @media only screen and (min-width: 451px) and (max-width: 1020px) {
    height: 35vh;
  }
`;

const ImgBox = styled.div`
  background-image: url(${(props) => props.img});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;
  position: absolute;
  transition: all 0.8s;
`;
const ArrowLeft = styled.button`
  text-align: center;
  border: none;
  background-color: #3d3d3d96;

  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  position: absolute;
  top: 37%;
  left: 0.5%;
  font-size: 1.5rem;
  color: white;
  svg {
    transform: scale(1.5);
  }
`;
const ArrowRight = styled.button`
  text-align: center;
  border: none;
  background-color: #3d3d3d96;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  color: white;
  position: absolute;
  right: 0.5%;
  font-size: 1.5rem;
  top: 37%;
  svg {
    transform: scale(1.5);
  }
`;

const ImagesSlider = (props) => {
  const product = props.product;
  const [imgSlides, setImgSlides] = useState([]);
  const images = props.product.images;
  const ImgArr = images.split(" ");
  ImgArr.pop();

  useEffect(() => {
    setImgSlides(ImgArr);
    return () => {};
  }, [product]);

  const imageLeft = () => {
    const images = document.querySelectorAll(".image");

    images.forEach((slide, ind) => {
      slide.style.left = `${ind * 100}%`;
    });
  };
  setTimeout(() => {
    imageLeft();
  }, 1);
  const slider = () => {
    const images = document.querySelectorAll(".image");
    images.forEach((slide) => {
      slide.style.transform = `translateX(-${current * 100}%)`;
    });
  };
  let current = 0;
  const prev = () => {
    const images = document.querySelectorAll(".image");
    if (current > 0) {
      current--;
      slider();
    } else {
      current = images.length - 1;
      slider();
    }
  };

  const next = () => {
    const images = document.querySelectorAll(".image");

    if (current < images.length - 1) {
      current++;
      slider();
    } else {
      current = 0;
      slider();
    }
  };
  return (
    <OuterBox>
      {/* data-aos="fade-right" */}
      <MainBox>
        {imgSlides.map((item) => {
          return <ImgBox key={item} img={item} className="image"></ImgBox>;
        })}
      </MainBox>
      <ArrowLeft onClick={prev}>
        <ChevronLeft />
      </ArrowLeft>
      <ArrowRight onClick={next}>
        <ChevronRight />
      </ArrowRight>
    </OuterBox>
  );
};

export default ImagesSlider;
