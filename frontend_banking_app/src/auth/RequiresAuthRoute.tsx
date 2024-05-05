import React, {ReactElement} from 'react';
import {Navigate} from "react-router-dom";
import {Role} from "../types-const/Types";
import useAuth from "../hooks/useAuth";
import {FALLBACK_URLS} from "../types-const/GlobalConst";

interface RequiresAuthRouteParam {
    fallbackRoute?: string,
    renderElement: ReactElement,
    allowedRoles?: Role[] | []
}

const RequiresAuthRoute = ({fallbackRoute = FALLBACK_URLS.unauthorised, renderElement, allowedRoles = []}: RequiresAuthRouteParam): ReactElement => {
    const AuthData = useAuth();
    const userRoles = AuthData?.userDetails?.roles;

    if(AuthData?.isAuthenticated) {
        if(allowedRoles?.length !== 0) {
            if(allowedRoles.some(item => userRoles?.includes(item))) {
                return renderElement
            }
            return <Navigate to={fallbackRoute}/>
        }
        return renderElement
    } else {
        return <Navigate to={fallbackRoute} />
    }
};

export default RequiresAuthRoute;