import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import Navbar from "../component/Header.js/Navbar/Navbar";
import Footer from "../component/Footer/Footer";
import { colors } from "../data";
import CompLoader from "../component/Loaders/CompLoader/CompLoader";
import { Link, useNavigate } from "react-router-dom";
import { Alert, Snackbar, setRef } from "@mui/material";
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  animation: ${RightDivAni} 0.6s;
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
  a {
    text-decoration: none;
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
const Span = styled.span`
  text-transform: capitalize;
`;

const Login = () => {
  const [forgotEmailSend, setForgotEmailSend] = useState(false);
  const [forOtpVer, setForOtpVer] = useState(false);
  const [forEmailValid, setForEmailValid] = useState(false);
  const [forPassValid, setForPassValid] = useState(false);
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
  const [name, setName] = useState("");
  const [showForgot, setShowForgot] = useState(false);
  const [refresher, setRefresher] = useState(0);
  const [state, setState] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "center",
    text: "",
  });
  const { vertical, horizontal, open, text } = state;

  useEffect(() => {
    const intv = setInterval(() => {
      if (!showForgot) {
        allFieldChecker();
      }
    }, 500);

    return () => {
      clearInterval(intv);
    };
  }, [showForgot, refresher]);

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
    const email = document.querySelector("#email");
    const contactNum = document.querySelector("#contactNum");

    const password = document.querySelector("#password").value;
    if (contactNum) {
      console.log("hi");
      if (contactNum.value.length === 10 && password.length > 5) {
        setAllValid(true);
      }
    } else {
      if (validateEmail(email.value) && password.length > 5) {
        setAllValid(true);
      }
    }
  };
  const onBlurHandler = (e) => {
    const id = e.target.id;
    const val = document.querySelector(`#${e.target.id}`).value;
    if (id === "email") {
      if (!validateEmail(val)) {
        setEmailErr(true);
      }
    }
    if (id === "password") {
      if (val.trim().length < 6) {
        setPasswordErr(true);
      }
    }
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
      setName(data.user.name);
      setState({
        ...state,
        open: true,
        text: "Log in successfull. We're thrilled to see you again",
      });

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
          {text} <Span> {name}</Span>.
        </Alert>
      </Snackbar>
      <OuterBox>
        {" "}
        <MainBox>
          <LeftDiv>
            {/* <img src={logo} alt="" /> */}
            <h1>New here?</h1>
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
            {!showForgot && (
              <>
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
                      <p>Password is too short (minimun 6 charcters.)</p>
                    )}
                    {serverErr && <p>{serverTxt}</p>}
                    {showMobile && (
                      <span
                        data-aos="zoom-in"
                        onClick={() => {
                          setShowMobile(false);
                        }}
                      >
                        Login using Email
                      </span>
                    )}
                    {!showMobile && (
                      <span
                        data-aos="zoom-in"
                        onClick={() => {
                          setShowMobile(true);
                        }}
                      >
                        Login using mobile number
                      </span>
                    )}
                    {allValid && (
                      <SubmitButton onClick={onSubmitHandler}>
                        Submit
                      </SubmitButton>
                    )}
                    {!allValid && <DisabledBtn>Submit</DisabledBtn>}
                    <p
                      onClick={() => {
                        setShowForgot(true);
                      }}
                      style={{
                        textTransform: "capitalize",
                        textAlign: "center",

                        margin: "-1.2rem 0",
                        color: "#e6758d",
                        padding: "2.6px 1px",
                        borderBottom: "1px dashed #e6758d",
                        margin: "0 auto",
                        width: "fit-content",
                        cursor: "pointer",
                      }}
                    >
                      forgot password
                    </p>
                  </EmailVerificationBox>
                )}
              </>
            )}
            {showForgot && (
              <>
                <h2>Forgot Password</h2>
                <h3>Enter email to reset your password</h3>
                {emailVer && (
                  <EmailVerificationBox>
                    {isLoading && (
                      <LoaderBox>
                        <CompLoader />
                      </LoaderBox>
                    )}
                    {!showMobile && (
                      <>
                        {!forgotEmailSend && (
                          <Input
                            type="text"
                            className="inputField"
                            name="email"
                            data-aos="zoom-in"
                            id="email"
                            value={inpFields.email}
                            onChange={(e) => {
                              setServerErr(false);
                              setServerTxt("");
                              setEmailErr(false);
                              setInpFields({
                                ...inpFields,
                                email: e.target.value,
                              });
                              setForEmailValid(false);
                              if (validateEmail(e.target.value)) {
                                setForEmailValid(true);
                              }
                            }}
                            placeholder="Email"
                            onBlur={onBlurHandler}
                            style={{
                              border: `${
                                emailErr
                                  ? "1px solid #d72020"
                                  : "1px solid rgba(166, 166, 166, 0.3)"
                              }`,
                            }}
                          />
                        )}
                        {emailErr && <p>Invalid Email</p>}
                      </>
                    )}
                    {forgotEmailSend && forOtpVer && (
                      <Input
                        type="password"
                        name=""
                        className="inputField"
                        id="password"
                        onBlur={onBlurHandler}
                        onChange={(e) => {
                          setForPassValid(false);
                          setPasswordErr(false);
                          if (e.target.value.trim().length < 6) {
                            return;
                          } else {
                            setForPassValid(true);
                          }
                          setInpFields({
                            ...inpFields,
                            password: e.target.value,
                          });
                        }}
                        placeholder="Password"
                        style={{
                          border: `${
                            passwordErr
                              ? "1px solid #d72020"
                              : "1px solid rgba(166, 166, 166, 0.3)"
                          }`,
                        }}
                      />
                    )}
                    {passwordErr && (
                      <p>Password is too short (minimun 6 charcters.)</p>
                    )}

                    {forgotEmailSend && !forOtpVer && (
                      <Input
                        type="number"
                        name=""
                        className="inputField"
                        id="otp"
                        onChange={() => {
                          setServerErr(false);
                          setServerTxt("");
                        }}
                        placeholder="Enter otp sent to your email"
                      />
                    )}

                    {serverErr && <p>{serverTxt}</p>}

                    {forEmailValid && !forgotEmailSend && (
                      <SubmitButton
                        onClick={async () => {
                          setIsLoading(true);
                          const reslt = await fetch(
                            `${process.env.REACT_APP_BASE_URL}/user/forgot-send-email`,
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
                          console.log(data);
                          if (reslt.ok) {
                            setForgotEmailSend(true);
                          } else {
                            setServerErr(true);
                            setServerTxt(data.message);
                          }
                          setIsLoading(false);
                        }}
                      >
                        Submit
                      </SubmitButton>
                    )}
                    {forgotEmailSend && !forOtpVer && (
                      <SubmitButton
                        onClick={async () => {
                          setIsLoading(true);
                          const val = document.querySelector("#otp").value;
                          const reslt = await fetch(
                            `${process.env.REACT_APP_BASE_URL}/user/forgot-verify-otp`,
                            {
                              method: "POST",
                              headers: {
                                "Content-Type": "application/json",
                              },
                              body: JSON.stringify({
                                otpInp: Number(val),
                                email: inpFields.email,
                              }),
                            }
                          );
                          const data = await reslt.json();
                          console.log(data);
                          if (data.valid) {
                            setForOtpVer(true);
                          }
                          if (!data.valid) {
                            setServerErr(true);
                            setServerTxt(data.message);
                          }
                          setIsLoading(false);
                        }}
                      >
                        Submit
                      </SubmitButton>
                    )}
                    {forgotEmailSend && forOtpVer && forPassValid && (
                      <SubmitButton
                        onClick={async () => {
                          setIsLoading(true);

                          const reslt = await fetch(
                            `${process.env.REACT_APP_BASE_URL}/user/reset-password`,
                            {
                              method: "POST",
                              headers: {
                                "Content-Type": "application/json",
                              },
                              body: JSON.stringify({
                                email: inpFields.email,
                                password: inpFields.password,
                              }),
                            }
                          );
                          const data = await reslt.json();
                          console.log(data);
                          if (reslt.ok) {
                            setState({
                              ...state,
                              open: true,
                              text: "Password has been changed.",
                            });

                            window.location.reload();
                          }
                          if (!data.valid) {
                            setServerErr(true);
                            setServerTxt(data.message);
                          }
                          setIsLoading(false);
                        }}
                      >
                        Submit
                      </SubmitButton>
                    )}
                    {!forEmailValid && <DisabledBtn>Submit</DisabledBtn>}
                    {!forPassValid && forgotEmailSend && forOtpVer && (
                      <DisabledBtn>Submit</DisabledBtn>
                    )}
                    <p
                      onClick={() => {
                        setShowForgot(false);
                      }}
                      style={{
                        textTransform: "capitalize",
                        textAlign: "center",

                        margin: "-1.2rem 0",
                        color: "#e6758d",
                        padding: "2.6px 1px",
                        borderBottom: "1px dashed #e6758d",
                        margin: "0 auto",
                        width: "fit-content",
                        cursor: "pointer",
                      }}
                    >
                      Back to login
                    </p>
                  </EmailVerificationBox>
                )}
              </>
            )}
          </RightDiv>
        </MainBox>
      </OuterBox>
      <Footer />
    </>
  );
};

export default Login;
