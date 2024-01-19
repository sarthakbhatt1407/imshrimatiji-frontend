import React, { useEffect } from "react";
import styled from "styled-components";
import login from "../assets/images/background/login.png";
import AccountBox from "../component/Login/accountBox/index.jsx";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const MainBox = styled.div`
  background: url(${login});
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  @media only screen and (max-width: 900px) {
    background: white;
  }
`;

const MobileLogin = styled.div`
  position: absolute;
  top: 10%;
  left: 10%;
  @media only screen and (min-width: 900px) and (max-width: 1149px) {
    left: 7%;
    transform: scale(0.9);
  }
  @media only screen and (max-width: 900px) {
    position: static;
    display: block;
  }
`;

const PcLogin = styled.div`
  /* transform: scale(1.1); */
  position: absolute;
  top: 10%;
  left: 10%;
  @media only screen and (max-width: 900px) {
    display: none;
  }
  @media only screen and (min-width: 900px) and (max-width: 1149px) {
    left: 7%;
    transform: scale(0.9);
  }
`;

const Login = () => {
  return (
    <MainBox>
      <MobileLogin>
        <AccountBox />
      </MobileLogin>
    </MainBox>
  );
};

export default Login;
