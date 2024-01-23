import React from "react";
import styled, { keyframes } from "styled-components";

const FloatingAni = keyframes`
0%{
    opacity: .6;
    transform: translateY(100px);
}
50%{
    opacity: 1;
    transform: translateY(100px);
}


100%{
    opacity: 0;
    transform: translateY(0);

}

`;

const MobileAni = keyframes`
0%{
    opacity: .6;
    transform: translateX(-10px);
}
50%{
    opacity: 1;
    transform: translateX(-10px);
}


100%{
    opacity: 0;
    transform: translateX(200px);

}
`;

const MainBox = styled.div`
  position: absolute;
  /* top: 5%; */
  left: 50%;
  transform: translateX(-50%);
  z-index: 3;
  background-color: black;
  color: white;
  border-radius: 1rem;
  padding: 1rem 2rem;
  font-size: 1.8rem;
  opacity: 0;
  animation: ${FloatingAni} 2s ease-out;
  letter-spacing: 0.09rem;
  @media only screen and (max-width: 449px) {
    animation: ${MobileAni} 2s ease-out;
    right: 0%;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 11.5%;
    padding: 1rem;
    font-size: 1.5rem;
  }
  @media only screen and (min-width: 450px) and (max-width: 949px) {
    animation: ${MobileAni} 2s ease-out;
    right: 0%;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 9.6%;
    padding: 1rem;
    font-size: 1.5rem;
  }
`;

const FloatingBox = (props) => {
  return <MainBox>{props.data}</MainBox>;
};

export default FloatingBox;
