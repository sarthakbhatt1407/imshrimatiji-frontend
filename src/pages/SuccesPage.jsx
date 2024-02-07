import React, { useEffect } from "react";
import styled from "styled-components";
import Navbar from "../component/Header.js/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const MainBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  text-align: center;
  background-color: #e4e4e4;
`;

const Card = styled.div`
  background: white;
  padding: 60px;
  border-radius: 4px;
  box-shadow: 0 2px 3px #c8d0d8;
  display: inline-block;
  border-radius: 0.4rem;
  margin: 0 auto;

  h1 {
    color: #88b04b;
    font-family: "Nunito Sans", "Helvetica Neue", sans-serif;
    font-weight: 900;
    font-size: 40px;
    margin-bottom: 10px;
  }
  p {
    color: #404f5e;
    font-family: "Nunito Sans", "Helvetica Neue", sans-serif;
    font-size: 20px;
    margin: 0;
  }
  i {
    color: #9abc66;
    font-size: 100px;
    line-height: 200px;
    margin-left: -15px;
  }

  div {
    border-radius: 200px;
    height: 200px;
    width: 200px;
    background: #f8faf5;
    margin: 0 auto;
  }
  @media only screen and (max-width: 1220px) {
    width: 80%;
    padding: 3rem 0.4rem;
    h1 {
      font-size: 33px;
    }
    p {
      font-size: 17px;
      width: 100%;
    }
    i {
      font-size: 110px;
    }
  }
`;

const SuccesPage = () => {
  const navigate = useNavigate();
  const userId = useSelector((state) => state.userId);
  useEffect(() => {
    const timeOut = setTimeout(() => {
      navigate(`/account/${userId}/orders`);
    }, 3000);

    return () => {
      clearTimeout(timeOut);
    };
  }, []);

  return (
    <>
      <MainBox>
        <Card data-aos="zoom-in" class="card">
          <div data-aos="flip-right" data-aos-delay="250">
            <i class="checkmark">✓</i>
          </div>
          <h1 data-aos="fade-up" data-aos-delay="150">
            Success
          </h1>
          <p data-aos="fade-up" data-aos-delay="150">
            We received your purchase request;
            <br /> we'll be in touch shortly!
          </p>
        </Card>
      </MainBox>
    </>
  );
};

export default SuccesPage;
