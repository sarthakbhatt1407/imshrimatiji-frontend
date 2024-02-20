import React from "react";
import styled from "styled-components";
import SectionHeading from "../UI/SectionHeading";
import {
  AssignmentReturn,
  CreditCard,
  LocalShipping,
  SecurityOutlined,
} from "@mui/icons-material";
import { colors } from "../../data";

// Css
const MainBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4rem;
  width: 100%;
  overflow-x: hidden;
  padding: 4rem 0;
  margin: 2rem 0;
  @media only screen and (max-width: 1220px) {
    padding: 0;
    margin: 0;
  }
`;

const ContentBox = styled.div`
  display: grid;

  grid-template-columns: repeat(4, 1fr);
  gap: 4rem;
  width: 90%;
  @media only screen and (max-width: 649px) {
    grid-template-columns: 1fr;
  }
  @media only screen and (min-width: 649px) and (max-width: 949px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 2rem 0;
  gap: 0.5rem;
  /* background-color: red; */
  svg {
    color: ${colors.mainColor};
    transform: scale(2.5);
  }
  h3 {
    font-size: 2.5rem;
  }
  p {
    color: #767575;
    font-size: 1.3rem;
    font-weight: bold;
  }
`;

const WhyChooseUs = () => {
  const data = [
    {
      icon: <LocalShipping />,
      mainHeading: "Fast Delivery",
      ani: window.screen.availWidth > 949 ? "fade-down" : "fade-right",
      secondaryHeading:
        " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec.",
    },
    {
      icon: <CreditCard />,
      mainHeading: "Free Shipping",
      ani: window.screen.availWidth > 949 ? "fade-down" : "fade-left",
      secondaryHeading:
        " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec.",
    },
    {
      icon: <SecurityOutlined />,
      mainHeading: "Secure Checkout",
      ani: window.screen.availWidth > 949 ? "fade-down" : "fade-right",
      secondaryHeading:
        " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec.",
    },
    {
      icon: <AssignmentReturn />,
      mainHeading: "Easy Replacements",
      ani: window.screen.availWidth > 949 ? "fade-down" : "fade-left",
      secondaryHeading:
        " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec.",
    },
  ];
  return (
    <MainBox>
      <SectionHeading
        data={{ main: "Why choose Us", secondary: "Why choose us" }}
      />
      <ContentBox>
        {data.map((d) => {
          return (
            <TextBox key={d.mainHeading} data-aos={d.ani}>
              {d.icon}
              <h3>{d.mainHeading}</h3>
              <p>{d.secondaryHeading}</p>
            </TextBox>
          );
        })}
      </ContentBox>
    </MainBox>
  );
};

export default WhyChooseUs;
