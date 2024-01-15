import React from "react";
import Navbar from "./Navbar/Navbar";
import Slider from "./Slider/Slider";
import styled from "styled-components";
import bg from "../../assets/images/background/bg.jpg";

// CSS
const MainHeader = styled.header`
  width: 100%;
  height: 90vh;
  overflow: hidden;
  position: relative;
  &::before {
    background: url(${(props) => props.bg});
    background-size: cover;
    background-position: left;
    background-repeat: no-repeat;
    content: "";
    position: absolute;
    width: 133%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: -1;
    opacity: 0.75;
    @media only screen and (max-width: 949px) {
      width: 100%;
      background-position: center;
      height: 93vh;
      opacity: 0.6;
    }
  }
  @media only screen and (max-width: 949px) {
    height: 100vh;
    margin-bottom: 1rem;
  }
`;

const Header = () => {
  return (
    <MainHeader data-aos="fade-in" bg={bg}>
      <Navbar />
      <Slider />
    </MainHeader>
  );
};

export default Header;
