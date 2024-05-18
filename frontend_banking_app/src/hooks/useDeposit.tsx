import {useContext, useState} from 'react';
import {API_URLS_V1} from "../types-const/GlobalConst";
import DepositPopUp from "../components/DepositPopUp";
import {AccountDetails, DepositRequst} from "../types-const/Types";
import {ProfileContext} from "../types-const/Context";

const useDeposit = () => {
  const [isPending, setIsPending] = useState<boolean>(false);
  const [error, setError] = useState<any>(undefined);
  const ProfileData = useContext(ProfileContext);

  const handleRequest = async ( payLoad: DepositRequst): Promise<void> => {
    setIsPending(true);

    try {
      const response = await fetch(API_URLS_V1.accountActions + "/deposit", {
        method: 'POST',
        credentials: "include",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payLoad)
      });

      if(response.status === 403) {
        const message = await response.text();
        throw new Error(message)
      }

      if(response.status !== 200) {
        throw new Error("Ein unerwarteter Fehler ist aufgetreten...");
      }

      const data: AccountDetails = await response.json();
      ProfileData?.updateAccountDetails(data);
      ProfileData?.closeDeposit()
      setIsPending(false);
    } catch (error) {
      setError(error)
      console.log(error);
    }
    setIsPending(false);
  }

  return { handleRequest }
};

export default useDeposit;