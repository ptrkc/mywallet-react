import StyledForm from "../styles/StyledForm";
import { Link } from "react-router-dom";
import SignPageStyle from "./SignPagesStyle";

export default function SignUp() {
    function signUp(e) {
        e.preventDefault();
        alert("sing-up");
    }
    return (
        <SignPageStyle>
            <h1>MyWallet</h1>
            <StyledForm onSubmit={signUp}>
                <input placeholder="Nome" type="text"></input>
                <input placeholder="E-mail" type="text"></input>
                <input placeholder="Senha" type="password"></input>
                <input placeholder="Confirme a senha" type="password"></input>
                <button onClick={signUp}>Cadastrar</button>
            </StyledForm>
            <Link to="/sign-in">Já tem uma conta? Entre agora!</Link>
        </SignPageStyle>
    );
}
