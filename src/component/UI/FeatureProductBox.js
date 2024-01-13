import React from "react";
import styled from "styled-components";

const MainBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background-color: #f7f7f7;
  border-radius: 0.4rem;
  padding: 1rem;
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
`;

const FeatureProductBox = (props) => {
  const { title, img, price, colors } = props.data;
  console.log(img);
  return (
    <MainBox data-aos="fade-down">
      <ImgBox>
        <img src={img} alt="" />
      </ImgBox>
      <TextBox>
        <h3>{title}</h3>
        <h4>₹ {price}</h4>
        <span>
          {colors.map((clr) => {
            return <i></i>;
          })}
        </span>
      </TextBox>
    </MainBox>
  );
};

export default FeatureProductBox;
