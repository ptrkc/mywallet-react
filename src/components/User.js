import { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../contexts/UserContext";
export default function User() {
    const { user, setUser } = useContext(UserContext);
    const history = useHistory();

    useEffect(() => {
        console.log(localStorage.user, user);
        if (localStorage.user && user === null) {
            setUser(JSON.parse(localStorage.user));
        } else if (!localStorage.user && user === null) {
            history.push("/sign-in");
        }
    }, [user]);

    return null;
}
