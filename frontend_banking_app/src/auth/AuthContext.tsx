import {createContext} from "react";
import {AuthData} from "../types/Types";

export const AuthContext = createContext<AuthData | undefined>(undefined);