import {API_URLS_V1} from "../../const/GlobalConst";
import {AccountDetails, SimpleAccountDetails, UserDetails} from "../../types/Types";
import {useEffect, useState} from "react";
import useAuthContext from "../contextHook/useAuthContext";

const useFetchUsersAccounts = () => {
  const [userAccounts, setUserAccounts] = useState<SimpleAccountDetails[] | undefined>(undefined);
  const [isPending, setIsPending] = useState<boolean>(true);
  const [error, setError] = useState<any>(undefined);
  const { refreshAuth } = useAuthContext();

  useEffect(() => {
    handleRequest()
  }, []);

  const handleRequest = async (): Promise<void> => {
    setIsPending(true);

    try {
      const response = await fetch(API_URLS_V1.accounts, {
        method: 'GET',
        headers: {
          "Authorisation": "Basic "
        },
        credentials: "include",
      });

      if(response.status === 401) {
        refreshAuth();
        throw new Error("Unauthorized")
      }

      if(response.status !== 200) {
        throw new Error("Ein unerwarteter Fehler ist aufgetreten...");
      }

      const data: SimpleAccountDetails[] = await response.json();
      setIsPending(false);
      setUserAccounts(data);

    } catch (error) {
      setError(error)
      console.log(error);
    }
    setIsPending(false);
  }

  return {userAccounts, isPending, error, setUserAccounts}
};

export default useFetchUsersAccounts;