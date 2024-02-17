import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import Navbar from "../component/Header.js/Navbar/Navbar";
import Footer from "../component/Footer/Footer";
import AccountBox from "../component/Login/accountBox";
import { colors } from "../data";
import CompLoader from "../component/Loaders/CompLoader/CompLoader";

const OuterBox = styled.div`
  background-color: #f7f7f7;
  height: 93vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MainBox = styled.div`
  background-color: white;
  width: 60vw;
  box-shadow: 0.1rem 0.1rem 2rem rgba(161, 161, 161, 0.28);
  border-radius: 0.8rem;
  overflow: hidden;
  height: fit-content;
  display: grid;
  grid-template-columns: 1fr 1fr;
  @media only screen and (max-width: 700px) {
    display: none;
  }
`;

const LeftDivAni = keyframes`
    0%{  transform: translateX(100%);
        z-index: 100;
        opacity: 0;

    }
    100%{
        transform: translateX(0);
        opacity: 1; z-index: 1;
    }
`;
const RightDivAni = keyframes`
    
    0%{    transform: translateX(-50%);
        z-index: -1;
        opacity: 0;

    }
    30%{
        z-index: -1;
    }
    100%{
        transform: translateX(0);
        opacity: 1;
        z-index: 1;
    }
`;
const LeftDiv = styled.div`
  clip-path: circle(70.8% at 28% 50%);

  background: rgb(186, 68, 94);
  background: linear-gradient(
    126deg,
    rgba(186, 68, 94, 1) 0%,
    rgba(186, 68, 94, 1) 45%,
    rgba(186, 68, 94, 0.7763480392156863) 100%
  );
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  color: white;
  padding: 0 4rem;
  transition: all 1s;
  animation: ${LeftDivAni} 1s;
  word-wrap: break-word;
  h1 {
    letter-spacing: 0.09rem;
    font-weight: bold;
  }
  p {
    font-size: 1.6rem;
    font-size: 400;
    letter-spacing: 0.09rem;
    text-align: center;
  }
  button {
    background-color: transparent;
    border: 1px solid white;
    border-radius: 2rem;
    padding: 1rem 5rem;
    font-size: 1.7rem;
    text-transform: uppercase;
    letter-spacing: 0.1rem;
    font-weight: bold;
  }
`;
const RightDiv = styled.div`
  margin: 1rem 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  animation: ${RightDivAni} 1s;
  padding: 4rem;
  h2 {
    font-size: 3.2rem;
  }
`;

const MobileLogin = styled.div`
  display: none;

  @media only screen and (max-width: 700px) {
    display: block;
  }
`;

const EmailVerificationBox = styled.div`
  display: flex;
  width: 60%;
  gap: 1rem;
  flex-direction: column;
  align-items: center;
  p {
    width: 100%;
    color: rgb(221, 57, 57);
    margin-top: -2rem;
  }
`;

const Input = styled.input`
  width: 100%;
  height: 42px;
  outline: none;
  border: 1px solid rgba(166, 166, 166, 0.3);
  border-radius: 5px;
  padding: 0px 10px;
  transition: all 200ms ease-in-out;
  margin-bottom: 5px;

  &::placeholder {
    color: rgba(200, 200, 200, 1);
  }

  &:focus {
    outline: none;
    border-bottom: 1px solid ${colors.mainColor};
  }
`;
const SubmitButton = styled.button`
  width: 100%;
  max-width: 150px;
  padding: 10px;
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  border: none;
  border-radius: 100px;
  cursor: pointer;
  transition: all 240ms ease-in-out;
  background: linear-gradient(
    58deg,
    ${colors.mainColor} 20%,
    ${colors.mainColor} 100%
  );

  &:hover {
    filter: brightness(1.03);
  }
`;
const Register = () => {
  const [emailVer, setEmailVer] = useState(true);
  const [showOtp, setShowOtp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const defaultFields = {
    fullName: "",
    email: "",
    password: "",
    contactNum: "",
    otp: "",
  };
  const [inpFields, setInpFields] = useState(defaultFields);

  const onChangeHandler = (e) => {
    const id = e.target.id;
    const val = e.target.value;
    setInpFields({ ...inpFields, [id]: val });
  };
  const onSubmitHandler = async () => {
    setIsLoading(true);
    const allInp = document.querySelectorAll(".inputField");
    for (const ele of allInp) {
      ele.disabled = true;
    }
    console.log(inpFields);
    const reslt = await fetch(
      `${process.env.REACT_APP_BASE_URL}/user/send-email`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: inpFields.email,
        }),
      }
    );
    const data = await reslt.json();
    // alert(data.message);
    console.log(data);
    if (data.sent) {
      setShowOtp(true);
    }
    setIsLoading(false);
  };

  const otpVerifier = async () => {
    setIsLoading(true);
    const reslt = await fetch(
      `${process.env.REACT_APP_BASE_URL}/user/verify-otp`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          otpInp: Number(inpFields.otp),
          email: inpFields.email,
        }),
      }
    );
    const data = await reslt.json();
    // alert(data.message);
    console.log(data);
    if (data.valid) {
      const res = await fetch(`${process.env.REACT_APP_BASE_URL}/user/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: inpFields.fullName,
          email: inpFields.email,
          password: inpFields.password,
          contactNum: inpFields.contactNum,
        }),
      });
      const resData = await res.json();
      console.log(resData);
    }
    setIsLoading(false);
  };

  return (
    <>
      <Navbar />
      <OuterBox>
        <MainBox>
          <LeftDiv>
            {/* <img src={logo} alt="" /> */}
            <h1>Welcome Back!</h1>
            <p>
              To keep connected with us please login with your personal info.
            </p>
            <button>Sign In</button>
          </LeftDiv>
          <RightDiv>
            <h2>Create Account</h2>
            {emailVer && (
              <EmailVerificationBox>
                <Input
                  type="text"
                  name="fullName"
                  id="fullName"
                  className="inputField"
                  placeholder="Full Name"
                  onChange={onChangeHandler}
                  value={inpFields.fullName}
                />

                <Input
                  type="text"
                  className="inputField"
                  name="email"
                  id="email"
                  onChange={onChangeHandler}
                  placeholder="Email"
                  value={inpFields.email}
                />
                {/* <p>Invalid Name</p> */}
                <Input
                  type="number"
                  name=""
                  className="inputField"
                  id="contactNum"
                  onChange={onChangeHandler}
                  placeholder="Mobile number"
                  value={inpFields.contactNum}
                />
                <Input
                  type="password"
                  name=""
                  className="inputField"
                  id="password"
                  value={inpFields.password}
                  onChange={onChangeHandler}
                  placeholder="Password"
                />

                {showOtp && (
                  <>
                    <Input
                      type="text"
                      name=""
                      id="otp"
                      onChange={onChangeHandler}
                      placeholder="Enter one time password"
                      data-aos="zoom-in"
                      value={inpFields.otp}
                    />
                    <span data-aos="zoom-in">Resend OTP</span>
                  </>
                )}

                {showOtp && (
                  <SubmitButton onClick={otpVerifier}>Submit</SubmitButton>
                )}
                {!showOtp && (
                  <SubmitButton onClick={onSubmitHandler}>
                    {isLoading && <CompLoader />}
                    {!isLoading && "Submit"}
                  </SubmitButton>
                )}
              </EmailVerificationBox>
            )}
          </RightDiv>
        </MainBox>
        <MobileLogin>
          <AccountBox />
        </MobileLogin>
      </OuterBox>
      <Footer />
    </>
  );
};

export default Register;
