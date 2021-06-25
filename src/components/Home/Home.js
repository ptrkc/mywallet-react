import { useHistory } from "react-router-dom";
import styled from "styled-components";
import TransactionsCard from "./TransactionsCard";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import UserContext from "../../contexts/UserContext";
import { useContext } from "react";
import axios from "axios";

export default function SignIn() {
    const history = useHistory();
    const { user, setUser } = useContext(UserContext);

    function signOut() {
        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        };
        const signOutRequest = axios.post(
            "http://localhost:4000/sign-out",
            {},
            config
        );
        signOutRequest.then(() => {
            localStorage.removeItem("user");
            setUser(null);
        });
        signOutRequest.catch((error) =>
            alert(error.response.status + ": " + error.response.data)
        );
    }

    return (
        <PageStyle>
            <Title>
                <h2>Olá, {user?.name.split(" ")[0]}</h2>
                <button onClick={signOut}>
                    <RiLogoutBoxRLine />
                </button>
            </Title>
            <TransactionsCard />
            <Buttons>
                <button onClick={() => history.push("/new-income")}>
                    <AiOutlinePlusCircle />
                    <div>
                        <span>Nova</span>
                        <span>entrada</span>
                    </div>
                </button>
                <div className="spacer" />
                <button onClick={() => history.push("/new-expense")}>
                    <AiOutlineMinusCircle />
                    <div>
                        <span>Nova</span>
                        <span>saída</span>
                    </div>
                </button>
            </Buttons>
        </PageStyle>
    );
}

const Title = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 28px;
    button {
        display: flex;
        justify-content: right;
        align-items: center;
        font-size: 28px;
        border: none;
        height: 40px;
        background-color: #8c11be;
        color: white;
    }
`;
const Buttons = styled.div`
    margin: 13px 0px 16px;
    display: flex;
    button {
        width: 100%;
        height: 114px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
        border: none;
        color: #fff;
        font-weight: bold;
        font-size: 17px;
        padding: 10px;
        svg {
            font-size: 26px;
        }
        div {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
        }
    }
    .spacer {
        width: 15px;
        flex-shrink: 0;
    }
`;
const PageStyle = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    max-height: 100vh;
    padding: 0px 25px;
    h2 {
        font-size: 26px;
        font-weight: bold;
        margin: 25px 0px 22px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    a {
        margin-top: 36px;
        text-decoration: none;
        font-family: Raleway;
        font-weight: bold;
        font-size: 15px;
        color: #ffffff;
    }
`;
