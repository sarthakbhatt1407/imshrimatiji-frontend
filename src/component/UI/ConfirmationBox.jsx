import React from "react";
import "react-alert-confirm/lib/style.css";
import confirm, { Button, alert } from "react-alert-confirm";
import styled from "styled-components";
import { useEffect } from "react";

const MainBox = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 3;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #0000001b;
`;
export default function ConfirmationBox() {
  function handleClickBasic() {
    confirm({
      title: "This is title",
      language: "en",
      content: <h2>This is content !</h2>,
      onOk: () => console.log("ok"),
    });
  }
  useEffect(() => {
    handleClickBasic();

    return () => {};
  }, []);

  return <MainBox></MainBox>;
}
