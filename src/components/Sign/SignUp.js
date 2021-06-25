import StyledForm from "../styles/StyledForm";
import { Link, useHistory } from "react-router-dom";
import SignPageStyle from "./SignPagesStyle";
import axios from "axios";
import { useState } from "react";
import Loader from "react-loader-spinner";
import checkEmail from "./checkEmail";

export default function SignUp() {
    const [loading, setLoading] = useState(false);
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
        if (!checkEmail(email)) {
            alert("Insira um email válido.");
            return;
        }
        if (password !== passConfirm) {
            alert("Senhas não coincidem");
            return;
        }
        setLoading(true);
        const body = { name, email, password };
        const request = axios.post("http://localhost:4000/sign-up", body);
        request.then((response) => {
            history.push("/sign-in");
        });
        request.catch((error) => {
            setLoading(false);
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
                    disabled={loading}
                ></input>
                <input
                    placeholder="E-mail"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                ></input>
                <input
                    placeholder="Senha"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                ></input>
                <input
                    placeholder="Confirme a senha"
                    type="password"
                    value={passConfirm}
                    onChange={(e) => setPassConfirm(e.target.value)}
                    disabled={loading}
                ></input>
                <button onClick={signUp} disabled={loading}>
                    {loading ? (
                        <Loader
                            type="ThreeDots"
                            color="#FFFFFF"
                            width={51}
                            height={13}
                        />
                    ) : (
                        <>Cadastrar</>
                    )}
                </button>
            </StyledForm>
            <Link to="/sign-in">Já tem uma conta? Entre agora!</Link>
        </SignPageStyle>
    );
}
