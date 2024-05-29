import React, {ReactElement} from 'react';
import {Navigate} from "react-router-dom";
import useAuthContext from "../hooks/contextHook/useAuthContext";
import {FALLBACK_URLS} from "../const/GlobalConst";
import {Roles} from "../types/Enums";

interface RequiresAuthRouteParam {
    fallbackRoute?: string,
    renderElement: ReactElement,
    allowedRoles?: Roles[] | []
}

const RequiresAuthRoute = ({fallbackRoute = FALLBACK_URLS.unauthorised, renderElement, allowedRoles = []}: RequiresAuthRouteParam): ReactElement => {
    const AuthData = useAuthContext();
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