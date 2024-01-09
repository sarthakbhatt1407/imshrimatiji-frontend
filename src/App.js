import React from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./component/Header.js/Header";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Header />} />
      </Routes>
    </>
  );
};

export default App;
