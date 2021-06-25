import { useHistory } from "react-router-dom";
import UserContext from "../../contexts/UserContext";
import { useContext, useEffect } from "react";
import axios from "axios";
import Loader from "react-loader-spinner";
import styled from "styled-components";

export default function SignOut() {
    const history = useHistory();
    const { user, setUser } = useContext(UserContext);

    useEffect(() => {
        if (localStorage.user) {
            signOut();
        } else {
            history.push("/sign-in");
            setUser(null);
        }
        // eslint-disable-next-line
    }, []);

    function signOut() {
        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        };
        const signOutRequest = axios.post(
            "http://localhost:4000/sign-out",
            {},
            config
        );
        signOutRequest.then(() => {
            localStorage.removeItem("user");
            setUser(null);
        });
        signOutRequest.catch((error) =>
            alert(error.response.status + ": " + error.response.data)
        );
    }

    return (
        <Center>
            <Loader type="TailSpin" color="#a5a5a5" height={80} width={80} />
        </Center>
    );
}

const Center = styled.div`
    display: flex;
    height: 100vh;
    align-items: center;
    justify-content: center;
`;
