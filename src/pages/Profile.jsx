import { PDFViewer } from "@react-pdf/renderer";
import React from "react";
import MyDocument from "./MyDocument";
import styled from "styled-components";
const MainDiv = styled.div`
  iframe {
    width: 100%;
    height: 90vh;
  }
`;

const Profile = () => {
  return (
    <MainDiv>
      <PDFViewer>
        <MyDocument />
      </PDFViewer>
    </MainDiv>
  );
};

export default Profile;
