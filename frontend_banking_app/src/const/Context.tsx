import {createContext} from "react";
import {AdminData, AuthData, DashBoardData, ProfileData, ProfileSettingsData} from "../types/Types";

export const AuthContext = createContext<AuthData | undefined>(undefined);

export const ProfileContext = createContext<ProfileData | undefined>(undefined);

export const DashBoardContext = createContext<DashBoardData | undefined>(undefined);

export const AdminContext = createContext<AdminData | undefined>(undefined);

export const ProfileSettingsContext = createContext<ProfileSettingsData | undefined>(undefined);