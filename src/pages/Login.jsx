import React from "react";
import styled from "styled-components";
import login from "../assets/images/background/login.png";
import AccountBox from "../component/Login/accountBox/index.jsx";
import Navbar from "../component/Header.js/Navbar/Navbar.jsx";
const MainBox = styled.div`
  background: url(${login});
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  height: 93vh;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;

  @media only screen and (max-width: 949px) {
    background: white;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
const EmptyDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PcEmptyLogin = styled.div`
  /* background-color: red; */
`;

const Login = () => {
  return (
    <>
      <Navbar />
      <MainBox>
        <EmptyDiv>
          <AccountBox />
        </EmptyDiv>
        <PcEmptyLogin></PcEmptyLogin>
      </MainBox>
    </>
  );
};

export default Login;
