import React, { useState } from "react";
import styled from "styled-components";

// Logo
import Logo from "../../../assets/images/logo/logo-white.png";
import { Link } from "react-router-dom";
import {
  AccountCircle,
  CloseOutlined,
  KeyboardArrowDown,
  KeyboardArrowUp,
  LocalMall,
} from "@mui/icons-material";
import { Badge } from "@mui/material";
import { colors } from "../../../data";

// css

const MainNav = styled.nav`
  padding: 1rem;
  position: sticky;
  top: 0;
  @media only screen and (max-width: 949px) {
    /* padding: 0.4rem 1rem 0.4rem 1rem; */
  }
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
  height: 3.7rem;
  @media only screen and (max-width: 949px) {
    width: 25%;
    height: 3.9rem;
  }
`;

const PageLinksDiv = styled.div`
  height: 3.7rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4rem;
  text-transform: uppercase;
  a {
    text-decoration: none;
    transition: all 0.2s;
    backface-visibility: hidden;
    color: black;
    font-size: 1.5rem;
    letter-spacing: 0.12rem;
    font-weight: 600;
    &:hover {
      color: ${colors.mainColor};
      transform: scale(1.15) translateZ(0);
    }
  }
`;

const UserControlsDiv = styled.div`
  height: 3rem;
  display: flex;
  justify-content: end;
  gap: 1.7rem;
  align-items: center;
  font-size: 1.3rem;
  padding-right: 1.5rem;
  a {
    text-decoration: none;
    transition: all 0.2s;
    backface-visibility: hidden;
    color: black;
    letter-spacing: 0.09rem;
    &:hover {
      color: ${colors.mainColor};
      transform: scale(1.15) translateZ(0);
    }
  }
`;

// Mobile Navbar

const MobileNav = styled.div`
  position: relative;
  overflow: hidden;
  padding-right: 1rem;
  padding-top: 0.2rem;
  span {
    svg {
      color: ${colors.mainColor};
      transform: scale(1.5);
    }
    span {
      background-color: ${colors.secondaryColor};
    }
  }
  @media only screen and (max-width: 949px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    button {
      border: none;
      outline: none;
      background-color: transparent;

      div {
        width: 30px;
        height: 2.4px;
        background-color: black;
        margin: 4px 0;
      }
    }
  }

  /*  */

  @media only screen and (min-width: 950px) and (max-width: 2500px) {
    display: none;
  }
`;

const HiddenMobileDiv = styled.div`
  text-transform: uppercase;
  padding: 2rem 2rem;
  width: 67%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: white;
  position: absolute;
  z-index: 2;
  transition: all 0.7s ease-in-out;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  transform: ${(props) =>
    props.status === false ? "translateX(-100%)" : "translateX(0)"};

  span {
    position: absolute;
    top: 0.2rem;
    color: #424242;
    right: 0.2rem;
    padding: 1rem 1.5rem;
    border-radius: 50%;
    transform: scale(1.3);
  }
  @media only screen and (min-width: 950px) and (max-width: 2500px) {
    display: none;
  }
  a {
    color: #393939;
    font-size: 1.5rem;
    letter-spacing: 0.1rem;
    padding: 1rem 0;

    text-decoration: none;
    border-bottom: 1px solid #dedede;
  }
  p {
    display: flex;
    justify-content: space-between;
    align-items: center;
    i {
      border-left: 1px solid #dedede;
      width: 20%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`;

const HiddenNavLinksDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  border-bottom: 1px solid #dedede;
  gap: 1rem;
  padding: 1rem 0;
  letter-spacing: 0.09rem;
  svg {
    transform: scale(1.6);
  }
`;
const CollapsibleDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1rem 0.2rem;
  a {
    border: none;
    text-transform: capitalize;
    font-weight: bold;
    font-size: 1.2rem;
  }
`;

// Component
const Navbar = () => {
  const [arrowDown, setArrowDown] = useState(true);
  const [mobileNav, setMobileNav] = useState(false);
  const menuButtonHandler = () => {
    setMobileNav(!mobileNav);
  };

  return (
    <MainNav>
      <HiddenMobileDiv status={mobileNav}>
        <span onClick={menuButtonHandler}>
          <CloseOutlined />
        </span>
        <HiddenNavLinksDiv>
          <AccountCircle />
          <p>Log in</p>
        </HiddenNavLinksDiv>
        <Link to="/">Home</Link>
        <Link to="/">
          <p
            onClick={() => {
              setArrowDown(!arrowDown);
            }}
            type="button"
            class="para"
            data-toggle="collapse"
            data-target="#demo"
          >
            <p>Shop</p>
            <i
              onClick={() => {
                const para = document.querySelector(".para");
                para.click();
              }}
            >
              {arrowDown && <KeyboardArrowDown />}
              {!arrowDown && <KeyboardArrowUp />}
            </i>
          </p>
          <div id="demo" class="collapse">
            <CollapsibleDiv>
              <Link to="/">Saree</Link>
              <Link to="/">Kurti</Link>
              <Link to="/">Frock</Link>
              <Link to="/">Suit</Link>
            </CollapsibleDiv>
          </div>
        </Link>

        <Link to="/">Story</Link>
        <Link to="/">Orders</Link>
        <Link to="/">Account</Link>
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
        <button onClick={menuButtonHandler}>
          <div></div>
          <div></div>
          <div></div>
        </button>

        <LogoDiv logo={Logo}></LogoDiv>
        <div>
          <Badge badgeContent={4} color="primary">
            <LocalMall color="action" />
          </Badge>
        </div>
      </MobileNav>
    </MainNav>
  );
};

export default Navbar;
