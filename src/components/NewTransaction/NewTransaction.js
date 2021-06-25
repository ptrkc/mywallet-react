import axios from "axios";
import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import UserContext from "../../contexts/UserContext";
import StyledForm from "../styles/StyledForm";
import Loader from "react-loader-spinner";

export default function NewTransaction({ type }) {
    const [loading, setLoading] = useState(false);
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
        setLoading(true);
        const body = {
            description,
            value: parseInt(value.replace(",", "")),
            type,
        };
        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        };
        const request = axios.post(
            `${process.env.API}/transaction`,
            body,
            config
        );
        request.then((response) => {
            history.push("/");
        });
        request.catch((error) => {
            setLoading(false);
            alert(error.response.status + ": " + error.response.data);
            if (error.response.status) {
                history.push("/sign-out");
            }
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
                disabled={loading}
            ></input>
            <input
                placeholder="Descrição"
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                disabled={loading}
            ></input>
            <button onClick={sendNewTransaction} disabled={loading}>
                {loading ? (
                    <Loader
                        type="ThreeDots"
                        color="#FFFFFF"
                        width={51}
                        height={13}
                    />
                ) : (
                    <>Salvar {displayType}</>
                )}
            </button>
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
