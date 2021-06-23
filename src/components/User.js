import { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../contexts/UserContext";
export default function User() {
    const { user, setUser } = useContext(UserContext);
    const history = useHistory();

    useEffect(() => {
        if (localStorage.user && user === null) {
            setUser(JSON.parse(localStorage.user));
        } else if (!localStorage.user) {
            history.push("/sign-in");
        }
    }, [user]);

    return null;
}
