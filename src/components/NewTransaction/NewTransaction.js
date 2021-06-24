import axios from "axios";
import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import UserContext from "../../contexts/UserContext";
import StyledForm from "../styles/StyledForm";

export default function NewTransaction({ type }) {
    const [value, setValue] = useState("");
    const [description, setDescription] = useState("");
    const { user } = useContext(UserContext);

    const history = useHistory();
    const displayType = type === "income" ? "entrada" : "saída";

    function changeValue(e) {
        let newValue = parseInt(e.target.value.replace(/\D/g, ""));
        if (isNaN(newValue)) newValue = 0;
        newValue = String(newValue).padStart(3, "0");
        newValue = `${newValue.slice(0, newValue.length - 2)},${newValue.slice(
            -2
        )}`;
        setValue(newValue);
    }

    function sendNewTransaction(e) {
        e.preventDefault();
        if (
            !value.trim() ||
            parseInt(value.replace(",", "")) < 0 ||
            !description.trim()
        ) {
            alert("Todos os campos devem ser preenchidos");
            return;
        }
        const body = {
            description,
            value: parseInt(value.replace(",", "")),
            type,
        };
        //Travar botões/inputs
        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        };
        const request = axios.post(
            "http://localhost:4000/transaction",
            body,
            config
        );
        request.then((response) => {
            history.push("/");
        });
        request.catch((error) => {
            alert(error.response);
        });
    }

    return (
        <StyledForm onSubmit={sendNewTransaction}>
            <Title>Nova {displayType}</Title>
            <input
                placeholder="Valor"
                type="text"
                inputMode="numeric"
                step="0.01"
                lang="pt-BR"
                value={value}
                onChange={(e) => changeValue(e)}
                onFocus={() => {
                    if (value === "") setValue("0,00");
                }}
                onBlur={() => {
                    if (parseFloat(value) === 0) setValue("");
                }}
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
