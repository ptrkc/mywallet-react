import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignIn from "./components/Sign/SignIn";
import SignUp from "./components/Sign/SignUp";
import Home from "./components/Home/Home";
import ResetCSS from "./components/styles/ResetCSS";
import GlobalStyle from "./components/styles/GlobalStyle";
import NewTransaction from "./components/NewTransaction/NewTransaction";

function App() {
    return (
        <Router>
            <ResetCSS />
            <GlobalStyle />
            <Switch>
                <Route path="/sign-in" exact>
                    <SignIn />
                </Route>
                <Route path="/sign-up" exact>
                    <SignUp />
                </Route>
                <Route path="/home" exact>
                    <Home />
                </Route>
                <Route path="/new-income" exact>
                    <NewTransaction type="entrada" />
                </Route>
                <Route path="/new-expense" exact>
                    <NewTransaction type="saída" />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
