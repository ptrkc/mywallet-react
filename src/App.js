import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignIn from "./components/Sign/SignIn";
import SignUp from "./components/Sign/SignUp";
import SignOut from "./components/Sign/SignOut";
import Home from "./components/Home/Home";
import ResetCSS from "./components/styles/ResetCSS";
import GlobalStyle from "./components/styles/GlobalStyle";
import NewTransaction from "./components/NewTransaction/NewTransaction";
import { useState } from "react";
import UserContext from "./contexts/UserContext";
import User from "./components/User";
import NotFound from "./components/NotFound";

function App() {
    const [user, setUser] = useState(null);
    return (
        <UserContext.Provider value={{ user, setUser }}>
            <Router>
                <ResetCSS />
                <GlobalStyle />
                <User />
                <Switch>
                    <Route path="/sign-in" exact>
                        <SignIn />
                    </Route>
                    <Route path="/sign-up" exact>
                        <SignUp />
                    </Route>
                    <Route path="/sign-out" exact>
                        <SignOut />
                    </Route>
                    <Route path="/" exact>
                        <Home />
                    </Route>
                    <Route path="/new-income" exact>
                        <NewTransaction type="income" />
                    </Route>
                    <Route path="/new-expense" exact>
                        <NewTransaction type="expense" />
                    </Route>
                    <Route path="*">
                        <NotFound />
                    </Route>
                </Switch>
            </Router>
        </UserContext.Provider>
    );
}

export default App;
