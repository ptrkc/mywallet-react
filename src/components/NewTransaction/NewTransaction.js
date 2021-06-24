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
        let newValue = e.target.value.replace(/\D/g, "");
        newValue = newValue.replace(/^0+/, "");
        if (newValue.length > 9) newValue = newValue.slice(0, 9);
        newValue = newValue.padStart(3, "0");
        newValue = `${newValue.slice(0, newValue.length - 2)},${newValue.slice(
            -2
        )}`;
        setValue(newValue);
    }

    function sendNewTransaction(e) {
        e.preventDefault();
        if (!value.trim() || value === "0,00" || !description.trim()) {
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
            alert(error.response.status + ": " + error.response.data);
        });
    }

    return (
        <StyledForm onSubmit={sendNewTransaction}>
            <Title>Nova {displayType}</Title>
            <input
                placeholder="Valor"
                type="text"
                inputMode="numeric"
                value={value}
                onChange={(e) => changeValue(e)}
                onFocus={() => {
                    if (value === "") setValue("0,00");
                }}
                onBlur={() => {
                    if (parseInt(value.replace(",", "")) === 0) setValue("");
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
