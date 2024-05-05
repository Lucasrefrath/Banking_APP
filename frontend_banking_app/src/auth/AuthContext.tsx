import {createContext} from "react";
import {AuthData} from "../types-const/Types";

export const AuthContext = createContext<AuthData | undefined>(undefined);