import {createContext} from "react";
import {AuthData, ProfileData} from "./Types";

export const AuthContext = createContext<AuthData | undefined>(undefined);

export const ProfileContext = createContext<ProfileData | undefined>(undefined);