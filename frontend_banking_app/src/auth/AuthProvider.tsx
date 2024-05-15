import React, {useEffect, useState} from "react";
import {AuthContext} from "./AuthContext";
import {API_URLS_V1} from "../types-const/GlobalConst";
import {UserDetails} from "../types-const/Types";
import AuthRoutingManager from "./AuthRoutingManager";

const AuthProvider = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userDetails, setUserDetails] = useState<UserDetails | undefined>(undefined);
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        checkAuthentication();
    }, []);

    const checkAuthentication = async (): Promise<void> => {
        try {
            const response = await fetch(API_URLS_V1.auth + "/checkAuth", {
                method: 'GET',
                credentials: "include",
            });

            if(response.status !== 200) {
                throw new Error("Der Nutzer ist nicht Authentifiziert worden...")
            }

            const data: UserDetails = await response.json();
            setIsAuthenticated(true)
            setUserDetails(data);

            console.log(data);
        } catch (error) {
            console.log(error)
        }
        setIsChecking(false);
    }

    const handleLogIn = async (): Promise<void> => {
        if(isAuthenticated) return
        const auth: string = btoa("admin:admin");
        console.log(auth)

        try {
            const response = await fetch(API_URLS_V1.auth + '/login', {
                method: 'POST',
                headers: {
                    "Authorization": `Basic ${auth}`,
                },
                credentials: "include"
            });
            const data: UserDetails = await response.json();
            setIsAuthenticated(true);
            setUserDetails(data)
            console.log(data);
        } catch (error) {
            console.log(error)
        }
    }

    const handleLogOut = async (): Promise<void> => {
        if(!isAuthenticated) return

        try {
            const response = await fetch(API_URLS_V1.auth + '/logout', {
                method: 'POST',
                credentials: "include",
            });
            const data = await response.text();
            setIsAuthenticated(false);
            setUserDetails(undefined);
            console.log(data);
        } catch (error) {
            console.log(error)
        }
    }

    if(isChecking) {
        return <></>
    }

    return (
        <AuthContext.Provider value={{
            isAuthenticated: isAuthenticated,
            userDetails: userDetails,
            login: handleLogIn,
            logout: handleLogOut
        }}>
            <AuthRoutingManager />
        </AuthContext.Provider>
    );
};

export default AuthProvider;
