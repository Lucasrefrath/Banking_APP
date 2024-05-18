import {useContext} from 'react';
import {AuthContext} from "../types-const/Context";
import {AuthData} from "../types-const/Types";

const useAuth = (): AuthData | undefined => {
    return useContext(AuthContext)
};

export default useAuth;