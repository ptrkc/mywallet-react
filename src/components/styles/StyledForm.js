import styled from "styled-components";

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0px 25px;
    width: 100%;

    input,
    button {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 58px;
        font-size: 20px;
        border-radius: 5px;
        border: none;
        width: 100%;
    }
    input:disabled,
    button:disabled {
        filter: brightness(0.8);
    }
    input {
        color: #000000;
        background-color: #ffffff;
        margin-bottom: 13px;
        padding: 0px 15px;
    }
    button {
        color: #ffffff;
        background-color: #a328d6;
        font-weight: bold;
    }
`;

export default StyledForm;
