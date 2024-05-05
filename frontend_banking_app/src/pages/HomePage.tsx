import React from 'react';
import useAuth from "../hooks/useAuth";
import {useNavigate} from "react-router-dom";

const HomePage = () => {
    const AuthData = useAuth();
    const navigate = useNavigate();
    return (
        <div>
            {AuthData?.isAuthenticated ? (
                <>
                    <div>Hello Home ({AuthData?.userDetails?.username})</div>
                    <button onClick={AuthData.logout}>LogOut</button>
                    <p>{JSON.stringify(AuthData?.userDetails)}</p>
                </>
            ) : (
                <>
                    <div>Bitte Anmelden</div>
                    <button onClick={() => navigate("/login")}>LogIn</button>
                </>

            )}
        </div>
    );
};

export default HomePage;