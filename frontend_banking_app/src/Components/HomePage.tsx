import React, {useContext} from 'react';
import {AuthContext} from "../auth/AuthContext";

const HomePage = () => {
    const AuthData = useContext(AuthContext)
    return (
        <div>
            {AuthData?.isAuthenticated ? (
                <>
                    <div>Hello Home ({AuthData?.userDetails?.username})</div>
                    <button onClick={AuthData.logout}>LogOut</button>
                </>
            ) : (
                <>
                    <div>Bitte Anmelden</div>
                    <button onClick={AuthData?.login}>LogIn</button>
                </>

            )}
        </div>
    );
};

export default HomePage;