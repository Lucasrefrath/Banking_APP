import {useContext} from 'react';
import {AuthContext} from "../const/Context";
import {AuthData} from "../types/Types";

const useAuthContext = (): AuthData | undefined => {
    return useContext(AuthContext)
};

export default useAuthContext;