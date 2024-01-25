import React, { useContext, useState } from "react";
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  LineText,
  MutedLink,
  SubmitButton,
  DisSubmitButton,
} from "./common";
import { Marginer } from "../marginer";
import { AccountContext } from "./accountContext";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import FullPageLoader from "../../Loaders/CategoryLoader/FullPageLoader";
import BtnLoader from "../../Loaders/CategoryLoader/BtnLoader";

export function LoginForm(props) {
  const { switchToSignup } = useContext(AccountContext);
  const [isLogging, setIsLogging] = useState(false);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [allFieldsValid, setAllFieldsValid] = useState(false);

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  const defaultField = { email: "", password: "" };
  const [inpField, setInpField] = useState(defaultField);
  const allFieldChecker = () => {
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;
    if (validateEmail(email) && password.trim().length > 7) {
      setAllFieldsValid(true);
    }
  };

  const onChangeHanlder = (e) => {
    setAllFieldsValid(false);
    const id = e.target.id;
    const val = e.target.value;

    const ele = document.querySelector(`#${id}`);
    allFieldChecker();
    ele.style.border = "1px solid rgba(200, 200, 200, 0.3)";

    setInpField({ ...inpField, [id]: val });
  };

  const emailOnBlur = (e) => {
    const val = e.target.value;
    const ele = document.querySelector("#email");
    if (validateEmail(val)) {
      ele.style.border = "1px solid rgba(200, 200, 200, 0.3)";
      ele.placeholder = "Email";
    } else {
      ele.style.borderBottom = "1px solid red";
      ele.placeholder = "Invalid email";
    }
  };
  const passOnBlur = (e) => {
    const val = e.target.value;
    const ele = document.querySelector("#password");
    if (val.trim().length < 8) {
      ele.style.borderBottom = "1px solid red";
      ele.placeholder = "Invalid password";
    } else {
      ele.style.borderBottom = "1px solid rgba(200, 200, 200, 0.3)";
      ele.placeholder = "Password";
    }
  };
  const history = useNavigate();
  const onClickHandler = async () => {
    setIsLogging(true);
    setIsLoading(true);
    const res = await fetch(`${process.env.REACT_APP_BASE_URL}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: inpField.email,
        password: inpField.password,
      }),
    });
    const data = await res.json();
    console.log(data);
    if (res.ok) {
      dispatch({ type: "log in", data: { ...data } });

      history("/");
    }
    setInpField(defaultField);
    setIsLogging(false);
    setIsLoading(false);
  };

  return (
    <>
      <BoxContainer>
        <FormContainer>
          <Input
            type="email"
            placeholder="Email"
            id="email"
            onChange={onChangeHanlder}
            onBlur={emailOnBlur}
            value={inpField.email}
          />
          <Input
            type="password"
            placeholder="Password"
            id="password"
            onChange={onChangeHanlder}
            onBlur={passOnBlur}
            value={inpField.password}
          />
        </FormContainer>
        <Marginer direction="vertical" margin={10} />
        <MutedLink href="#">Forget your password?</MutedLink>
        <Marginer direction="vertical" margin="1.6em" />
        {!allFieldsValid && (
          <DisSubmitButton disabled type="submit">
            Signin
          </DisSubmitButton>
        )}
        {allFieldsValid && (
          <SubmitButton type="submit" onClick={onClickHandler}>
            Signin
            {isLogging && <BtnLoader />}
          </SubmitButton>
        )}
        <Marginer direction="vertical" margin="5px" />
        <LineText>
          Don't have an accoun?{" "}
          <BoldLink onClick={switchToSignup} href="#">
            Signup
          </BoldLink>
        </LineText>
      </BoxContainer>
    </>
  );
}
