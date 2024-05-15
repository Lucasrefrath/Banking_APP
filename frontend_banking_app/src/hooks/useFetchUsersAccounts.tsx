import {API_URLS_V1} from "../types-const/GlobalConst";
import {AccountDetails, UserDetails} from "../types-const/Types";
import {useEffect, useState} from "react";

const UseFetchUsersAccounts = () => {
  const [userAccounts, setUserAccounts] = useState<AccountDetails[] | undefined>(undefined);
  const [isPending, setIsPending] = useState<boolean>(true);
  const [error, setError] = useState<any>(undefined);

  useEffect(() => {
    handleRequest()
  }, []);

  const handleRequest = async (): Promise<void> => {
    setIsPending(true);

    try {
      const response = await fetch(API_URLS_V1.accounts, {
        method: 'GET',
        credentials: "include",
      });

      if(response.status !== 200) {
        throw new Error("Ein unerwarteter Fehler ist aufgetreten...");
      }

      const data: AccountDetails[] = await response.json();
      setIsPending(false);
      setUserAccounts(data);

      console.log(data);
    } catch (error) {
      setError(error)
      console.log(error);
    }
    setIsPending(false);
  }

  return {userAccounts, isPending, error}
};

export default UseFetchUsersAccounts;