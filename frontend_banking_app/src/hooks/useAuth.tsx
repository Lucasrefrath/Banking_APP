import useAuthContext from "./contextHook/useAuthContext";
import {Roles} from "../types/Enums";

const useAuth = () => {
  const AuthData = useAuthContext()

  const userHasRole = (role: Roles) => {
    return AuthData?.userDetails?.roles.includes(role);
  }

  return { userHasRole };
};

export default useAuth;