import React from "react";
import "./styles.css";
import Ring from "./ring";
import styled from "styled-components";

const BgGlow = styled.div`
  filter: blur(30px);
  background: linear-gradient(
    229.19deg,
    rgb(14, 44, 113) -43.38%,
    rgb(4, 17, 61) 102.31%
  );
  width: 100%;
  left: 0;
  top: 0%;
  bottom: 0;
  right: 0;
  height: 100%;
  position: absolute;
`;

export default function App() {
  return (
    <div className="App">
      <BgGlow />
      <Ring />
    </div>
  );
}
