import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  body {
    background-color: #8C11BE;
    color: #fff;
    font-family: 'Raleway', sans-serif;
    min-width: 320px;
    max-width: 800px;
    margin: 0px auto;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    position: absolute;
  }
  #root {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
  }
  h1 {
    font-family: 'Saira Stencil One', cursive;
    font-size: 32px;
    margin: 0px auto 24px;
  }
  button,
  input {
    font-family: inherit;
  }
  button {
    background-color: #A328D6;
    border-radius: 5px;
    cursor: pointer;
    transition: .2s;

  }
  button:hover,
  button:focus {
    filter: brightness(1.1);
  }
  input::placeholder {
    opacity: 1;
  }
`;
export default GlobalStyle;
