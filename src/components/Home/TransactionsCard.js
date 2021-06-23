import styled from "styled-components";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

export default function TransactionsCard() {
    const [transactions, setTransactions] = useState(false);
    const [balance, setBalance] = useState(false);
    const tempTransactions = [
        { id: 12, name: "Celular", value: -240000, date: "2021-06-22" },
        { id: 11, name: "Açaí", value: -1590, date: "2021-06-22" },
        { id: 10, name: "Achei na rua", value: 1000, date: "2021-06-22" },
        {
            id: 9,
            name: "Berger Kingue Zinho",
            value: -3190,
            date: "2021-06-21",
        },
        { id: 8, name: "Paçoca", value: -200, date: "2021-06-21" },
        { id: 7, name: "Gasolina", value: -5000, date: "2021-06-21" },
        { id: 6, name: "Cerveja", value: -2990, date: "2021-06-21" },
        { id: 5, name: "Job", value: 70000, date: "2021-06-21" },
        {
            id: 4,
            name: "Berger Kingue Zinho",
            value: -3190,
            date: "2021-06-20",
        },
        { id: 3, name: "Paçoca", value: -200, date: "2021-06-20" },
        { id: 2, name: "Gasolina", value: -5000, date: "2021-06-20" },
        { id: 1, name: "Cerveja", value: -2990, date: "2021-06-20" },
        { id: 0, name: "Job", value: 70000, date: "2021-06-20" },
    ];
    useEffect(() => {
        setTimeout(() => {
            setTransactions(tempTransactions);
        }, 1000);
    }, []);

    useEffect(() => {
        if (transactions) {
            calculateBalance();
        }
    }, [transactions]);

    function calculateBalance() {
        console.log(transactions.length);
        if (!transactions.length) {
            return;
        }
        let total = 0;
        transactions.forEach((t) => (total += t.value));
        const strTotal = String(total);
        const formatedBalance =
            strTotal.slice(0, strTotal.length - 2) + "," + strTotal.slice(-2);
        setBalance(formatedBalance);
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
                        const value = String(t.value).replace("-", "");
                        const formatedValue =
                            value.slice(0, value.length - 2) +
                            "," +
                            value.slice(-2);
                        const date = dayjs(t.date).format("DD/MM");
                        return (
                            <Transaction value={t.value >= 0} key={t.id}>
                                <div>
                                    <span>{date}</span> {t.name}
                                </div>
                                <span> {formatedValue}</span>
                            </Transaction>
                        );
                    })}
                </ul>
            )}
            {balance && (
                <Balance balance={parseInt(balance) >= 0}>
                    <strong>SALDO:</strong>
                    <span> {balance}</span>
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
        color: ${(props) => (props.value ? "#03AC00" : "#C70000")};
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
        color: ${(props) => (props.balance ? "#03AC00" : "#C70000")};
    }
`;
