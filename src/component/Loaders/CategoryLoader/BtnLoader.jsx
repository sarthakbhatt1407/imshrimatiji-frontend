import React from "react";
import styled, { keyframes } from "styled-components";

const ballX = keyframes`
0%,25%,50%,75%, 100%  {background-position: 25% 0,75% 0}
  40%     {background-position: 25% 0,85% 0}
  90%     {background-position: 15% 0,75% 0}
`;
const moveX = keyframes`
 100% {transform:translate(0.15px)}
`;

const MainBox = styled.div`
  width: 24rem;
  border-radius: 0.4rem;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 3;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ececec68;
  border: none;
`;

const LoaderBox = styled.div`
  width: 108px;
  height: 16px;
  background: radial-gradient(
      circle 6px at 6px center,
      black 100%,
      transparent 0
    ),
    radial-gradient(circle 6px at 6px center, black 100%, transparent 0);
  background-size: 16px 16px;
  background-repeat: no-repeat;
  position: relative;
  animation: ${ballX} 1s linear infinite;
  &::before {
    content: "";
    position: absolute;
    width: 13px;
    height: 13px;
    border-radius: 50%;
    background: black;
    inset: 0;
    margin: auto;
    animation: ${moveX} 1s cubic-bezier(0.5, 300, 0.5, -300) infinite;
  }
`;

const BtnLoader = () => {
  return (
    <MainBox>
      <LoaderBox></LoaderBox>
    </MainBox>
  );
};

export default BtnLoader;
