import StyledForm from "../styles/StyledForm";
import { Link, useHistory } from "react-router-dom";
import SignPageStyle from "./SignPagesStyle";
import { useContext, useState } from "react";
import axios from "axios";
import UserContext from "../../contexts/UserContext";
import Loader from "react-loader-spinner";
import checkEmail from "./checkEmail";

export default function SignIn() {
    const [loading, setLoading] = useState(false);
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
        if (!checkEmail(email)) {
            alert("Insira um email válido");
            return;
        }
        setLoading(true);
        const body = { email, password };
        const request = axios.post("http://localhost:4000/sign-in", body);
        request.then((response) => {
            localStorage.setItem("user", JSON.stringify(response.data));
            setUser(response.data);
            history.push("/");
        });
        request.catch((error) => {
            setLoading(false);
            if (error.response.status === 401) {
                alert("Combinação email/senha incorreta");
            } else {
                alert(error.response.status + ": " + error.response.data);
            }
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
                    disabled={loading}
                ></input>
                <input
                    placeholder="Senha"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    disabled={loading}
                ></input>
                <button onClick={signIn} disabled={loading}>
                    {loading ? (
                        <Loader
                            type="ThreeDots"
                            color="#FFFFFF"
                            width={51}
                            height={13}
                        />
                    ) : (
                        <>Entrar</>
                    )}
                </button>
            </StyledForm>
            <Link to="/sign-up">Primeira vez? Cadastre-se!</Link>
        </SignPageStyle>
    );
}
