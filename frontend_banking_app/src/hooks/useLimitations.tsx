import useAuth from "./useAuth";
import {MAX_ACCOUNTS} from "../const/GlobalConst";
import {Roles} from "../types/Enums";

const useLimitations = () => {
  const { userHasRole } = useAuth();

  const maxAccountsForUser = () => {
    if(userHasRole(Roles.ADMIN)) return MAX_ACCOUNTS.ADMIN;
    if(userHasRole(Roles.USER)) return MAX_ACCOUNTS.USER;
    return MAX_ACCOUNTS.DEFAULT;
  }

  return { maxAccountsForUser };
};

export default useLimitations;