import styled from "styled-components";
import StyledForm from "../styles/StyledForm";

export default function NewTransaction({ type }) {
    function sendNewTransaction(e) {
        e.preventDefault();
        alert(type);
    }

    return (
        <StyledForm onSubmit={sendNewTransaction}>
            <Title>Nova {type}</Title>
            <input placeholder="Valor" type="text"></input>
            <input placeholder="Descrição" type="number"></input>
            <button onClick={sendNewTransaction}>Salvar {type}</button>
        </StyledForm>
    );
}

const Title = styled.div`
    font-weight: bold;
    font-size: 26px;
    line-height: 31px;
    margin: 25px 0px 40px;
    width: 100%;
`;
