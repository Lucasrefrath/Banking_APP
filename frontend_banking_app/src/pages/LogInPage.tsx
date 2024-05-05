import React from 'react';
import useAuth from "../hooks/useAuth";
import {useNavigate} from "react-router-dom";

const LogInPage = () => {
    const AuthData = useAuth();
    const navigate = useNavigate();

    const handleLogIn = () => {
        AuthData?.login()
        navigate("/")
    }

    if(AuthData?.isAuthenticated) {
        return <div>Already Logged in</div>
    }

    return (
        <>
            <div>LogInPage</div>
            <button onClick={handleLogIn}>logIn</button>
        </>
    );
};

export default LogInPage;