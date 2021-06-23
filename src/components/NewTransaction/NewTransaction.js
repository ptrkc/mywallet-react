import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import StyledForm from "../styles/StyledForm";

export default function NewTransaction({ type }) {
    const [value, setValue] = useState("");
    const [description, setDescription] = useState("");
    const history = useHistory();
    const displayType = type === "income" ? "entrada" : "saída";
    function sendNewTransaction(e) {
        e.preventDefault();
        if (!value.trim() || parseInt(value) === 0 || !description.trim()) {
            alert("Todos os campos devem ser preenchidos");
            return;
        }
        const body = {
            description,
            value: parseInt(value),
            type,
        };
        //Travar botões/inputs
        const request = axios.post(
            "http://localhost:4000/new-transaction",
            {},
            body
        );
        request.then((response) => {
            console.log(response.data);
            history.push("/home");
        });
        request.catch((error) => {
            alert(error.response);
            console.log(error.response);
        });
    }

    return (
        <StyledForm onSubmit={sendNewTransaction}>
            <Title>Nova {displayType}</Title>
            <input
                placeholder="Valor"
                type="number"
                value={value}
                onChange={(e) => setValue(e.target.value)}
            ></input>
            <input
                placeholder="Descrição"
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            ></input>
            <button onClick={sendNewTransaction}>Salvar {displayType}</button>
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
