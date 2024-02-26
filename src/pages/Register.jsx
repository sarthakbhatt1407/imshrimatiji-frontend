import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import Navbar from "../component/Header.js/Navbar/Navbar";
import Footer from "../component/Footer/Footer";
import AccountBox from "../component/Login/accountBox";
import { colors } from "../data";
import CompLoader from "../component/Loaders/CompLoader/CompLoader";
import { useNavigate } from "react-router-dom";
import { Alert, Snackbar } from "@mui/material";

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
  grid-template-columns: 1.5fr 2fr;

  @media only screen and (max-width: 700px) {
    /* display: none; */
    grid-template-columns: 1fr;
    width: 90vw;
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
  animation: ${LeftDivAni} 0.6s;
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
    margin: 0 auto;
    border: 1px solid white;
    border-radius: 2rem;
    padding: 1rem 5rem;
    font-size: 1.7rem;
    text-transform: uppercase;
    letter-spacing: 0.1rem;
    font-weight: bold;
  }
  @media only screen and (max-width: 700px) {
    padding: 2rem 1rem;
    gap: 1rem;
    h1 {
      font-size: 3rem;
    }
    p {
      font-size: 1.4rem;
    }
    button {
      padding: 1rem 3rem;
      font-size: 1.4rem;
    }
  }
`;
const RightDiv = styled.div`
  margin: 1rem 0;
  height: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  animation: ${RightDivAni} 0.6s;
  padding: 4rem;
  h2 {
    font-size: 3.2rem;
  }
  @media only screen and (max-width: 700px) {
    padding: 2rem;
  }
`;

const MobileLogin = styled.div`
  display: none;

  @media only screen and (max-width: 700px) {
    /* display: block; */
  }
`;

const EmailVerificationBox = styled.div`
  display: flex;
  width: 90%;
  height: fit-content;
  /* max-height: 36vh; */
  gap: 1rem;
  flex-direction: column;
  align-items: center;
  position: relative;

  p {
    width: 100%;
    color: rgb(221, 57, 57);
    margin-top: -1rem;
    letter-spacing: 0.08rem;
  }
  span {
    cursor: pointer;
  }
`;
const LoaderBox = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  border-radius: 0.6rem;
  z-index: 2;
  background-color: #ebeaea53;
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

const DisabledBtn = styled.button`
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
  background: #dbdbdb;

  &:hover {
    filter: brightness(1.03);
  }
