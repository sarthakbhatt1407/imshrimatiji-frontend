import React from "react";
import styled, { keyframes } from "styled-components";
const MainBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: fit-content;
`;

const Animation = keyframes`
100% {
      background-position: right -50px top 0;
    }
`;

const Loader = styled.div`
  width: 93vw;
  height: 45rem;
  background: linear-gradient(90deg, #0000, #f7f7f7) left -50px top 0/100px 45rem
    no-repeat #fefefe;
  animation: ${Animation} 1s infinite linear;
`;
const CategoryLoader = () => {
  return (
    <MainBox>
      <Loader></Loader>
    </MainBox>
  );
};

export default CategoryLoader;
