import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignIn from "./Sign/SignIn";
import ResetCSS from "./styles/ResetCSS";
import GlobalStyle from "./styles/GlobalStyle";

function App() {
    return (
        <Router>
            <ResetCSS />
            <GlobalStyle />
            <Switch>
                <Route path="/sign-in" exact>
                    <SignIn />
                </Route>
                {/* <Route path="/sign-up" exact>
                    <SignUp />
                </Route>
                <Route path="/home" exact>
                    <Home />
                </Route>
                <Route path="/add-in" exact>
                    <AddIn />
                </Route>
                <Route path="/add-out" exact>
                    <AddOut />
                </Route> */}
            </Switch>
        </Router>
    );
}

export default App;
