import React from "react";
import "../AccountLoader/AccountLoader.css";
import styled from "styled-components";
const MainBox = styled.div`
  position: relative;
  height: 92vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 11;
  &::before {
    background: white;
    content: "";
    opacity: 0.6;
    top: 0;
    left: 0;
    position: absolute;
    z-index: -1;
    width: 100vw;
    height: 92vh;
  }
`;

const AccountLoader = () => {
  return (
    <MainBox>
      <span className="accountloader"></span>
    </MainBox>
  );
};

export default AccountLoader;
