import {useContext} from 'react';
import {AuthContext} from "../../const/Context";
import {AuthData} from "../../types/Types";

const useAuthContext = (): AuthData => {
    const AuthData = useContext(AuthContext)
    if(AuthData === undefined) throw  new Error("AuthContext undefined");
    return AuthData;
};

export default useAuthContext;