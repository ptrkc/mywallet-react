import StyledForm from "../styles/StyledForm";
import { Link, useHistory } from "react-router-dom";
import SignPageStyle from "./SignPagesStyle";
import axios from "axios";
import { useState } from "react";

export default function SignUp() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passConfirm, setPassConfirm] = useState("");
    const history = useHistory();

    function signUp(e) {
        e.preventDefault();
        if (
            !name.trim() ||
            !email.trim() ||
            password === "" ||
            passConfirm === ""
        ) {
            alert("Todos os campos devem ser preenchidos");
            return;
        }
        if (password !== passConfirm) {
            alert("Senhas não coincidem");
            return;
        }
        //verificar formato do email
        const body = { name, email, password };
        //Travar botões/inputs
        const request = axios.post("http://localhost:4000/sign-up", body);
        request.then((response) => {
            history.push("/sign-in");
        });
        request.catch((error) => {
            alert(error.response.status + ": " + error.response.data);
        });
    }
    return (
        <SignPageStyle>
            <h1>MyWallet</h1>
            <StyledForm onSubmit={signUp}>
                <input
                    placeholder="Nome"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                ></input>
                <input
                    placeholder="E-mail"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                ></input>
                <input
                    placeholder="Senha"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                ></input>
                <input
                    placeholder="Confirme a senha"
                    type="password"
                    value={passConfirm}
                    onChange={(e) => setPassConfirm(e.target.value)}
                ></input>
                <button onClick={signUp}>Cadastrar</button>
            </StyledForm>
            <Link to="/sign-in">Já tem uma conta? Entre agora!</Link>
        </SignPageStyle>
    );
}
