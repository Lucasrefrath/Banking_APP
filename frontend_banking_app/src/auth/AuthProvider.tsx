import React, {useEffect, useState} from "react";
import {AuthContext} from "../const/Context";
import {API_URLS_V1, UNKNOWN_ERROR} from "../const/GlobalConst";
import {LogInData, ServerException, UserDetails} from "../types/Types";
import AuthRoutingManager from "./AuthRoutingManager";
import {BrowserRouter, useNavigate} from "react-router-dom";
import useBrowserData from "../hooks/useBrowserData";

const AuthProvider = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userDetails, setUserDetails] = useState<UserDetails | undefined>(undefined);
    const [isChecking, setIsChecking] = useState(true);
    const navigate = useNavigate();
    const { getTimeZone, getBrowserName, getDeviceOS } = useBrowserData();

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

    const handleLogIn = async ({username = "admin", password = "admin"}: LogInData, actionAfter: () => void, actionOnError: (error: ServerException) => void): Promise<void> => {
        if(isAuthenticated) return
        try {
            const response = await fetch(API_URLS_V1.auth + '/login', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                    clientLocation: getTimeZone(),
                    clientBrowser: getBrowserName(),
                    clientOS: getDeviceOS()
                }),
                credentials: "include"
            });

            if(response.status === 200) {
                const data: UserDetails = await response.json();
                setIsAuthenticated(true);
                setUserDetails(data)
                actionAfter()
                return;
            }
            if(response.status === 401) {
                const data: ServerException = await response.json()
                actionOnError(data);
                return;
            }

            actionOnError(UNKNOWN_ERROR);

        } catch (error) {
            console.log(error)
            actionOnError(UNKNOWN_ERROR)
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
        } catch (error) {
            console.log(error)
        }
    }

    if(isChecking) {
        return <></>
    }

    return (
      <AuthContext.Provider value={{
          isAuthenticated,
          userDetails,
          login: handleLogIn,
          logout: handleLogOut,
          refreshAuth: checkAuthentication
      }}>
        <AuthRoutingManager/>
      </AuthContext.Provider>
);
};

export default AuthProvider;
