import {useContext, useState} from 'react';
import {API_URLS_V1} from "../../const/GlobalConst";
import {
} from "../../types/Types";
import {ProfileContext} from "../../const/Context";
import {AccountAction, PopUpType} from "../../types/Enums";
import {AccountActionResponse, DepositRequst} from "../../types/Request-Response";

const useAccountAction = ({actionType, popUpType}: {actionType: AccountAction, popUpType: PopUpType}) => {
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
      ProfileData?.closePopUp(popUpType)
    } catch (error) {
      setError(error)
      console.log(error);
    }
  }

  return { handleRequest, error, setError }
};

export default useAccountAction;