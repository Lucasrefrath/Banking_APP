import React from 'react';
import useAuthContext from "../hooks/useAuthContext";
import {useNavigate} from "react-router-dom";

const HomePage = () => {
    const AuthData = useAuthContext();
    const navigate = useNavigate();
    return (
        <div>
            {AuthData?.isAuthenticated ? (
                <>
                    <div className={"text-4xl pb-4 font-bold"}>Home ({AuthData?.userDetails?.username})</div>
                    <p>Userdata: {JSON.stringify(AuthData?.userDetails)}</p>
                </>
            ) : (
              <h1 className={"text-4xl pb-4 font-bold"}>You are not logged in</h1>
            )}
        </div>
    );
};

export default HomePage;