import React, {useEffect, useState} from "react";
import {AuthContext} from "../const/Context";
import {API_URLS_V1} from "../const/GlobalConst";
import {LogInData, UserDetails} from "../types/Types";
import AuthRoutingManager from "./AuthRoutingManager";
import {BrowserRouter, useNavigate} from "react-router-dom";

const AuthProvider = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userDetails, setUserDetails] = useState<UserDetails | undefined>(undefined);
    const [isChecking, setIsChecking] = useState(true);
    const navigate = useNavigate();

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
        } catch (error) {
            setIsAuthenticated(false)
            console.log(error)
        }
        setIsChecking(false);
    }

    const handleLogIn = async ({username = "admin", password = "admin"}: LogInData, actionAfter: () => void = () => navigate("/")): Promise<void> => {
        if(isAuthenticated) return
        const auth: string = btoa(`${username}:${password}`);
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
            actionAfter()
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
          logout: handleLogOut,
          refreshAuth: checkAuthentication
      }}>
        <AuthRoutingManager/>
      </AuthContext.Provider>
);
};

export default AuthProvider;
