import styled from "styled-components";
import dayjs from "dayjs";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import UserContext from "../../contexts/UserContext";

export default function TransactionsCard() {
    const [transactions, setTransactions] = useState(false);
    const [balance, setBalance] = useState(false);
    const { user } = useContext(UserContext);
    const tempTransactions = [
        {
            id: 12,
            description: "Celular",
            value: 0,
            type: "expense",
            date: "2021-06-22",
        },
        {
            id: 11,
            description: "Açaí",
            value: 1,
            type: "income",
            date: "2021-06-22",
        },
    ];
    useEffect(() => {
        if (user) {
            getTransactions();
        }
    }, [user]);

    useEffect(() => {
        if (transactions) {
            calculateBalance();
        }
    }, [transactions]);

    function getTransactions() {
        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        };
        const request = axios.get("http://localhost:4000/transactions", config);
        request.then((response) => {
            setTransactions(response.data);
        });
        request.catch((error) => {
            alert(error.response);
        });
    }

    function calculateBalance() {
        console.log(transactions.length);
        if (!transactions.length) {
            return;
        }
        let total = 0;
        transactions.forEach((t) => {
            t.type === "income" ? (total += t.value) : (total -= t.value);
        });
        const positive = total >= 0 ? true : false;
        const strTotal = String(total).replace("-", "").padStart(3, "0");
        const formatedBalance = `${strTotal.slice(
            0,
            strTotal.length - 2
        )},${strTotal.slice(-2)}`;
        setBalance({ value: formatedBalance, positive });
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
                        const value = String(t.value).padStart(3, "0");
                        const formatedValue =
                            value.slice(0, value.length - 2) +
                            "," +
                            value.slice(-2);
                        const date = dayjs(t.date).format("DD/MM");
                        return (
                            <Transaction type={t.type} key={t.id}>
                                <div>
                                    <span>{date}</span> {t.description}
                                </div>
                                <span> {formatedValue}</span>
                            </Transaction>
                        );
                    })}
                </ul>
            )}
            {balance && (
                <Balance positive={balance.positive}>
                    <strong>SALDO:</strong>
                    <span> {balance.value}</span>
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
        overflow: scroll;
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
