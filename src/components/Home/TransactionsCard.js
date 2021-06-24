import styled from "styled-components";
import dayjs from "dayjs";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import UserContext from "../../contexts/UserContext";

export default function TransactionsCard() {
    const [transactions, setTransactions] = useState(false);
    const [balance, setBalance] = useState(false);
    const { user } = useContext(UserContext);
    useEffect(() => {
        if (user) {
            getTransactions();
        }
    }, [user]);

    function getTransactions() {
        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        };
        const request = axios.get("http://localhost:4000/transactions", config);
        request.then((response) => {
            setTransactions(response.data.transactions);
            setBalance(response.data.balance);
        });
        request.catch((error) => {
            alert(error.response);
        });
    }

    function formatNumber(int) {
        const str = String(int).replace("-", "").padStart(3, "0");
        const formattedNumber = `
        ${str.slice(0, str.length - 2)},${str.slice(-2)}`;
        return formattedNumber;
    }

    return (
        <CardStyle>
            {!transactions && <div className="empty">Carregando...</div>}
            {transactions && !transactions.length && (
                <div className="empty">
                    Não há registros de entrada ou saída
                </div>
            )}
            {transactions && !!transactions.length && (
                <ul>
                    {transactions.map((t) => {
                        const formattedValue = formatNumber(t.value);
                        const date = dayjs(t.date).format("DD/MM");
                        return (
                            <Transaction type={t.type} key={t.id}>
                                <div>
                                    <span>{date}</span> {t.description}
                                </div>
                                <span> {formattedValue}</span>
                            </Transaction>
                        );
                    })}
                </ul>
            )}
            {balance && (
                <Balance positive={balance >= 0}>
                    <strong>SALDO:</strong>
                    <span> {formatNumber(balance)}</span>
                </Balance>
            )}
        </CardStyle>
    );
}

const CardStyle = styled.div`
    height: 100%;
    background-color: #fff;
    color: black;
    border-radius: 5px;
    position: relative;
    font-size: 16px;
    line-height: 19px;
    color: #000000;
    ul {
        max-height: calc(100vh - 250px);
        overflow-y: auto;
        padding: 23px 15px;
        background-color: transparent;
    }
    .empty {
        margin: auto;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 180px;
        height: 100%;
        color: #868686;
        font-size: 20px;
        line-height: 23px;
        text-align: center;
    }
`;
const Transaction = styled.li`
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
    & > div {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        span {
            color: #c6c6c6;
        }
    }
    & > span {
        margin-left: 5px;
        color: ${(props) => (props.type === "income" ? "#03AC00" : "#C70000")};
    }
`;

const Balance = styled.div`
    color: black;
    position: absolute;
    bottom: 10px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 0px 15px;
    background-color: #fff;
    span {
        color: ${(props) => (props.positive ? "#03AC00" : "#C70000")};
    }
`;
