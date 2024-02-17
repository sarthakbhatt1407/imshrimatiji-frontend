import React, { useState } from "react";
import styled, { keyframes } from "styled-components";

// Logo
import Logo from "../../../assets/images/logo/logo-white.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  AccountCircle,
  CloseOutlined,
  KeyboardArrowDown,
  KeyboardArrowUp,
  LocalMall,
} from "@mui/icons-material";
import { Badge } from "@mui/material";
import { colors } from "../../../data";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

// css

const MainNav = styled.nav`
  padding: 1rem;
  position: sticky;
  top: 0;
  background-color: #f7f7f7;
  padding: 1rem 0;
  z-index: 100;
  @media only screen and (max-width: 949px) {
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
    height: 4.1rem;
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

    font-size: 1.5rem;
    letter-spacing: 0.12rem;
    font-weight: 500;
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
  gap: 1.8rem;
  align-items: center;
  font-size: 1.4rem;
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
    svg {
      transform: scale(1.2);
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
const FadeUpAni = keyframes`
  0%{
    opacity: 0;
    transform: translateY(20px);
  }
  100%{
    opacity: 1;
    transform: translateY(0px);
  }
`;

const FadeAni = keyframes`
  0%{
    opacity: 0;
    display: none;
    transform: translateY(30px);

  }
  100%{
    opacity: 1;
    transform: translateY(0px);
  }

