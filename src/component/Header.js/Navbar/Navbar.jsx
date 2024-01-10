import React, { useState } from "react";
import styled from "styled-components";

// Logo
import Logo from "../../../assets/images/logo/logo-white.png";
import { Link } from "react-router-dom";
import { LocalMall } from "@mui/icons-material";
import { Badge } from "@mui/material";

// css

const MainNav = styled.nav`
  padding: 1rem;
`;

// Pc Navbar

const PcNav = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: 0.6fr 4fr 1fr;
  @media only screen and (max-width: 949px) {
    display: none;
  }
`;

const LogoDiv = styled.div`
  background: url(${(props) => props.logo});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  height: 3rem;
  @media only screen and (max-width: 949px) {
    width: 25%;
  }
`;

const PageLinksDiv = styled.div`
  height: 3rem;
  /* background-color: red; */
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  text-transform: uppercase;
  a {
    text-decoration: none;
    transition: all 0.2s;
    backface-visibility: hidden;
    color: black;
    letter-spacing: 0.12rem;
    font-weight: 600;
    &:hover {
      color: #ba445e;
      transform: scale(1.15) translateZ(0);
    }
  }
`;

const UserControlsDiv = styled.div`
  height: 3rem;
  display: flex;
  justify-content: end;
  gap: 1rem;
  align-items: center;
  font-size: 0.94rem;
  padding-right: 1rem;
  a {
    text-decoration: none;
    transition: all 0.2s;
    backface-visibility: hidden;
    color: black;
    letter-spacing: 0.09rem;
    &:hover {
      color: #ba445e;
      transform: scale(1.15) translateZ(0);
    }
  }
`;

// Mobile Navbar

const MobileNav = styled.div`
  position: relative;
  overflow: hidden;
  @media only screen and (max-width: 949px) {
    display: flex;
    justify-content: space-between;
    button {
      border: none;
      outline: none;
      background-color: transparent;

      div {
        width: 35px;
        height: 3px;
        background-color: black;
        margin: 6px 0;
      }
    }
  }

  /*  */

  @media only screen and (min-width: 950px) and (max-width: 2500px) {
    display: none;
  }
`;

const HiddenMobileDiv = styled.div`
  width: 70%;
  height: 100%;
  top: 0;
  right: 0;
  background-color: #ffffffb2;
  position: absolute;
  z-index: 2;
  transition: all 0.7s ease-in-out;
  transform: ${(props) =>
    props.status === false ? "translateX(100%)" : "translateX(0)"};
  span {
    position: absolute;
    top: 2rem;
    color: white;
    right: 1rem;
    background-color: black;
    padding: 1rem 1.5rem;
    border-radius: 50%;
  }
  @media only screen and (min-width: 950px) and (max-width: 2500px) {
    display: none;
  }
`;

// Component
const Navbar = () => {
  const [mobileNav, setMobileNav] = useState(false);
  const menuButtonHandler = () => {
    setMobileNav(!mobileNav);
  };

  return (
    <MainNav>
      <HiddenMobileDiv status={mobileNav}>
        <span onClick={menuButtonHandler}>x</span>
      </HiddenMobileDiv>
      <PcNav>
        <LogoDiv logo={Logo}></LogoDiv>
        <PageLinksDiv>
          <Link to="/">Home</Link>
          <Link to="/">Saree</Link>
          <Link to="/">Kurti</Link>
          <Link to="/">Frock</Link>
          <Link to="/">Suit</Link>
        </PageLinksDiv>
        <UserControlsDiv>
          <Link to="/">Story</Link>
          <Link to="/">Orders</Link>
          <Link to="/">Login</Link>
          <Badge badgeContent={4} color="primary">
            <LocalMall color="action" />
          </Badge>
        </UserControlsDiv>
      </PcNav>
      <MobileNav>
        <LogoDiv logo={Logo}></LogoDiv>
        {!mobileNav && (
          <button onClick={menuButtonHandler}>
            <div></div>
            <div></div>
            <div></div>
          </button>
        )}
      </MobileNav>
    </MainNav>
  );
};

export default Navbar;
