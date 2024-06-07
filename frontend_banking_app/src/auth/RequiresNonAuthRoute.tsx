import React, {ReactElement} from 'react';
import {Navigate} from "react-router-dom";
import useAuthContext from "../hooks/contextHook/useAuthContext";
import {FALLBACK_URLS} from "../const/GlobalConst";

interface RequiresNonAuthRouteParam {
    fallbackRoute?: string,
    renderElement: ReactElement,
}

const RequiresNonAuthRoute = ({fallbackRoute = FALLBACK_URLS.alreadyLoggedIn, renderElement}: RequiresNonAuthRouteParam): ReactElement => {
    const { isAuthenticated } = useAuthContext();

    if(!isAuthenticated) {
        return renderElement
    } else {
        console.log("already logged in")
        return <Navigate to={fallbackRoute} />
    }
};

export default RequiresNonAuthRoute;