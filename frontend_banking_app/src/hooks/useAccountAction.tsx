import {useContext, useState} from 'react';
import {API_URLS_V1} from "../types-const/GlobalConst";
import {
  AccountAction,
  AccountActionResponse,
  AccountDetails,
  DepositRequst,
  SimpleAccountDetails
} from "../types-const/Types";
import {ProfileContext} from "../types-const/Context";

const useAccountAction = (actionType: AccountAction) => {
  const [error, setError] = useState<any>(undefined);
  const ProfileData = useContext(ProfileContext);

  const handleRequest = async ( payLoad: DepositRequst): Promise<void> => {

    try {
      const response = await fetch(API_URLS_V1.accountActions + actionType, {
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
        throw new Error("An unexpectet error accured");
      }

      const data: AccountActionResponse = await response.json();
      ProfileData?.updateAccountDetails(data.updatedAccountData);
      ProfileData?.userAccountHistory?.unshift(data.newHistoryData);
      ProfileData?.closePopUp(actionType)
    } catch (error) {
      setError(error)
      console.log(error);
    }
  }

  return { handleRequest, error, setError }
};

export default useAccountAction;