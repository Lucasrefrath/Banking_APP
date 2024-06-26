import {API_URLS_V1} from "../../const/GlobalConst";
import {FullUserData, SimpleAccountDetails} from "../../types/Types";
import {useEffect, useState} from "react";
import useAccountActive from "./useAccountActive";
import {Roles} from "../../types/Enums";
import useUserRoles from "./useUserRoles";
import useAuthContext from "../contextHook/useAuthContext";

const useAllUsers = () => {
  const [isPending, setIsPending] = useState<boolean>(true);
  const [error, setError] = useState<any>(undefined);
  const [userData, setUserData] = useState<FullUserData[] | undefined>(undefined);
  const { handleDeactivate, handleActivate } = useAccountActive();
  const { handleUpdateUserRoles: updateRoles } = useUserRoles();
  const { refreshAuth } = useAuthContext();

  useEffect(() => {
    setIsPending(true)
    handleRequest()
  }, []);

  const handleDeactivateAccount = (accountId: number ) => {
    const newUserData = userData?.map((user: FullUserData): FullUserData => {
      const newUserAccounts: SimpleAccountDetails[] = user.accounts.map((account: SimpleAccountDetails): SimpleAccountDetails => {
        if(account.id === accountId) {
          return {...account, active: false}
        }
        return account
      })
      return {...user, accounts: newUserAccounts};
    });

    handleDeactivate({id: accountId}, () => setUserData(newUserData));
  }

  const handleActivateAccount = (accountId: number ) => {
    const newUserData = userData?.map((user: FullUserData): FullUserData => {
      const newUserAccounts: SimpleAccountDetails[] = user.accounts.map((account: SimpleAccountDetails): SimpleAccountDetails => {
        if(account.id === accountId) {
          return {...account, active: true}
        }
        return account
      })
      return {...user, accounts: newUserAccounts};
    });

    handleActivate({id: accountId}, () => setUserData(newUserData));
  }

  const handleUpdateUserRoles = (updatedRoles: Roles[], userId: number, actionAfter: () => void) => {
    if(!updatedRoles.includes(Roles.USER)) updatedRoles.push(Roles.USER);
    updateRoles({
      userId: userId,
      updatedRoles
    }, () => {
      actionAfter();
      pushNewRolesToLocalUserData(updatedRoles, userId);
    })
  }

  const pushNewRolesToLocalUserData  = (newRoles: Roles[], userId: number) => {
    const newUserData = userData?.map((fullUser) => {
      if(fullUser.user.id === userId) {
        return {...fullUser, user: {...fullUser.user, roles: newRoles}}
      }
      return fullUser;
    });
    setUserData(newUserData);
  }

  const handleRequest = async (): Promise<void> => {
    try {
      const response = await fetch(API_URLS_V1.users, {
        method: 'GET',
        credentials: "include",
      });

      if(response.status === 401) {
        refreshAuth();
        const message = await response.text();
        throw new Error(message)
      }

      if(response.status !== 200) {
        throw new Error("Ein unerwarteter Fehler ist aufgetreten...");
      }

      const data: FullUserData[] = await response.json();
      setUserData(data);
      setIsPending(false);
    } catch (error) {
      setError(error)
      console.log(error);
    }
    setIsPending(false);
  }

  return { isPending, error, userData, handleDeactivateAccount, handleActivateAccount, handleUpdateUserRoles, handleRequest }
};

export default useAllUsers;