import useAuthContext from "./contextHook/useAuthContext";
import {Roles} from "../types/Enums";
import {FullUserData} from "../types/Types";

const useAuth = () => {
  const {userDetails} = useAuthContext()

  const userHasRole = (role: Roles) => {
    return userDetails?.roles.includes(role);
  }

  const specificUserHasRole = (user: FullUserData, role: Roles) => {
    return user.user.roles.includes(role);
  }

  const userHasRoles = (roles: Roles[] | undefined) => {
    let result: boolean = true

    if (roles === undefined) return true;

    roles.map((role) => {
      if(!userHasRole(role)) result = false;
    })

    return result;
  }

  return { userHasRole, userHasRoles, specificUserHasRole };
};

export default useAuth;