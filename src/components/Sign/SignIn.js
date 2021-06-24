import StyledForm from "../styles/StyledForm";
import { Link, useHistory } from "react-router-dom";
import SignPageStyle from "./SignPagesStyle";
import { useEffect, useContext, useState } from "react";
import axios from "axios";
import UserContext from "../../contexts/UserContext";

export default function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { setUser } = useContext(UserContext);
    const history = useHistory();

    function signIn(e) {
        e.preventDefault();
        if (!email.trim() || password === "") {
            alert("Todos os campos devem ser preenchidos");
            return;
        }
        //verificar formato do email
        const body = { email, password };
        //Travar botões/inputs
        const request = axios.post("http://localhost:4000/sign-in", body);
        request.then((response) => {
            localStorage.setItem("user", JSON.stringify(response.data));
            setUser(response.data);
            history.push("/");
        });
        request.catch((error) => {
            alert(error.response.status + ": " + error.response.data);
        });
    }
    return (
        <SignPageStyle>
            <h1>MyWallet</h1>
            <StyledForm onSubmit={signIn}>
                <input
                    placeholder="E-mail"
                    type="text"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                ></input>
                <input
                    placeholder="Senha"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                ></input>
                <button onClick={signIn}>Entrar</button>
            </StyledForm>
            <Link to="/sign-up">Primeira vez? Cadastre-se!</Link>
        </SignPageStyle>
    );
}
