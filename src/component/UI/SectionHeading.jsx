import React from "react";
import styled from "styled-components";

const TextBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  h1 {
    margin-top: 0.1rem;
    font-weight: bold;
    font-size: 4rem;
    letter-spacing: 0.1rem;
  }
  span {
    font-size: 1.2rem;
    letter-spacing: 0.2rem;
    color: #676767;
  }
`;

const SectionHeading = (props) => {
  const data = props.data;
  return (
    <TextBox>
      <span>{data}</span>
      <h1>{data}</h1>
    </TextBox>
  );
};

export default SectionHeading;
