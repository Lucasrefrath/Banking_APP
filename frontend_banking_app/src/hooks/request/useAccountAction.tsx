import {useState} from 'react';
import {API_URLS_V1} from "../../const/GlobalConst";
import {AccountAction, PopUpType} from "../../types/Enums";
import {AccountActionApprovalStatus, AccountActionResponse, DepositRequst} from "../../types/Request-Response";
import useProfileContext from "../contextHook/useProfileContext";
import useAuthContext from "../contextHook/useAuthContext";

const useAccountAction = ({actionType, popUpType}: {actionType: AccountAction, popUpType: PopUpType}) => {
  const [error, setError] = useState<any>(undefined);
  const { updateAccountDetails, userAccountHistory, closePopUp, openPopUp} = useProfileContext();
  const { refreshAuth } = useAuthContext();

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

      if(response.status === 401) {
        refreshAuth();
        const message = await response.text();
        throw new Error(message)
      }

      if(response.status === 307) {
        const data: AccountActionApprovalStatus = await response.json();
        closePopUp(popUpType)
        openPopUp(PopUpType.EXPECTING_APPROVAL)
        console.log(data)
        return;
      }

      if(response.status !== 200) {
        throw new Error("An unexpectet error accured");
      }

      const data: AccountActionResponse = await response.json();
      updateAccountDetails(data.updatedAccountData);
      userAccountHistory?.unshift(data.newHistoryData);
      closePopUp(popUpType)
    } catch (error) {
      setError(error)
      console.log(error);
    }
  }

  return { handleRequest, error, setError }
};

export default useAccountAction;