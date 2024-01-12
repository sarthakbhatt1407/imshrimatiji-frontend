import React from "react";
import styled from "styled-components";
import login from "../assets/images/background/login.png";
import logo from "../assets/images/logo/logo-white.png";
import { colors } from "../data.js";
import AccountBox from "../component/Login/accountBox/index.jsx";
const MainBox = styled.div`
  background: url(${login});
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MobileLogin = styled.div`
  display: none;
  @media only screen and (max-width: 900px) {
    display: block;
  }
`;

const PcLogin = styled.div`
  width: 30vw;
  height: 70vh;
  position: absolute;
  top: 12%;
  left: 13%;
  border-radius: 1rem;
  box-shadow: 0.2rem 0.2rem 1rem #d4d4d4;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  padding: 2rem 3rem;

  img {
    width: 25%;
  }
  span {
    margin-bottom: -3.5rem;
    color: #bcbcbc;
  }
  h2 {
    color: black;
    font-weight: bold;
    letter-spacing: 0.09rem;
    font-size: 3.5rem;
  }
  p {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.6rem;
    span {
      margin: 0;
      color: #d0d0d0;
      letter-spacing: 0.09rem;
      &:not(:first-child) {
        color: ${colors.mainColor};
      }
    }
  }

  @media only screen and (max-width: 900px) {
    display: none;
  }
`;
const LabelInpDiv = styled.div`
  display: flex;
  flex-direction: column;
`;
const Label = styled.label`
  color: #9e9e9e;
  letter-spacing: 0.09rem;
  display: flex;
  font-size: 1.3rem;
  justify-content: space-between;
  align-items: center;
  span {
    margin: 0;
    &:not(:first-child) {
      color: #b8b8b8;
      font-size: 1rem;
    }
  }
`;

const Input = styled.input`
  padding: 0.6rem 2rem;
  border: 1px solid #e8e8e8;
  border-radius: 0.3rem;
  box-shadow: 0.1rem 0.2rem 0.5rem #eaeaea;
`;

const ButtonDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  button {
    border: none;
    background-color: ${colors.mainColor};
    color: white;
    padding: 0.9rem 4rem;
    border-radius: 2rem;
    font-size: 1.6rem;
    letter-spacing: 0.09rem;
    text-transform: uppercase;
  }
`;

const Login = () => {
  return (
    <MainBox>
      <MobileLogin>
        <AccountBox />
      </MobileLogin>
      <PcLogin>
        <img src={logo} alt="" />
        <span>Welcome back !!!</span>
        <h2>Sign in</h2>
        <LabelInpDiv>
          <Label>Email</Label>
          <Input type="text" />
        </LabelInpDiv>
        <LabelInpDiv>
          <Label>
            <span>Password</span>
            <span>Forgot Password?</span>
          </Label>
          <Input type="text" />
        </LabelInpDiv>
        <ButtonDiv>
          <button>Sign in</button>
        </ButtonDiv>
        <p>
          <span>I dont have and account? </span>
          <span> Sign up</span>
        </p>
      </PcLogin>
    </MainBox>
  );
};

export default Login;
