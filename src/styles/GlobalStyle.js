import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  body {
    background-color: #8C11BE;
    color: #fff;
    font-family: 'Raleway', sans-serif;
  }
  h1 {
    font-family: 'Saira Stencil One', cursive;
    font-size: 32px;
    margin: 24px auto;
  }
  button,
  input {
    font-family: inherit;
  }
  button {
    background-color: #A328D6;
    border-radius: 5px;
  }
  input::placeholder {
    opacity: 1;
  }
`;
export default GlobalStyle;
