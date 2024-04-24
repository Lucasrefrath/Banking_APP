import React, {useEffect, useState} from "react";
import HomePage from "../Components/HomePage";
import {AuthContext} from "./AuthContext";
import {API_URLS} from "../global-const/GlobalConst";
import {UserDetails} from "../types/Types";

const AuthProvider = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [userDetails, setUserDetails] = useState<UserDetails | undefined>(undefined)

    useEffect(() => {
        checkAuthentication()
    }, []);

    const checkAuthentication = async (): Promise<void> => {
        try {
            const response = await fetch(API_URLS.authV1 + "/checkAuth", {
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
    }

    const handleLogIn = async (): Promise<void> => {
        if(isAuthenticated) return
        const auth: string = btoa("admin:admin");
        console.log(auth)

        try {
            const response = await fetch(API_URLS.authV1 + '/login', {
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
            const response = await fetch(API_URLS.authV1 + '/logout', {
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

    return (
        <AuthContext.Provider value={{
            isAuthenticated: isAuthenticated,
            userDetails: userDetails,
            login: handleLogIn,
            logout: handleLogOut
        }}>
            <HomePage />
        </AuthContext.Provider>
    );
};

export default AuthProvider;