`;

const HiddenMobileDiv = styled.div`
  text-transform: uppercase;
  background-color: white;
  padding: 2rem 2rem;
  width: 67%;
  height: 100vh;
  top: 0;
  left: 0;
  position: fixed;
  z-index: 10;
  transition: all 0.5s ease-in-out;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  transform: ${(props) =>
    props.status === "false" ? "translateX(-100%)" : "translateX(0)"};

  span {
    position: absolute;
    top: 0.2rem;
    color: #424242;
    right: 0.2rem;
    padding: 1rem 1.5rem;
    border-radius: 50%;
    transform: scale(1.3);
    animation: ${FadeAni} 1s;
    backface-visibility: hidden;
  }
  @media only screen and (min-width: 950px) and (max-width: 2500px) {
    display: none;
  }
  a {
    color: #393939;
    font-size: 1.5rem;
    letter-spacing: 0.1rem;
    padding: 1rem 0;
    animation: ${FadeAni} 1s;
    backface-visibility: hidden;
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
  border-bottom: 1px solid #dedede;
  gap: 1rem;
  padding: 1rem 0;
  animation: ${FadeUpAni} 1s;
  animation-delay: 0.9s;
  letter-spacing: 0.09rem;
  svg {
    transform: scale(1.6);
    margin-top: 0.6rem;
  }
  p {
    display: flex;
    align-items: center;
    height: 100%;

    a {
      border: none;
      padding: 0;
      font-size: 1.2rem;
    }
  }
`;

const CollapsibleDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1rem 0.2rem;
  a {
    animation: ${FadeUpAni} 1s;
    border: none;
    text-transform: capitalize;
    font-weight: bold;
    font-size: 1.2rem;
  }
`;

// Component
const Navbar = () => {
  const path = useLocation().pathname;
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const userId = useSelector((state) => state.userId);
  const cartTotalItems = useSelector((state) => state.cartItems.length);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [arrowDown, setArrowDown] = useState(true);
  const [mobileNav, setMobileNav] = useState(false);
  const [linksActive, setLinksActive] = useState(false);
  const menuButtonHandler = () => {
    setMobileNav(!mobileNav);
    setArrowDown(true);
    setTimeout(() => {
      setLinksActive(!linksActive);
    }, 50);
  };
  useEffect(() => {
    return () => {};
  }, [path]);

  return (
    <MainNav>
      <HiddenMobileDiv status={mobileNav.toString()}>
        <span onClick={menuButtonHandler}>
          <CloseOutlined />
        </span>
        {!isLoggedIn && (
          <HiddenNavLinksDiv onClick={menuButtonHandler}>
            <>
              <AccountCircle />
              <p>
                <Link to="/login">log in</Link>
              </p>
            </>
          </HiddenNavLinksDiv>
        )}
        {linksActive && (
          <Link onClick={menuButtonHandler} to="/">
            Home
          </Link>
        )}
        {linksActive && (
          <Link
            onClick={menuButtonHandler}
            className={
              path === "/product-category/all-products"
                ? "activeLink"
                : "nonActiveLink"
            }
            to="/product-category/all-products"
          >
            Shop All
          </Link>
        )}
        {linksActive && (
          <Link>
            <p
              onClick={() => {
                setArrowDown(!arrowDown);
              }}
              type="button"
              className="para"
              data-toggle="collapse"
              data-target="#demo"
            >
              <>Category</>
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
            <div id="demo" className="collapse">
              <CollapsibleDiv>
                <Link to="/product-category/saree" onClick={menuButtonHandler}>
                  Saree
                </Link>
                <Link to="/product-category/kurti" onClick={menuButtonHandler}>
                  Kurti
                </Link>
                <Link to="/product-category/frock" onClick={menuButtonHandler}>
                  Frock
                </Link>
                <Link to="/product-category/suit" onClick={menuButtonHandler}>
                  Suit
                </Link>
              </CollapsibleDiv>
            </div>
          </Link>
        )}

        {linksActive && (
          <Link onClick={menuButtonHandler} to="/">
            Story
          </Link>
        )}
        {linksActive && (
          <Link onClick={menuButtonHandler} to={`/account/${userId}/orders`}>
            Orders
          </Link>
        )}
        {linksActive && (
          <Link onClick={menuButtonHandler} to={`/account/${userId}`}>
            Account
          </Link>
        )}
        {linksActive && (
          <Link
            onClick={() => {
              dispatch({ type: "logout" });
              menuButtonHandler();
              navigate("/");
            }}
            to="/"
          >
            Log out
          </Link>
        )}
      </HiddenMobileDiv>
      <PcNav data-aos="fade-down">
        <LogoDiv logo={Logo}>
          <Link to="/"></Link>
        </LogoDiv>
        <PageLinksDiv>
          <Link
            className={path === "/" ? "activeLink" : "nonActiveLink"}
            to="/"
          >
            Home
          </Link>
          <Link
            className={
              path === "/product-category/all-products"
                ? "activeLink"
                : "nonActiveLink"
            }
            to="/product-category/all-products"
          >
            Shop All
          </Link>
          <Link
            className={
              path === "/product-category/saree"
                ? "activeLink"
                : "nonActiveLink"
            }
            to="/product-category/saree"
          >
            Saree
          </Link>
          <Link
            className={
              path === "/product-category/kurti"
                ? "activeLink"
                : "nonActiveLink"
            }
            to="/product-category/kurti"
          >
            Kurti
          </Link>
          <Link
            className={
              path === "/product-category/frock"
                ? "activeLink"
                : "nonActiveLink"
            }
            to="/product-category/frock"
          >
            Frock
          </Link>
          <Link
            className={
              path === "/product-category/suit" ? "activeLink" : "nonActiveLink"
            }
            to="/product-category/suit"
          >
            Suit
          </Link>
          <Link
            className={path === "/profile" ? "activeLink" : "nonActiveLink"}
            to={`/account/${userId}`}
          >
            Account
          </Link>
        </PageLinksDiv>
        <UserControlsDiv>
          <Link to="/">Story</Link>
          {isLoggedIn && <Link to={`/account/${userId}/orders`}>Orders</Link>}
          {!isLoggedIn && <Link to="/login">Login</Link>}
          {!isLoggedIn && <Link to="/register">Register</Link>}
          {isLoggedIn && (
            <Link
              onClick={() => {
                dispatch({ type: "logout" });
                menuButtonHandler();
                navigate("/");
              }}
              to="/"
            >
              Log out
            </Link>
          )}
          <Link to="/cart">
            <Badge badgeContent={cartTotalItems} color="primary">
              <LocalMall color="action" />
            </Badge>
          </Link>
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
          <Link to="/cart">
            <Badge badgeContent={cartTotalItems} color="primary">
              <LocalMall color="action" />
            </Badge>
          </Link>
        </div>
      </MobileNav>
    </MainNav>
  );
};

export default Navbar;