`;

const Register = () => {
  const [emailVer, setEmailVer] = useState(true);
  const [showOtp, setShowOtp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [emailErr, setEmailErr] = useState(false);
  const [nameErr, setNameErr] = useState(false);
  const [mobileErr, setMobileErr] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);
  const [allValid, setAllValid] = useState(false);
  const [otpErr, setOtpErr] = useState(false);
  const [otpText, setOtpText] = useState("");
  const [serverErr, setServerErr] = useState(false);
  const [serverTxt, setServerTxt] = useState("");
  const [resendShow, setResendShow] = useState(false);
  const navigate = useNavigate();

  const [state, setState] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = state;

  const handleClick = (newState) => () => {
    setState({ ...newState, open: true });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  const defaultFields = {
    fullName: "",
    email: "",
    password: "",
    contactNum: "",
    otp: "",
  };
  const [inpFields, setInpFields] = useState(defaultFields);
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const allFieldChecker = (id) => {
    setAllValid(false);
    const fullName = document.querySelector("#fullName").value;
    const email = document.querySelector("#email").value;
    const contactNum = document.querySelector("#contactNum").value;
    const password = document.querySelector("#password").value;
    // if (fullName.length < 4) {
    //   setNameErr(true);
    //   return;
    // }
    // if (!validateEmail(email)) {
    //   setEmailErr(true);
    //   return;
    // }

    // if (contactNum.length < 10) {
    //   setMobileErr(true);
    //   return;
    // }
    // if (password.trim().length < 8) {
    //   setPasswordErr(true);
    //   return;
    // }
    if (
      fullName.length > 4 &&
      validateEmail(email) &&
      contactNum.length === 10 &&
      password.trim().length >= 8
    ) {
      setAllValid(true);
      return;
    }
    return;
  };
  const onBlurHandler = (e) => {
    const id = e.target.id;
    const fullName = document.querySelector("#fullName").value;
    const email = document.querySelector("#email").value;
    const contactNum = document.querySelector("#contactNum").value;
    const password = document.querySelector("#password").value;
    if (id === "fullName" && fullName.length < 4) {
      setNameErr(true);
      return;
    }
    if (id === "email" && !validateEmail(email)) {
      setEmailErr(true);
      return;
    }

    if (id === "contactNum" && contactNum.length < 10) {
      setMobileErr(true);
      return;
    }
    if (id === "password" && password.trim().length < 8) {
      setPasswordErr(true);
      return;
    }

    // allFieldChecker();
  };

  const onChangeHandler = (e) => {
    const id = e.target.id;
    const val = e.target.value;
    allFieldChecker(id);
    if (id === "fullName") {
      setNameErr(false);
    }
    if (id === "email") {
      setServerErr(false);
      setServerTxt("");
      setEmailErr(false);
    }
    if (id === "contactNum") {
      setMobileErr(false);
    }
    if (id === "password") {
      setPasswordErr(false);
    }
    if (id === "otp") {
      setOtpErr(false);
    }
    setInpFields({ ...inpFields, [id]: val });
  };

  const resendOtp = async () => {
    setIsLoading(true);
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
    setIsLoading(false);
  };
  const onSubmitHandler = async () => {
    if (!allValid) {
      return;
    }
    setIsLoading(true);

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
    if (!reslt.ok) {
      setServerErr(true);
      setServerTxt(data.message);
    }
    // alert(data.message);
    console.log(data);
    if (data.sent) {
      const allInp = document.querySelectorAll(".inputField");
      for (const ele of allInp) {
        ele.disabled = true;
      }
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
    if (data.valid === false) {
      setOtpText(data.message);
      setOtpErr(true);
    }
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
      if (resData.success) {
        setState({ ...state, open: true });
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      }
    }
    setIsLoading(false);
  };

  return (
    <>
      <Navbar />
      <Snackbar
        open={open}
        anchorOrigin={{ vertical, horizontal }}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%", top: 0, fontSize: "1.6rem" }}
        >
          Sign up successfull. Kindly login now
        </Alert>
      </Snackbar>
      <OuterBox>
        {" "}
        <MainBox>
          <LeftDiv>
            {/* <img src={logo} alt="" /> */}
            <h1>Welcome Back!</h1>
            <p>
              To keep connected with us please login with your personal info.
            </p>
            <button
              onClick={() => {
                navigate("/login");
              }}
            >
              Sign In
            </button>
          </LeftDiv>
          <RightDiv>
            <h2>Create Account</h2>
            {emailVer && (
              <EmailVerificationBox>
                {isLoading && (
                  <LoaderBox>
                    <CompLoader />
                  </LoaderBox>
                )}
                <Input
                  type="text"
                  name="fullName"
                  id="fullName"
                  className="inputField"
                  placeholder="Full Name"
                  onChange={onChangeHandler}
                  value={inpFields.fullName}
                  onBlur={onBlurHandler}
                  style={{
                    border: `${
                      nameErr
                        ? "1px solid #d72020"
                        : "1px solid rgba(166, 166, 166, 0.3)"
                    }`,
                  }}
                />
                {nameErr && <p>Invalid Name</p>}
                <Input
                  type="text"
                  className="inputField"
                  name="email"
                  id="email"
                  onChange={onChangeHandler}
                  placeholder="Email"
                  onBlur={onBlurHandler}
                  value={inpFields.email}
                  style={{
                    border: `${
                      emailErr
                        ? "1px solid #d72020"
                        : "1px solid rgba(166, 166, 166, 0.3)"
                    }`,
                  }}
                />
                {emailErr && <p>Invalid Email</p>}
                <Input
                  type="number"
                  name=""
                  className="inputField"
                  id="contactNum"
                  onBlur={onBlurHandler}
                  onChange={onChangeHandler}
                  placeholder="Mobile number"
                  value={inpFields.contactNum}
                  style={{
                    border: `${
                      mobileErr
                        ? "1px solid #d72020"
                        : "1px solid rgba(166, 166, 166, 0.3)"
                    }`,
                  }}
                />{" "}
                {mobileErr && <p>Invalid Contact Number</p>}
                <Input
                  type="password"
                  name=""
                  className="inputField"
                  id="password"
                  onBlur={onBlurHandler}
                  value={inpFields.password}
                  onChange={onChangeHandler}
                  placeholder="Password"
                  style={{
                    border: `${
                      passwordErr
                        ? "1px solid #d72020"
                        : "1px solid rgba(166, 166, 166, 0.3)"
                    }`,
                  }}
                />{" "}
                {passwordErr && (
                  <p>Password is too short (minimun 8 charcters.)</p>
                )}
                {serverErr && <p>{serverTxt}</p>}
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
                      style={{
                        border: `${
                          otpErr
                            ? "1px solid #d72020"
                            : "1px solid rgba(166, 166, 166, 0.3)"
                        }`,
                      }}
                    />
                    {otpErr && <p>{otpText}</p>}
                    <span data-aos="zoom-in" onClick={resendOtp}>
                      Resend OTP
                    </span>
                  </>
                )}
                {showOtp && (
                  <SubmitButton onClick={otpVerifier}>Submit</SubmitButton>
                )}
                {!showOtp && allValid && (
                  <SubmitButton onClick={onSubmitHandler}>Submit</SubmitButton>
                )}
                {!showOtp && !allValid && <DisabledBtn>Submit</DisabledBtn>}
              </EmailVerificationBox>
            )}
          </RightDiv>
        </MainBox>
      </OuterBox>
      <Footer />
    </>
  );
};

export default Register;
