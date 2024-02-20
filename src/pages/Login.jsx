import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import Navbar from "../component/Header.js/Navbar/Navbar";
import Footer from "../component/Footer/Footer";
import { colors } from "../data";
import CompLoader from "../component/Loaders/CompLoader/CompLoader";
import { useNavigate } from "react-router-dom";
import { Alert, Snackbar } from "@mui/material";
import { useDispatch } from "react-redux";

const OuterBox = styled.div`
  background-color: #f7f7f7;
  height: 93vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MainBox = styled.div`
  background-color: white;
  width: 55vw;
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  animation: ${RightDivAni} 1s;
  padding: 4rem;
  h2 {
    font-size: 3.2rem;
  }
  h3 {
    color: #cacaca;
    font-size: 1.6rem;
    text-align: center;
    font-weight: 400;
  }
  @media only screen and (max-width: 700px) {
    padding: 2rem;
  }
`;

const EmailVerificationBox = styled.div`
  display: flex;
  width: 90%;
  height: fit-content;

  gap: 2rem;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  position: relative;

  span {
    cursor: pointer;
    color: #df8fa1;
  }
  p {
    width: 100%;
    color: rgb(221, 57, 57);
    margin-top: -2rem;
    letter-spacing: 0.08rem;
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
  background-color: #f9f8f852;
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

const Login = () => {
  const [emailVer, setEmailVer] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [emailErr, setEmailErr] = useState(false);
  const [mobileErr, setMobileErr] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);
  const [allValid, setAllValid] = useState(false);

  const [serverErr, setServerErr] = useState(false);
  const [serverTxt, setServerTxt] = useState("");
  const navigate = useNavigate();
  const [showMobile, setShowMobile] = useState(false);
  const dispatch = useDispatch();
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

  const allFieldChecker = () => {
    setAllValid(false);
    const email = !showMobile ? document.querySelector("#email").value : "";
    const contactNum = showMobile
      ? document.querySelector("#contactNum").value
      : "";
    const password = document.querySelector("#password").value;

    if (!showMobile && !validateEmail(email)) {
      setEmailErr(true);
      return;
    }

    if (showMobile && contactNum.length < 10) {
      setMobileErr(true);
      return;
    }
    if (password.trim().length < 8) {
      setPasswordErr(true);
      return;
    }
    if (!emailErr && !mobileErr && !passwordErr) {
      setAllValid(true);
      return;
    }
    return;
  };
  const onBlurHandler = () => {
    allFieldChecker();
  };

  const onChangeHandler = (e) => {
    setServerErr(false);
    const id = e.target.id;
    const val = e.target.value;
    allFieldChecker();

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

    setInpFields({ ...inpFields, [id]: val });
  };
  const onSubmitHandler = async () => {
    if (!allValid) {
      return;
    }
    setIsLoading(true);
    let res;
    if (showMobile) {
      res = await fetch(`${process.env.REACT_APP_BASE_URL}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contactNum: inpFields.contactNum,
          password: inpFields.password,
        }),
      });
    }
    if (!showMobile) {
      res = await fetch(`${process.env.REACT_APP_BASE_URL}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: inpFields.email,
          password: inpFields.password,
        }),
      });
    }

    const data = await res.json();

    if (!res.ok) {
      setServerErr(true);
      setServerTxt(data.message);
      setInpFields({ ...inpFields, password: "" });
    }
    // alert(data.message);
    console.log(data);
    if (data.success) {
      setState({ ...state, open: true });
      setTimeout(() => {
        dispatch({ type: "log in", data: { ...data } });
        navigate("/");
      }, 1000);
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
          Log in successfull. We're thrilled to see you again.
        </Alert>
      </Snackbar>
      <OuterBox>
        {" "}
        <MainBox>
          <LeftDiv>
            {/* <img src={logo} alt="" /> */}
            <h1>New Here?</h1>
            <p>
              To get started with your shopping experience, please create an
              account.
            </p>
            <button
              onClick={() => {
                navigate("/register");
              }}
            >
              Sign up
            </button>
          </LeftDiv>
          <RightDiv>
            <h2>Log In</h2>
            <h3>Ready to dive back into your shopping journey?</h3>
            {emailVer && (
              <EmailVerificationBox>
                {isLoading && (
                  <LoaderBox>
                    <CompLoader />
                  </LoaderBox>
                )}
                {!showMobile && (
                  <>
                    <Input
                      type="text"
                      className="inputField"
                      name="email"
                      data-aos="zoom-in"
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
                  </>
                )}
                {showMobile && (
                  <>
                    <Input
                      type="number"
                      name=""
                      className="inputField"
                      id="contactNum"
                      data-aos="zoom-in"
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
                  </>
                )}
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
                {showMobile && (
                  <span
                    data-aos="zoom-in"
                    onClick={() => {
                      setShowMobile(!showMobile);
                    }}
                  >
                    Login using Email
                  </span>
                )}
                {!showMobile && (
                  <span
                    data-aos="zoom-in"
                    onClick={() => {
                      setShowMobile(!showMobile);
                    }}
                  >
                    Login using mobile number
                  </span>
                )}
                {allValid && (
                  <SubmitButton onClick={onSubmitHandler}>Submit</SubmitButton>
                )}
                {!allValid && <DisabledBtn>Submit</DisabledBtn>}
              </EmailVerificationBox>
            )}
          </RightDiv>
        </MainBox>
      </OuterBox>
      <Footer />
    </>
  );
};

export default Login;
