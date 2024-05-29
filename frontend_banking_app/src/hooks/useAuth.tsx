import useAuthContext from "./contextHook/useAuthContext";
import {Roles} from "../types/Enums";

const useAuth = () => {
  const {userDetails} = useAuthContext()

  const userHasRole = (role: Roles) => {
    return userDetails?.roles.includes(role);
  }

  const userHasRoles = (roles: Roles[] | undefined) => {
    let result: boolean = true

    if (roles === undefined) return true;

    roles.map((role) => {
      if(!userHasRole(role)) result = false;
    })

    return result;
  }

  return { userHasRole, userHasRoles };
};

export default useAuth;