import {API_URLS_V1} from "../types-const/GlobalConst";
import {AccountDetails, AccountHistory} from "../types-const/Types";
import {useEffect, useState} from "react";

interface FetchAccountReturn {
  accountDetails: AccountDetails,
  //history: AccountHistory[]
}

const UseFetchUsersAccounts = (accountId: string) => {
  const [userAccount, setUserAccount] = useState<AccountDetails | undefined>(undefined);
  const [accountHistory, setAccountHistory] = useState<AccountHistory | undefined>(undefined);
  const [isPending, setIsPending] = useState<boolean>(true);
  const [error, setError] = useState<any>(undefined);

  useEffect(() => {
    handleRequest()
  }, []);

  const handleRequest = async (): Promise<void> => {
    setIsPending(true);

    try {
      const response = await fetch(API_URLS_V1.accounts + "/" + accountId, {
        method: 'GET',
        credentials: "include",
      });

      if(response.status === 403) {
        const message = await response.text();
        throw new Error(message)
      }

      if(response.status !== 200) {
        throw new Error("Ein unerwarteter Fehler ist aufgetreten...");
      }

      const data: FetchAccountReturn = await response.json();
      setIsPending(false);
      setUserAccount(data.accountDetails);
      //setAccountHistory(data.history)
    } catch (error) {
      setError(error)
      console.log(error);
    }
    setIsPending(false);
  }

  return {userAccount, setUserAccount,accountHistory, isPending, error}
};

export default UseFetchUsersAccounts;