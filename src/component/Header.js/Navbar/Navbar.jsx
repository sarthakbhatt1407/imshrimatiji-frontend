import React from "react";
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
  @media only screen and (max-width: 768px) {
    display: none;
  }
`;

const LogoDiv = styled.div`
  background: url(${(props) => props.logo});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  height: 3rem;
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
  /* background-color: yellow; */
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
    /* font-weight: 600; */
    letter-spacing: 0.09rem;
    &:hover {
      color: #ba445e;
      transform: scale(1.15) translateZ(0);
    }
  }
`;

// Mobile Navbar

const MobileNav = styled.div`
  @media only screen and (max-width: 768px) {
    display: flex;
  }
  @media only screen and (min-width: 769px) and (max-width: 2500px) {
    display: none;
  }
`;

// Component
const Navbar = () => {
  return (
    <MainNav>
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
      <MobileNav>2</MobileNav>
    </MainNav>
  );
};

export default Navbar;
