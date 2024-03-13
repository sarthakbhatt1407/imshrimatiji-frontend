import React from "react";
import styled from "styled-components";
import logo from "../../assets/images/logo/logo-white.png";
import { Link } from "react-router-dom";
import {
  FacebookOutlined,
  Instagram,
  Twitter,
  YouTube,
} from "@mui/icons-material";
import { colors } from "../../data";
import { useSelector } from "react-redux";

// css
const MainBox = styled.footer`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  height: fit-content;
  padding: 3rem 6rem;
  border-top: 1px solid #ebebeb;
  background-color: #f7f7f7;
  width: 100%;
  @media only screen and (max-width: 900px) {
    padding: 3rem 1rem;
    gap: 1rem;
  }
  @media only screen and (min-width: 900px) and (max-width: 949px) {
  }
`;

const LogoAndLinksBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 0.65fr;
  gap: 2rem;
  padding: 1rem 0 14rem 0;
  border-bottom: 1px solid #ebebeb;
  @media only screen and (max-width: 900px) {
    display: flex;
    flex-direction: column;
  }
  @media only screen and (min-width: 900px) and (max-width: 949px) {
  }
`;

const LogoBox = styled.div`
  img {
    width: 20%;
  }
  @media only screen and (max-width: 900px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    img {
      width: 35%;
    }
  }
`;

const LinkAndCategoryBox = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 2rem;
  @media only screen and (max-width: 900px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0;
  }
  @media only screen and (min-width: 900px) and (max-width: 949px) {
  }
`;

const LinksBox = styled.div`
  display: flex;
  flex-direction: column;
  h4 {
    text-transform: capitalize;
    font-weight: bold;
  }
  a {
    color: ${colors.mainColor};
    text-decoration: none;
    transition: all 0.8s;
    font-weight: bold;
    margin: 0.3rem 0;
    &:hover {
      color: black;
    }
  }
  @media only screen and (max-width: 900px) {
    align-items: center;
    h4 {
      font-size: 2.2rem;
    }
    a {
      font-size: 1.5rem;
    }
  }
  @media only screen and (min-width: 900px) and (max-width: 949px) {
  }
`;

const EmailSubBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 40%;
  h4 {
    font-weight: bold;
    font-size: 2.5rem;
  }
  input {
    border: 1px solid #dbdbdb;
    outline: none;
    border-radius: 0.3rem;
    padding: 1rem;
    padding-right: 2rem;
  }
  button {
    width: 60%;
    border: none;
    background-color: black;
    color: white;
    padding: 1rem 2rem;
    border-radius: 0.3rem;
    text-align: center;
    letter-spacing: 0.09rem;
  }
  @media only screen and (max-width: 900px) {
    align-items: center;
    margin-top: 4rem;
    width: 100%;
    gap: 2rem;
    input {
      width: 80%;
    }
    button {
      font-size: 2rem;
      padding: 1rem 2rem;
      width: 40%;
    }
  }
  @media only screen and (min-width: 900px) and (max-width: 949px) {
  }
`;

const SocialMediaAndCopyBox = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  @media only screen and (max-width: 900px) {
    display: flex;
    flex-direction: column;
    text-align: center;
    font-size: 1.2rem;
    gap: 3rem;
  }
  @media only screen and (min-width: 900px) and (max-width: 949px) {
  }
`;

const CopyBox = styled.div``;

const SocialMediaBox = styled.div`
  display: flex;
  justify-content: space-evenly;
  svg {
    transform: scale(2);
  }
`;

const Footer = () => {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const userId = useSelector((state) => state.userId);
  return (
    <MainBox>
      {/* Upper */}

      <LogoAndLinksBox>
        <LogoBox data-aos="fade-up">
          <img src={logo} alt="logo" />
        </LogoBox>
        <LinkAndCategoryBox>
          <LinksBox data-aos="fade-up">
            <h4>Links</h4>
            {isLoggedIn && (
              <>
                <Link to={`/account/${userId}/orders`}>Orders</Link>
                <Link to={`/account/${userId}`}>Account</Link>
              </>
            )}
            <Link to="/cart">Cart</Link>
          </LinksBox>
          <LinksBox data-aos="fade-up">
            <h4>Categories</h4> <Link to="/product-category/saree">Saree</Link>
            <Link to="/product-category/kurti">Kurti</Link>
            <Link to="/product-category/frock">Frock</Link>
            <Link to="/product-category/suit">Suit</Link>
            <Link to="/product-category/all-products">Shop All</Link>
          </LinksBox>
          <EmailSubBox data-aos="fade-up">
            <h4>Subscribe</h4>
            <input type="text" placeholder="Enter Your Email" />
            <button>Subscribe</button>
          </EmailSubBox>
        </LinkAndCategoryBox>
      </LogoAndLinksBox>

      {/* Lower */}

      <SocialMediaAndCopyBox>
        <CopyBox>
          Copyright © 2024 imshrimatiji | Powered by Fusion Avinya
        </CopyBox>
        <SocialMediaBox>
          <FacebookOutlined />
          <Instagram />
          <YouTube />
          <Twitter />
        </SocialMediaBox>
      </SocialMediaAndCopyBox>
    </MainBox>
  );
};

export default Footer;
