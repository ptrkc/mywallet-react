import StyledForm from "../styles/StyledForm";
import { Link } from "react-router-dom";
import SignPageStyle from "./SignPagesStyle";

export default function SignIn() {
    function signIn(e) {
        e.preventDefault();
        alert("sing-in");
    }
    return (
        <SignPageStyle>
            <h1>MyWallet</h1>
            <StyledForm onSubmit={signIn}>
                <input placeholder="E-mail" type="text"></input>
                <input placeholder="Senha" type="password"></input>
                <button onClick={signIn}>Entrar</button>
            </StyledForm>
            <Link to="/sign-up">Primeira vez? Cadastre-se!</Link>
        </SignPageStyle>
    );
}
